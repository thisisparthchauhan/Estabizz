import "server-only";

import type { NextRequest } from "next/server";
import type { PrismaClient } from "@prisma/client";

import { getAuthSession, getAuthSessionFromRequest } from "@/lib/auth/session";
import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import { initializeCandidateAccountIdentity } from "./service";
import { loadAuthenticatedWebsiteUser } from "./mongoUser";
import { PrismaCandidateIdentityRepository } from "./prismaRepository";
import type { CandidateAccountSession } from "./types";

export type { CandidateAccountSession } from "./types";

export async function requireCandidateAccountSessionFromRequest(
  request: NextRequest,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateAccountSession | null> {
  const authSession = getAuthSessionFromRequest(request);
  if (!authSession) return null;

  const user = await loadAuthenticatedWebsiteUser(authSession);
  if (!user) return null;

  return initializeCandidateAccountIdentity(
    { user },
    new PrismaCandidateIdentityRepository(prisma),
  );
}

export async function requireCandidateAccountSessionForPage(
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateAccountSession | null> {
  const authSession = await getAuthSession();
  if (!authSession) return null;

  const user = await loadAuthenticatedWebsiteUser(authSession);
  if (!user) return null;

  return initializeCandidateAccountIdentity(
    { user },
    new PrismaCandidateIdentityRepository(prisma),
  );
}
