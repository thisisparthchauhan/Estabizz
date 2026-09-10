import "server-only";

import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
  isAllowedDocumentMimeType,
} from "@/lib/jobs/documentStorage";
import { createJobsAiClient } from "@/lib/jobs/ai";
import { validateResumeFileBytes } from "@/lib/jobs/fileSecurity";
import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import { PrismaProfileProposalRepository } from "@/lib/jobs/profileReview/prismaRepository";
import { persistAiProfileProposals } from "@/lib/jobs/profileReview/service";

import { isResumeParsePermanentStatus } from "./contract";
import { checkResumeProcessingGate } from "./processingGate";
import {
  buildSafeResumeExtractionMetadata,
  sanitizeResumeProcessingMessage,
} from "./sensitiveData";
import type { ProposedResumeStructuredExtraction } from "./structuredExtraction";
import type { ResumeParseJobEnvelope, ResumeParseWorkerResult } from "./types";

const TEXT_EXTRACTION_MODEL_PROVIDER = "none";
const TEXT_EXTRACTION_MODEL_NAME = "document-text-extraction";
const TEXT_EXTRACTION_MODEL_VERSION = "v1-foundation";

const STRUCTURED_EXTRACTION_PERMANENT_STATUSES = new Set([
  "provider_not_configured",
  "invalid_provider_output",
]);

/**
 * A resume left in `processing` by a worker that died mid-flight (function
 * timeout, instance eviction) used to block that resume forever: every retry
 * saw `processing` and returned success without doing anything.
 *
 * `updated_at` is `@updatedAt`, so claiming a row stamps it. A row still in
 * `processing` after this long has no live worker and may be reclaimed. It must
 * comfortably exceed the callback route's maxDuration (300s).
 */
const STALE_PROCESSING_RECLAIM_MS = 15 * 60 * 1000;

type ResumeParseClaim =
  | { claimed: true; reclaimedRunId: string | null }
  | { claimed: false; reason: "already_completed" | "already_processing" | "not_found" };

/**
 * Takes exclusive ownership of a resume version for parsing.
 *
 * This is a single conditional UPDATE, so two concurrent deliveries of the same
 * job cannot both win: Postgres serialises them and the loser matches zero
 * rows. `completed` is absent from the predicate, so a duplicate delivery after
 * success can never reprocess.
 */
async function claimResumeVersionForParsing(
  prisma: ReturnType<typeof getJobsPrismaClient>,
  resumeVersionId: string,
  candidateId: string,
): Promise<ResumeParseClaim> {
  const staleBefore = new Date(Date.now() - STALE_PROCESSING_RECLAIM_MS);
  const previous = await prisma.resumeVersion.findFirst({
    where: { id: resumeVersionId, candidate_id: candidateId, deleted_at: null },
    select: { parse_status: true, ai_processing_run_id: true, updated_at: true },
  });

  if (!previous) {
    return { claimed: false, reason: "not_found" };
  }

  const isStaleReclaim =
    previous.parse_status === "processing" && previous.updated_at < staleBefore;

  const claim = await prisma.resumeVersion.updateMany({
    where: {
      id: resumeVersionId,
      candidate_id: candidateId,
      deleted_at: null,
      OR: [
        { parse_status: { in: ["pending", "failed"] } },
        { parse_status: "processing", updated_at: { lt: staleBefore } },
      ],
    },
    data: { parse_status: "processing" },
  });

  if (claim.count === 0) {
    return {
      claimed: false,
      reason: previous.parse_status === "completed" ? "already_completed" : "already_processing",
    };
  }

  return {
    claimed: true,
    reclaimedRunId: isStaleReclaim ? previous.ai_processing_run_id : null,
  };
}

/** Closes out the abandoned run of a reclaimed resume so it is not left running forever. */
async function closeAbandonedRun(
  prisma: ReturnType<typeof getJobsPrismaClient>,
  aiProcessingRunId: string,
): Promise<void> {
  await prisma.aIProcessingRun.updateMany({
    where: { id: aiProcessingRunId, status: "running" },
    data: {
      status: "failed",
      completed_at: new Date(),
      error_detail: "Superseded after the previous run was abandoned mid-processing.",
    },
  });
}

export async function processResumeParseJob(
  envelope: ResumeParseJobEnvelope,
): Promise<ResumeParseWorkerResult> {
  const prisma = getJobsPrismaClient();
  const { resumeVersionId, candidateId } = envelope.payload;

  // Claim before doing anything else. Duplicate deliveries lose here and become
  // safe no-ops instead of each starting their own paid AI run.
  const claim = await claimResumeVersionForParsing(prisma, resumeVersionId, candidateId);

  if (!claim.claimed) {
    if (claim.reason === "not_found") {
      return {
        ok: false,
        status: "failed",
        retryable: false,
        errorMessage: "Resume version was not found.",
      };
    }

    return { ok: true, status: claim.reason, retryable: false };
  }

  if (claim.reclaimedRunId) {
    await closeAbandonedRun(prisma, claim.reclaimedRunId);
  }

  const resumeVersion = await prisma.resumeVersion.findFirstOrThrow({
    where: { id: resumeVersionId, candidate_id: candidateId, deleted_at: null },
  });

  const aiRun = await prisma.aIProcessingRun.create({
    data: {
      run_type: "resume_parse",
      entity_type: "resume_version",
      entity_id: resumeVersion.id,
      model_provider: TEXT_EXTRACTION_MODEL_PROVIDER,
      model_name: TEXT_EXTRACTION_MODEL_NAME,
      model_version: TEXT_EXTRACTION_MODEL_VERSION,
      status: "running",
      started_at: new Date(),
      triggered_by_ref_id: resumeVersion.uploaded_by_ref_id,
    },
  });
  const startedAt = Date.now();

  // parse_status was already set to processing by the claim above.
  await prisma.resumeVersion.update({
    where: { id: resumeVersion.id },
    data: { ai_processing_run_id: aiRun.id },
  });

  try {
    const storageConfig = getDocumentStorageConfig();
    const storage = createS3CompatibleDocumentStorage(storageConfig);
    const metadata = await storage.getObjectMetadata(resumeVersion.file_storage_key);

    if (!metadata) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: false,
        errorMessage: "Resume document was not found in private storage.",
      });
    }

    if (!isAllowedDocumentMimeType(metadata.contentType)) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: false,
        errorMessage: "Resume document MIME type is not supported.",
      });
    }

    if (metadata.contentLengthBytes > storageConfig.maxUploadBytes) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: false,
        errorMessage: "Resume document exceeds the configured file-size limit.",
      });
    }

    // Security gate: check malware scan status before processing
    const gate = checkResumeProcessingGate(metadata, storageConfig);

    if (!gate.eligible) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: gate.retryable,
        errorMessage: gate.reason,
      });
    }

    const download = await storage.createPresignedDownload({
      objectKey: resumeVersion.file_storage_key,
      candidateId: resumeVersion.candidate_id,
      requestedByRefId: resumeVersion.uploaded_by_ref_id,
      reason: "resume_parse",
    });
    const response = await fetch(download.downloadUrl, { cache: "no-store" });

    if (!response.ok) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: true,
        errorMessage: "Private resume download failed.",
      });
    }

    const content = new Uint8Array(await response.arrayBuffer());

    // Structural re-validation on the exact bytes about to be parsed. Confirm
    // already checked this object, but the presigned PUT stays usable until it
    // expires, so the validated bytes and these bytes are not guaranteed to be
    // the same. This is NOT a malware scan -- see lib/jobs/fileSecurity.
    const fileSecurity = await validateResumeFileBytes(
      {
        declaredMimeType: metadata.contentType,
        maxUploadBytes: storageConfig.maxUploadBytes,
      },
      content,
    );

    if (!fileSecurity.ok) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: fileSecurity.status === "unavailable",
        errorMessage: `Resume file validation failed: ${fileSecurity.status} (${fileSecurity.detail}).`,
      });
    }

    const aiClient = createJobsAiClient();
    const extraction = await aiClient.extractResumeText({
      resumeVersionId: resumeVersion.id,
      candidateId: resumeVersion.candidate_id,
      correlationId: envelope.correlationId,
      fileName: resumeVersion.file_name_original,
      mimeType: metadata.contentType,
      content,
    });

    if (!extraction.ok || !extraction.data) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: true,
        errorMessage: extraction.errorMessage || "AI service resume extraction failed.",
      });
    }

    const extractionMetadata = buildSafeResumeExtractionMetadata(extraction.data);

    if (extractionMetadata.status !== "text_extracted") {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: !isResumeParsePermanentStatus(extractionMetadata.status),
        errorMessage: `Resume text extraction returned ${extractionMetadata.status}.`,
      });
    }

    // Structured extraction: call AI service with extracted text
    const structuredResult = await aiClient.extractStructuredResume({
      resumeVersionId: resumeVersion.id,
      candidateId: resumeVersion.candidate_id,
      correlationId: envelope.correlationId,
      extractedText: extraction.data.text,
      extractionMethod: extraction.data.extractionMethod ?? null,
      pageCount: extraction.data.pageCount ?? null,
    });

    if (!structuredResult.ok || !structuredResult.data) {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: true,
        errorMessage: structuredResult.errorMessage || "AI structured extraction failed.",
      });
    }

    const structured = structuredResult.data;
    const isPermanent = STRUCTURED_EXTRACTION_PERMANENT_STATUSES.has(structured.status);

    if (structured.status !== "structured_extracted") {
      return await markFailed({
        aiRunId: aiRun.id,
        resumeVersionId: resumeVersion.id,
        startedAt,
        retryable: !isPermanent,
        errorMessage: `Structured extraction returned ${structured.status}.`,
      });
    }

    // Persist AI profile proposals
    const repository = new PrismaProfileProposalRepository(prisma);
    await persistAiProfileProposals(
      {
        candidateId: resumeVersion.candidate_id,
        resumeVersionId: resumeVersion.id,
        aiProcessingRunId: aiRun.id,
        provider: structured.provider ?? "unknown",
        model: structured.model ?? "unknown",
        modelVersion: TEXT_EXTRACTION_MODEL_VERSION,
        extractionTimestamp: new Date(),
        extraction: structured.data as ProposedResumeStructuredExtraction,
      },
      repository,
    );

    // Update AI run with structured extraction model info and mark completed
    await prisma.$transaction([
      prisma.aIProcessingRun.update({
        where: { id: aiRun.id },
        data: {
          status: "completed",
          completed_at: new Date(),
          duration_ms: Date.now() - startedAt,
          model_provider: structured.provider ?? TEXT_EXTRACTION_MODEL_PROVIDER,
          model_name: structured.model ?? TEXT_EXTRACTION_MODEL_NAME,
          input_tokens: structured.usage?.inputTokens ?? null,
          output_tokens: structured.usage?.outputTokens ?? extractionMetadata.characterCount,
          error_detail: null,
        },
      }),
      prisma.resumeVersion.update({
        where: { id: resumeVersion.id },
        data: {
          parse_status: "completed",
          parse_completed_at: new Date(),
          ai_processing_run_id: aiRun.id,
        },
      }),
    ]);

    return {
      ok: true,
      status: "completed",
      retryable: false,
    };
  } catch {
    return await markFailed({
      aiRunId: aiRun.id,
      resumeVersionId: resumeVersion.id,
      startedAt,
      retryable: true,
      errorMessage: "Resume parse worker failed.",
    });
  }
}

async function markFailed({
  aiRunId,
  resumeVersionId,
  startedAt,
  retryable,
  errorMessage,
}: {
  aiRunId: string;
  resumeVersionId: string;
  startedAt: number;
  retryable: boolean;
  errorMessage: string;
}): Promise<ResumeParseWorkerResult> {
  const prisma = getJobsPrismaClient();

  await prisma.$transaction([
    prisma.aIProcessingRun.update({
      where: { id: aiRunId },
      data: {
        status: "failed",
        completed_at: new Date(),
        duration_ms: Date.now() - startedAt,
        error_detail: sanitizeErrorDetail(errorMessage),
      },
    }),
    prisma.resumeVersion.update({
      where: { id: resumeVersionId },
      data: {
        parse_status: "failed",
        parse_completed_at: null,
        ai_processing_run_id: aiRunId,
      },
    }),
  ]);

  return {
    ok: false,
    status: retryable ? "retryable_failed" : "failed",
    retryable,
    errorMessage: sanitizeErrorDetail(errorMessage),
  };
}

function sanitizeErrorDetail(errorMessage: string): string {
  return sanitizeResumeProcessingMessage(errorMessage);
}
