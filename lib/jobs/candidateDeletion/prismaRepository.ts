import "server-only";

import { Prisma } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";

import {
  ANONYMISED_AUDIT_TOMBSTONE,
  ANONYMISED_NAME,
  type CandidateDeletionRepository,
} from "./types";

export class PrismaCandidateDeletionRepository implements CandidateDeletionRepository {
  constructor(private readonly prisma: PrismaClient = getJobsPrismaClient()) {}

  async loadCandidate(candidateId: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      select: { id: true, deleted_at: true, identity_ref_id: true },
    });

    if (!candidate) {
      return null;
    }

    return {
      id: candidate.id,
      deletedAt: candidate.deleted_at,
      identityRefId: candidate.identity_ref_id,
    };
  }

  /** Every storage key this candidate owns, across both document tables. */
  async listStoredObjectKeys(candidateId: string): Promise<string[]> {
    const [resumes, documents] = await Promise.all([
      this.prisma.resumeVersion.findMany({
        where: { candidate_id: candidateId },
        select: { file_storage_key: true },
      }),
      this.prisma.candidateDocument.findMany({
        where: { candidate_id: candidateId },
        select: { file_storage_key: true },
      }),
    ]);

    return [
      ...resumes.map((row) => row.file_storage_key),
      ...documents.map((row) => row.file_storage_key),
    ].filter((key): key is string => Boolean(key));
  }

  /**
   * Hard-deletes the candidate's own personal data.
   *
   * One transaction, ordered so that child rows go before their parents --
   * every relation here is onDelete: NoAction, so the database will not do this
   * ordering for us.
   */
  async purgeCandidateOwnedData(candidateId: string): Promise<Record<string, number>> {
    return this.prisma.$transaction(async (tx) => {
      const resumeVersions = await tx.resumeVersion.findMany({
        where: { candidate_id: candidateId },
        select: { id: true },
      });
      const resumeVersionIds = resumeVersions.map((row) => row.id);

      // AIExtraction holds extracted personal data and must go before the runs
      // and resume versions it points at.
      const aiExtractions = await tx.aIExtraction.deleteMany({ where: { candidate_id: candidateId } });
      const aiScores = await tx.aIScore.deleteMany({ where: { candidate_id: candidateId } });

      // Candidate points at its current resume; clear the reference first.
      await tx.candidate.updateMany({
        where: { id: candidateId },
        data: { current_resume_version_id: null },
      });

      const resumeRows = await tx.resumeVersion.deleteMany({ where: { candidate_id: candidateId } });

      const aiRuns = resumeVersionIds.length
        ? await tx.aIProcessingRun.deleteMany({ where: { entity_id: { in: resumeVersionIds } } })
        : { count: 0 };

      const documents = await tx.candidateDocument.deleteMany({ where: { candidate_id: candidateId } });
      const contacts = await tx.candidateContact.deleteMany({ where: { candidate_id: candidateId } });
      const employments = await tx.candidateEmployment.deleteMany({ where: { candidate_id: candidateId } });
      const educations = await tx.candidateEducation.deleteMany({ where: { candidate_id: candidateId } });
      const certifications = await tx.candidateCertification.deleteMany({ where: { candidate_id: candidateId } });
      const skills = await tx.candidateSkill.deleteMany({ where: { candidate_id: candidateId } });
      const domains = await tx.candidateDomainExperience.deleteMany({ where: { candidate_id: candidateId } });
      const tags = await tx.candidateTag.deleteMany({ where: { candidate_id: candidateId } });
      const activities = await tx.candidateActivity.deleteMany({ where: { candidate_id: candidateId } });

      return {
        aiExtractions: aiExtractions.count,
        aiScores: aiScores.count,
        resumeVersions: resumeRows.count,
        aiProcessingRuns: aiRuns.count,
        candidateDocuments: documents.count,
        candidateContacts: contacts.count,
        candidateEmployments: employments.count,
        candidateEducations: educations.count,
        candidateCertifications: certifications.count,
        candidateSkills: skills.count,
        candidateDomainExperiences: domains.count,
        candidateTags: tags.count,
        candidateActivities: activities.count,
      };
    });
  }

  /**
   * Anonymises the records Estabizz retains.
   *
   * The Candidate row, the point-in-time application snapshots (which copy
   * name, employer and salary at apply time), free-text screening answers, and
   * the IP/user-agent on consent records. The consent event itself is kept: it
   * is the proof of lawful basis, and the IP is not needed for that.
   */
  async anonymiseRetainedRecords(input: {
    candidateId: string;
    actorRefId: string;
    reason: string;
  }): Promise<Record<string, number>> {
    return this.prisma.$transaction(async (tx) => {
      const candidate = await tx.candidate.updateMany({
        where: { id: input.candidateId },
        data: {
          first_name: ANONYMISED_NAME,
          last_name: ANONYMISED_NAME,
          preferred_name: null,
          date_of_birth: null,
          gender: null,
          nationality: null,
          current_country: null,
          current_state: null,
          current_city: null,
          current_postal_code: null,
          current_title: null,
          current_employer: null,
          years_of_experience: null,
          current_salary_amount: null,
          current_salary_currency: null,
          current_total_comp_amount: null,
          current_total_comp_currency: null,
          notice_period_days: null,
          available_from: null,
          work_authorization: null,
          expected_salary_min: null,
          expected_salary_max: null,
          expected_salary_currency: null,
          preference_notes: null,
          internal_rating: null,
          current_resume_version_id: null,
          // Unlink the website identity so the account can no longer resolve
          // back to this candidate on a future login.
          identity_ref_id: null,
          portal_registered: false,
          status: "archived",
          deleted_at: new Date(),
          deleted_by_ref_id: input.actorRefId,
          deleted_reason: input.reason,
        },
      });

      const snapshots = await tx.applicationSnapshot.updateMany({
        where: { candidate_id: input.candidateId },
        data: {
          first_name: ANONYMISED_NAME,
          last_name: ANONYMISED_NAME,
          current_title: null,
          current_employer: null,
          years_of_experience: null,
          current_salary_amount: null,
          current_salary_currency: null,
          notice_period_days: null,
          resume_version_id: null,
          profile_data: {} as Prisma.InputJsonValue,
        },
      });

      const applicationIds = (
        await tx.application.findMany({
          where: { candidate_id: input.candidateId },
          select: { id: true },
        })
      ).map((row) => row.id);

      // Free-text answers can contain anything the candidate typed.
      const answers = applicationIds.length
        ? await tx.applicationAnswer.updateMany({
            where: { application_id: { in: applicationIds }, answer_text: { not: null } },
            data: { answer_text: null },
          })
        : { count: 0 };

      const consents = await tx.candidateConsent.updateMany({
        where: { candidate_id: input.candidateId },
        data: { ip_address: null, user_agent: null },
      });

      return {
        candidate: candidate.count,
        applicationSnapshots: snapshots.count,
        applicationAnswers: answers.count,
        candidateConsents: consents.count,
      };
    });
  }

  /**
   * Keeps the audit trail, strips the personal data out of it.
   *
   * Proposal audit events record before/after field values, which is how an
   * audit trail works -- and those values are the candidate's name, email and
   * employment history. Action, actor and timestamp survive so the security
   * record remains; the values are replaced with a tombstone.
   */
  async minimiseAuditEvents(candidateId: string): Promise<number> {
    const result = await this.prisma.auditEvent.updateMany({
      where: {
        entity_id: candidateId,
        OR: [{ new_values: { not: Prisma.DbNull } }, { previous_values: { not: Prisma.DbNull } }],
      },
      data: {
        new_values: ANONYMISED_AUDIT_TOMBSTONE as unknown as Prisma.InputJsonValue,
        previous_values: ANONYMISED_AUDIT_TOMBSTONE as unknown as Prisma.InputJsonValue,
        changed_fields: [],
      },
    });

    return result.count;
  }
}
