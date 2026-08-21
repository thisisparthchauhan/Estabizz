import type {
  CandidateCanonicalPatch,
  CandidateCanonicalProfileSnapshot,
  CandidateResumeContext,
  ProfileProposalEnvelope,
  ProfileProposalRecord,
  ProfileProposalRepository,
  ProfileReviewAuditEvent,
} from "./types";

export interface InMemoryProfileReviewSeed {
  candidates: Array<{
    candidateId: string;
    resumeVersionId: string;
    profile?: CandidateCanonicalProfileSnapshot;
  }>;
}

export class InMemoryProfileProposalRepository implements ProfileProposalRepository {
  readonly proposals: ProfileProposalRecord[] = [];
  readonly auditEvents: ProfileReviewAuditEvent[] = [];
  readonly profiles = new Map<string, CandidateCanonicalProfileSnapshot>();
  readonly contacts = new Map<string, Array<{ type: "email" | "phone_mobile"; value: string }>>();
  private readonly resumeToCandidate = new Map<string, string>();
  private sequence = 1;

  constructor(seed: InMemoryProfileReviewSeed) {
    for (const candidate of seed.candidates) {
      this.resumeToCandidate.set(candidate.resumeVersionId, candidate.candidateId);
      this.profiles.set(candidate.candidateId, candidate.profile ?? {});
    }
  }

  async getCandidateResumeContext(
    candidateId: string,
    resumeVersionId: string,
  ): Promise<CandidateResumeContext | null> {
    if (this.resumeToCandidate.get(resumeVersionId) !== candidateId) {
      return null;
    }

    return {
      candidateId,
      resumeVersionId,
      currentProfile: this.profiles.get(candidateId) ?? {},
    };
  }

  async findProposalByRunField(params: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
  }): Promise<ProfileProposalRecord | null> {
    return (
      this.proposals.find(
        (proposal) =>
          proposal.candidateId === params.candidateId &&
          proposal.resumeVersionId === params.resumeVersionId &&
          proposal.aiProcessingRunId === params.aiProcessingRunId &&
          proposal.fieldPath === params.fieldPath,
      ) ?? null
    );
  }

  async createProposal(input: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
    extractedValue: ProfileProposalEnvelope;
    confidenceScore: number | null;
  }): Promise<ProfileProposalRecord> {
    const record: ProfileProposalRecord = {
      id: `proposal-${this.sequence++}`,
      candidateId: input.candidateId,
      resumeVersionId: input.resumeVersionId,
      aiProcessingRunId: input.aiProcessingRunId,
      fieldPath: input.fieldPath,
      extractedValue: input.extractedValue,
      confidenceScore: input.confidenceScore,
      isApplied: false,
      candidateVerified: false,
      supersededById: null,
      createdAt: new Date(),
    };
    this.proposals.push(record);
    return clone(record);
  }

  async updateProposal(
    proposalId: string,
    patch: Partial<Pick<ProfileProposalRecord, "extractedValue" | "confidenceScore" | "isApplied" | "candidateVerified" | "supersededById">>,
  ): Promise<ProfileProposalRecord> {
    const index = this.proposals.findIndex((proposal) => proposal.id === proposalId);

    if (index === -1) {
      throw new Error("Proposal not found.");
    }

    this.proposals[index] = {
      ...this.proposals[index],
      ...patch,
    };
    return clone(this.proposals[index]);
  }

  async listOpenProposalsForField(params: {
    candidateId: string;
    fieldPath: string;
    excludeProposalId?: string;
  }): Promise<ProfileProposalRecord[]> {
    return this.proposals
      .filter(
        (proposal) =>
          proposal.candidateId === params.candidateId &&
          proposal.fieldPath === params.fieldPath &&
          proposal.id !== params.excludeProposalId &&
          proposal.supersededById === null &&
          proposal.extractedValue.reviewStatus === "ai_proposed",
      )
      .map(clone);
  }

  async getProposalById(proposalId: string): Promise<ProfileProposalRecord | null> {
    const proposal = this.proposals.find((item) => item.id === proposalId);
    return proposal ? clone(proposal) : null;
  }

  async listProposalsForCandidate(candidateId: string): Promise<ProfileProposalRecord[]> {
    return this.proposals.filter((proposal) => proposal.candidateId === candidateId).map(clone);
  }

  async applyCanonicalPatch(candidateId: string, patch: CandidateCanonicalPatch): Promise<void> {
    const current = this.profiles.get(candidateId) ?? {};

    if (patch.candidate) {
      this.profiles.set(candidateId, {
        ...current,
        ...patch.candidate,
      });
    }

    if (patch.contacts?.length) {
      const currentContacts = this.contacts.get(candidateId) ?? [];
      for (const contact of patch.contacts) {
        if (!currentContacts.some((item) => item.type === contact.type && item.value === contact.value)) {
          currentContacts.push(contact);
        }
      }
      this.contacts.set(candidateId, currentContacts);
    }
  }

  async writeAuditEvent(event: ProfileReviewAuditEvent): Promise<void> {
    this.auditEvents.push(clone(event));
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
