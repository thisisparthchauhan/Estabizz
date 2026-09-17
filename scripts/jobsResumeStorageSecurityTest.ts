/**
 * Live staging-bucket verification of the resume file-security gate.
 *
 * Uploads generated synthetic fixtures through a real presigned PUT, validates
 * each one through ranged reads on the live S3-compatible adapter, then deletes
 * it. Refuses to run outside a clearly-named staging bucket.
 *
 * No real candidate CV is ever used. Set FIXTURE_DIR to a directory of
 * synthetic fixtures.
 */
import { readFileSync, readdirSync } from "fs";
import { config as loadEnv } from "dotenv";

import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
} from "../lib/jobs/documentStorage";
import type { AllowedDocumentMimeType } from "../lib/jobs/documentStorage/types";
import { validateResumeFileRanges } from "../lib/jobs/fileSecurity";

loadEnv({ path: ".env.local", quiet: true });

const FIXTURE_DIR = process.env.FIXTURE_DIR;
const PDF: AllowedDocumentMimeType = "application/pdf";
const DOCX: AllowedDocumentMimeType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const EXPECTED: Record<string, { mime: AllowedDocumentMimeType; status: string }> = {
  "valid_resume.pdf": { mime: PDF, status: "passed" },
  "scanned_resume.pdf": { mime: PDF, status: "passed" },
  "valid_resume.docx": { mime: DOCX, status: "passed" },
  "invalid.pdf": { mime: PDF, status: "rejected_signature_mismatch" },
  "fake.docx": { mime: DOCX, status: "rejected_structure_invalid" },
  "spreadsheet_as.docx": { mime: DOCX, status: "rejected_structure_invalid" },
  "blocked_executable.pdf": { mime: PDF, status: "rejected_blocked_format" },
  "blocked_html.pdf": { mime: PDF, status: "rejected_blocked_format" },
  "blocked_rtf.docx": { mime: DOCX, status: "rejected_blocked_format" },
  "blocked_ole2_doc.docx": { mime: DOCX, status: "rejected_blocked_format" },
};

async function main() {
  if (!FIXTURE_DIR) {
    throw new Error("FIXTURE_DIR is required and must contain synthetic fixtures only.");
  }

  const config = getDocumentStorageConfig();

  if (config.environment === "production") {
    throw new Error("Refused to run because APP_ENV is production.");
  }

  if (!/(^|[-_])staging($|[-_])/i.test(config.bucket)) {
    throw new Error(`Refused to run: bucket "${config.bucket}" is not clearly a staging bucket.`);
  }

  const storage = createS3CompatibleDocumentStorage(config);
  const candidateId = "00000000-0000-4000-8000-00000000f11e";
  const actorRefId = "00000000-0000-4000-8000-00000000ac70";
  let pass = 0;
  let fail = 0;

  for (const name of readdirSync(FIXTURE_DIR).sort()) {
    const expected = EXPECTED[name];

    if (!expected) {
      continue;
    }

    const body = readFileSync(`${FIXTURE_DIR}/${name}`);
    const target = await storage.createPresignedUpload({
      candidateId,
      uploadId: `phase5-${Date.now()}-${name.replace(/[^a-z0-9]/gi, "")}`,
      uploadKind: "resume",
      originalFilename: name,
      contentType: expected.mime,
      contentLengthBytes: body.byteLength,
      requestedByRefId: actorRefId,
    });

    const put = await fetch(target.uploadUrl, {
      method: "PUT",
      headers: target.requiredHeaders,
      body: new Uint8Array(body),
    });

    if (!put.ok) {
      throw new Error(`Presigned upload of ${name} failed with HTTP ${put.status}.`);
    }

    try {
      const metadata = await storage.getObjectMetadata(target.objectKey);

      if (!metadata) {
        throw new Error(`Uploaded object metadata missing for ${name}.`);
      }

      const verdict = await validateResumeFileRanges(
        {
          declaredMimeType: metadata.contentType,
          declaredSizeBytes: metadata.contentLengthBytes,
          maxUploadBytes: config.maxUploadBytes,
        },
        async (start, length) =>
          (await storage.getObjectRange(target.objectKey, start, start + length - 1)) ??
          new Uint8Array(0),
      );

      const statusOk = verdict.status === expected.status;
      const scanOk = metadata.malwareScanStatus === "not_scanned";

      console.log(
        `  ${statusOk && scanOk ? "✓" : "✗"}  ${name.padEnd(24)} -> ${verdict.status.padEnd(
          28,
        )} scan=${metadata.malwareScanStatus}`,
      );

      if (!statusOk) {
        console.log(`       expected ${expected.status}, detail=${verdict.detail}`);
      }

      if (!scanOk) {
        console.log(`       expected malwareScanStatus=not_scanned`);
      }

      if (statusOk && scanOk) {
        pass += 1;
      } else {
        fail += 1;
      }
    } finally {
      await storage.deleteObject(target.objectKey);

      if (await storage.getObjectMetadata(target.objectKey)) {
        throw new Error(`Cleanup failed for ${name}; object still present.`);
      }
    }
  }

  console.log(`\n${pass + fail} checks: ${pass} passed, ${fail} failed`);

  if (fail > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
