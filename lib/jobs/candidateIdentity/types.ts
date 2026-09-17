export const CANDIDATE_IDENTITY_EXTERNAL_COLLECTION = "users";
export const CANDIDATE_IDENTITY_TYPE = "candidate_user";

export interface WebsiteUserIdentity {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string | null;
}

export interface CandidateIdentityInitializationInput {
  user: WebsiteUserIdentity | null;
}

export interface CandidateIdentityRepositoryInput {
  externalCollection: typeof CANDIDATE_IDENTITY_EXTERNAL_COLLECTION;
  externalId: string;
  identityType: typeof CANDIDATE_IDENTITY_TYPE;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string | null;
}

export interface CandidateIdentityRepositoryResult {
  identityRefId: string;
  candidateId: string;
  email: string;
  displayName: string;
  candidateStatus: string;
  candidateDeletedAt?: Date | string | null;
  emailContactCreated: boolean;
  mobileContactCreated: boolean;
  staffCapabilityGranted: boolean;
}

export interface CandidateIdentityRepository {
  initializeCandidateIdentity(
    input: CandidateIdentityRepositoryInput,
  ): Promise<CandidateIdentityRepositoryResult>;
}

export interface CandidateAccountSession {
  candidateId: string;
  actorRefId: string;
  email: string;
  displayName: string;
}

export class CandidateIdentityAuthorizationError extends Error {
  constructor(message = "Please log in to access your Jobs account.") {
    super(message);
    this.name = "CandidateIdentityAuthorizationError";
  }
}

export class CandidateIdentityUnavailableError extends Error {
  constructor(message = "Your Jobs account is not available right now.") {
    super(message);
    this.name = "CandidateIdentityUnavailableError";
  }
}
