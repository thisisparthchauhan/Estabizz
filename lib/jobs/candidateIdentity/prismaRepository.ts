import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type {
  CandidateIdentityRepository,
  CandidateIdentityRepositoryInput,
  CandidateIdentityRepositoryResult,
} from "./types";

export class PrismaCandidateIdentityRepository implements CandidateIdentityRepository {
  constructor(private readonly prisma: PrismaClient = getJobsPrismaClient()) {}

  async initializeCandidateIdentity(
    input: CandidateIdentityRepositoryInput,
  ): Promise<CandidateIdentityRepositoryResult> {
    return this.prisma.$transaction(async (tx) => {
      const identity = await tx.identityReference.upsert({
        where: {
          external_collection_external_id: {
            external_collection: input.externalCollection,
            external_id: input.externalId,
          },
        },
        update: {
          display_name_cache: input.displayName,
          email_cache: input.email,
          is_active_cache: true,
          last_synced_at: new Date(),
        },
        create: {
          external_collection: input.externalCollection,
          external_id: input.externalId,
          identity_type: input.identityType,
          display_name_cache: input.displayName,
          email_cache: input.email,
          is_active_cache: true,
          last_synced_at: new Date(),
        },
        select: {
          id: true,
          display_name_cache: true,
          email_cache: true,
        },
      });

      const candidate = await tx.candidate.upsert({
        where: {
          identity_ref_id: identity.id,
        },
        update: {
          portal_registered: true,
        },
        create: {
          identity_ref_id: identity.id,
          candidate_code: buildCandidateCode(identity.id),
          status: "active",
          source: "portal_registration",
          first_name: input.firstName,
          last_name: input.lastName,
          portal_registered: true,
          created_by_ref_id: identity.id,
        },
        select: {
          id: true,
          status: true,
          deleted_at: true,
        },
      });

      if (!candidate.deleted_at && candidate.status !== "archived" && candidate.status !== "blacklisted") {
        await tx.candidateContact.upsert({
          where: {
            candidate_id_contact_type_value: {
              candidate_id: candidate.id,
              contact_type: "email",
              value: input.email,
            },
          },
          update: {
            is_primary: true,
            opt_out: false,
          },
          create: {
            candidate_id: candidate.id,
            contact_type: "email",
            value: input.email,
            is_primary: true,
            is_verified: false,
            opt_out: false,
          },
        });

        if (input.mobile) {
          await tx.candidateContact.upsert({
            where: {
              candidate_id_contact_type_value: {
                candidate_id: candidate.id,
                contact_type: "phone_mobile",
                value: input.mobile,
              },
            },
            update: {
              opt_out: false,
            },
            create: {
              candidate_id: candidate.id,
              contact_type: "phone_mobile",
              value: input.mobile,
              is_primary: false,
              is_verified: false,
              opt_out: false,
            },
          });
        }
      }

      const staffCapability = await tx.staffJobsCapability.findUnique({
        where: {
          identity_ref_id: identity.id,
        },
        select: {
          id: true,
        },
      });

      return {
        identityRefId: identity.id,
        candidateId: candidate.id,
        email: identity.email_cache ?? input.email,
        displayName: identity.display_name_cache ?? input.displayName,
        candidateStatus: candidate.status,
        candidateDeletedAt: candidate.deleted_at,
        emailContactCreated: true,
        mobileContactCreated: Boolean(input.mobile),
        staffCapabilityGranted: Boolean(staffCapability),
      };
    });
  }
}

export function buildCandidateCode(identityRefId: string): string {
  return `C${identityRefId.replace(/-/g, "").slice(0, 19).toUpperCase()}`;
}
