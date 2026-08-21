import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type {
  ResumeUploadRepository,
  ResumeUploadRepositoryResult,
} from "./types";

export class PrismaResumeUploadRepository implements ResumeUploadRepository {
  constructor(private readonly prisma: PrismaClient = getJobsPrismaClient()) {}

  async confirmUploadedResume(
    input: Parameters<ResumeUploadRepository["confirmUploadedResume"]>[0],
  ): Promise<ResumeUploadRepositoryResult> {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${input.token.objectKey}))`;

      const existing = await tx.resumeVersion.findFirst({
        where: {
          candidate_id: input.session.candidateId,
          file_storage_key: input.token.objectKey,
          deleted_at: null,
        },
        select: {
          id: true,
          version_number: true,
          file_name_original: true,
          file_type: true,
          file_size_bytes: true,
          created_at: true,
        },
      });

      if (existing) {
        return {
          resumeVersionId: existing.id,
          versionNumber: existing.version_number,
          fileName: existing.file_name_original,
          fileType: input.token.contentType,
          fileSizeBytes: existing.file_size_bytes,
          uploadedAt: existing.created_at,
          created: false,
        };
      }

      const latest = await tx.resumeVersion.findFirst({
        where: {
          candidate_id: input.session.candidateId,
        },
        select: {
          version_number: true,
        },
        orderBy: {
          version_number: "desc",
        },
      });
      const versionNumber = (latest?.version_number ?? 0) + 1;

      await tx.resumeVersion.updateMany({
        where: {
          candidate_id: input.session.candidateId,
          is_current: true,
          deleted_at: null,
        },
        data: {
          is_current: false,
        },
      });

      const resumeVersion = await tx.resumeVersion.create({
        data: {
          candidate_id: input.session.candidateId,
          version_number: versionNumber,
          is_current: true,
          file_storage_key: input.token.objectKey,
          file_name_original: input.token.fileName,
          file_type: input.token.contentType,
          file_size_bytes: input.metadata.contentLengthBytes,
          uploaded_by_ref_id: input.session.actorRefId,
          uploaded_on_behalf: false,
          parse_status: "pending",
        },
        select: {
          id: true,
          version_number: true,
          file_name_original: true,
          file_type: true,
          file_size_bytes: true,
          created_at: true,
        },
      });

      await tx.candidate.update({
        where: {
          id: input.session.candidateId,
        },
        data: {
          current_resume_version_id: resumeVersion.id,
        },
      });

      await tx.candidateActivity.create({
        data: {
          candidate_id: input.session.candidateId,
          activity_type: "resume_uploaded",
          description: "Candidate uploaded a private resume.",
          actor_ref_id: input.session.actorRefId,
          related_entity_type: "resume_version",
          related_entity_id: resumeVersion.id,
        },
      });

      return {
        resumeVersionId: resumeVersion.id,
        versionNumber: resumeVersion.version_number,
        fileName: resumeVersion.file_name_original,
        fileType: input.token.contentType,
        fileSizeBytes: resumeVersion.file_size_bytes,
        uploadedAt: resumeVersion.created_at,
        created: true,
      };
    });
  }
}
