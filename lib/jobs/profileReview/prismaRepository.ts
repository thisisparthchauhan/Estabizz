import "server-only";

import type { Prisma, PrismaClient } from "@prisma/client";

import type {
  CandidateCanonicalPatch,
  CandidateResumeContext,
  ProfileProposalEnvelope,
  ProfileProposalRecord,
  ProfileProposalRepository,
  ProfileReviewAuditEvent,
} from "./types";

export class PrismaProfileProposalRepository implements ProfileProposalRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getCandidateResumeContext(
    candidateId: string,
    resumeVersionId: string,
  ): Promise<CandidateResumeContext | null> {
    const candidate = await this.prisma.candidate.findFirst({
      where: {
        id: candidateId,
        deleted_at: null,
        resume_versions: {
          some: {
            id: resumeVersionId,
            deleted_at: null,
          },
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        current_title: true,
        current_employer: true,
        years_of_experience: true,
        current_city: true,
        current_state: true,
      },
    });

    if (!candidate) {
      return null;
    }

    return {
      candidateId: candidate.id,
      resumeVersionId,
      currentProfile: {
        firstName: candidate.first_name,
        lastName: candidate.last_name,
        currentTitle: candidate.current_title,
        currentEmployer: candidate.current_employer,
        yearsOfExperience: candidate.years_of_experience,
        currentCity: candidate.current_city,
        currentState: candidate.current_state,
      },
    };
  }

  async findProposalByRunField(params: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
  }): Promise<ProfileProposalRecord | null> {
    const row = await this.prisma.aIExtraction.findFirst({
      where: {
        candidate_id: params.candidateId,
        resume_version_id: params.resumeVersionId,
        ai_processing_run_id: params.aiProcessingRunId,
        field_path: params.fieldPath,
      },
    });
    return row ? mapExtraction(row) : null;
  }

  async createProposal(input: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
    extractedValue: ProfileProposalEnvelope;
    confidenceScore: number | null;
  }): Promise<ProfileProposalRecord> {
    const row = await this.prisma.aIExtraction.create({
      data: {
        candidate_id: input.candidateId,
        resume_version_id: input.resumeVersionId,
        ai_processing_run_id: input.aiProcessingRunId,
        field_path: input.fieldPath,
        extracted_value: input.extractedValue as unknown as Prisma.InputJsonValue,
        confidence_score: input.confidenceScore,
      },
    });
    return mapExtraction(row);
  }

  async updateProposal(
    proposalId: string,
    patch: Partial<Pick<ProfileProposalRecord, "extractedValue" | "confidenceScore" | "isApplied" | "candidateVerified" | "supersededById">>,
  ): Promise<ProfileProposalRecord> {
    const row = await this.prisma.aIExtraction.update({
      where: { id: proposalId },
      data: {
        extracted_value: patch.extractedValue as unknown as Prisma.InputJsonValue | undefined,
        confidence_score: patch.confidenceScore,
        is_applied: patch.isApplied,
        applied_at: patch.isApplied ? new Date() : undefined,
        candidate_verified: patch.candidateVerified,
        candidate_verified_at: patch.candidateVerified ? new Date() : undefined,
        superseded_by_id: patch.supersededById,
      },
    });
    return mapExtraction(row);
  }

  async listOpenProposalsForField(params: {
    candidateId: string;
    fieldPath: string;
    excludeProposalId?: string;
  }): Promise<ProfileProposalRecord[]> {
    const rows = await this.prisma.aIExtraction.findMany({
      where: {
        candidate_id: params.candidateId,
        field_path: params.fieldPath,
        superseded_by_id: null,
        is_applied: false,
        id: params.excludeProposalId ? { not: params.excludeProposalId } : undefined,
      },
    });
    return rows
      .map(mapExtraction)
      .filter((proposal) => proposal.extractedValue.reviewStatus === "ai_proposed");
  }

  async getProposalById(proposalId: string): Promise<ProfileProposalRecord | null> {
    const row = await this.prisma.aIExtraction.findUnique({ where: { id: proposalId } });
    return row ? mapExtraction(row) : null;
  }

  async listProposalsForCandidate(candidateId: string): Promise<ProfileProposalRecord[]> {
    const rows = await this.prisma.aIExtraction.findMany({
      where: { candidate_id: candidateId },
      orderBy: { created_at: "desc" },
    });
    return rows.map(mapExtraction);
  }

  async applyCanonicalPatch(candidateId: string, patch: CandidateCanonicalPatch): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      if (patch.candidate) {
        const candidateData: Prisma.CandidateUpdateInput = {};

        if (patch.candidate.firstName !== undefined && patch.candidate.firstName !== null) {
          candidateData.first_name = patch.candidate.firstName;
        }
        if (patch.candidate.lastName !== undefined && patch.candidate.lastName !== null) {
          candidateData.last_name = patch.candidate.lastName;
        }
        if (patch.candidate.currentTitle !== undefined) {
          candidateData.current_title = patch.candidate.currentTitle;
        }
        if (patch.candidate.currentEmployer !== undefined) {
          candidateData.current_employer = patch.candidate.currentEmployer;
        }
        if (patch.candidate.yearsOfExperience !== undefined) {
          candidateData.years_of_experience = patch.candidate.yearsOfExperience;
        }
        if (patch.candidate.currentCity !== undefined) {
          candidateData.current_city = patch.candidate.currentCity;
        }
        if (patch.candidate.currentState !== undefined) {
          candidateData.current_state = patch.candidate.currentState;
        }

        await tx.candidate.update({
          where: { id: candidateId },
          data: candidateData,
        });
      }

      for (const contact of patch.contacts ?? []) {
        await tx.candidateContact.upsert({
          where: {
            candidate_id_contact_type_value: {
              candidate_id: candidateId,
              contact_type: contact.type,
              value: contact.value,
            },
          },
          create: {
            candidate_id: candidateId,
            contact_type: contact.type,
            value: contact.value,
            is_primary: false,
            is_verified: false,
          },
          update: {},
        });
      }
    });
  }

  async writeAuditEvent(event: ProfileReviewAuditEvent): Promise<void> {
    await this.prisma.auditEvent.create({
      data: {
        entity_type: "candidate",
        entity_id: event.candidateId,
        action: event.action,
        actor_ref_id: event.actorRefId,
        actor_type: event.actorType,
        changed_fields: event.changedFields,
        previous_values: event.previousValues as unknown as Prisma.InputJsonValue,
        new_values: event.newValues as unknown as Prisma.InputJsonValue,
        context: {
          ...event.context,
          proposalId: event.proposalId,
        } as Prisma.InputJsonValue,
      },
    });
  }
}

function mapExtraction(row: {
  id: string;
  candidate_id: string;
  resume_version_id: string;
  ai_processing_run_id: string;
  field_path: string;
  extracted_value: unknown;
  confidence_score: unknown;
  is_applied: boolean;
  candidate_verified: boolean;
  superseded_by_id: string | null;
  created_at: Date;
}): ProfileProposalRecord {
  return {
    id: row.id,
    candidateId: row.candidate_id,
    resumeVersionId: row.resume_version_id,
    aiProcessingRunId: row.ai_processing_run_id,
    fieldPath: row.field_path,
    extractedValue: row.extracted_value as ProfileProposalEnvelope,
    confidenceScore:
      typeof row.confidence_score === "number"
        ? row.confidence_score
        : row.confidence_score === null
          ? null
          : Number(row.confidence_score),
    isApplied: row.is_applied,
    candidateVerified: row.candidate_verified,
    supersededById: row.superseded_by_id,
    createdAt: row.created_at,
  };
}
