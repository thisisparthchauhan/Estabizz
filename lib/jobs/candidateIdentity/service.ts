import {
  CANDIDATE_IDENTITY_EXTERNAL_COLLECTION,
  CANDIDATE_IDENTITY_TYPE,
  CandidateIdentityAuthorizationError,
  CandidateIdentityUnavailableError,
  type CandidateAccountSession,
  type CandidateIdentityInitializationInput,
  type CandidateIdentityRepository,
  type WebsiteUserIdentity,
} from "./types";

const INACTIVE_CANDIDATE_STATUSES = new Set(["archived", "blacklisted"]);

export async function initializeCandidateAccountIdentity(
  input: CandidateIdentityInitializationInput,
  repository: CandidateIdentityRepository,
): Promise<CandidateAccountSession> {
  if (!input.user) {
    throw new CandidateIdentityAuthorizationError();
  }

  const user = normalizeWebsiteUserIdentity(input.user);
  const result = await repository.initializeCandidateIdentity({
    externalCollection: CANDIDATE_IDENTITY_EXTERNAL_COLLECTION,
    externalId: user.userId,
    identityType: CANDIDATE_IDENTITY_TYPE,
    displayName: formatDisplayName(user),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
  });

  if (result.candidateDeletedAt || INACTIVE_CANDIDATE_STATUSES.has(result.candidateStatus)) {
    throw new CandidateIdentityUnavailableError("This Jobs candidate account is not active.");
  }

  if (result.staffCapabilityGranted) {
    throw new CandidateIdentityUnavailableError("This account cannot be initialized as a candidate account.");
  }

  return {
    candidateId: result.candidateId,
    actorRefId: result.identityRefId,
    email: result.email,
    displayName: result.displayName,
  };
}

export function normalizeWebsiteUserIdentity(user: WebsiteUserIdentity): WebsiteUserIdentity {
  const userId = user.userId.trim();
  const email = user.email.toLowerCase().trim();
  const firstName = normalizeName(user.firstName) || "Candidate";
  const lastName = normalizeName(user.lastName) || "Account";
  const mobile = user.mobile ? user.mobile.trim() || null : null;

  if (!/^[a-f0-9]{24}$/i.test(userId)) {
    throw new CandidateIdentityAuthorizationError("Your website account session is invalid.");
  }

  if (!email || !email.includes("@")) {
    throw new CandidateIdentityAuthorizationError("Your website account email is invalid.");
  }

  return {
    userId,
    email,
    firstName,
    lastName,
    mobile,
  };
}

export function formatDisplayName(user: Pick<WebsiteUserIdentity, "firstName" | "lastName" | "email">): string {
  const name = `${normalizeName(user.firstName)} ${normalizeName(user.lastName)}`.trim();
  return name || user.email;
}

function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 100);
}
