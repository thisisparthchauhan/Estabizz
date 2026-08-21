import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { CandidateProfileSession } from "@/lib/jobs/profileReview/candidateAccess";
import { buildCandidateAccountDashboardViewModel } from "./service";
import type {
  CandidateAccountApplicationView,
  CandidateAccountDashboardInput,
  CandidateAccountDashboardViewModel,
} from "./types";

export async function loadCandidateAccountDashboard(
  session: CandidateProfileSession,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateAccountDashboardViewModel> {
  const input = await loadCandidateAccountDashboardInput(session, prisma);
  return buildCandidateAccountDashboardViewModel(input);
}

export async function loadCandidateApplications(
  session: CandidateProfileSession,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateAccountApplicationView[]> {
  const dashboard = await loadCandidateAccountDashboard(session, prisma);
  return dashboard.recentApplications;
}

async function loadCandidateAccountDashboardInput(
  session: CandidateProfileSession,
  prisma: PrismaClient,
): Promise<CandidateAccountDashboardInput> {
  if (!session.candidateId) {
    return emptyDashboardInput(session.email);
  }

  const candidate = await prisma.candidate.findFirst({
    where: {
      id: session.candidateId,
      deleted_at: null,
    },
    select: {
      first_name: true,
      last_name: true,
      current_title: true,
      current_employer: true,
      years_of_experience: true,
      current_city: true,
      current_state: true,
      contacts: {
        where: {
          contact_type: { in: ["email", "phone_mobile"] },
          opt_out: false,
        },
        select: {
          contact_type: true,
          value: true,
          is_primary: true,
        },
        orderBy: [{ is_primary: "desc" }, { created_at: "asc" }],
      },
      current_resume: {
        select: {
          parse_status: true,
          deleted_at: true,
        },
      },
      resume_versions: {
        where: {
          deleted_at: null,
        },
        select: {
          parse_status: true,
        },
        orderBy: [{ is_current: "desc" }, { version_number: "desc" }],
        take: 1,
      },
      ai_extractions: {
        where: {
          candidate_verified: false,
          superseded_by_id: null,
        },
        select: {
          id: true,
          extracted_value: true,
        },
        take: 50,
      },
      applications: {
        where: {
          deleted_at: null,
        },
        select: {
          id: true,
          created_at: true,
          job: {
            select: {
              title: true,
              organization: {
                select: {
                  display_name: true,
                  legal_name: true,
                },
              },
            },
          },
          current_stage: {
            select: {
              name: true,
              slug: true,
              is_terminal: true,
              is_positive_terminal: true,
            },
          },
          interviews: {
            where: {
              deleted_at: null,
              status: "scheduled",
            },
            select: {
              id: true,
              interview_type: true,
              status: true,
              scheduled_at: true,
              format: true,
              application: {
                select: {
                  job: {
                    select: {
                      title: true,
                      organization: {
                        select: {
                          display_name: true,
                          legal_name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { created_at: "desc" },
        take: 50,
      },
      _count: {
        select: {
          employments: true,
          educations: true,
          skills: true,
          domain_experiences: true,
        },
      },
    },
  });

  if (!candidate) {
    return emptyDashboardInput(session.email);
  }

  const currentResumeStatus = candidate.current_resume?.deleted_at
    ? undefined
    : candidate.current_resume?.parse_status;
  const fallbackResumeStatus = candidate.resume_versions[0]?.parse_status;
  const applications = candidate.applications.map((application) => ({
    id: application.id,
    jobTitle: application.job.title,
    organizationName: formatOrganizationName(application.job.organization),
    appliedAt: application.created_at,
    stageName: application.current_stage.name,
    stageSlug: application.current_stage.slug,
    isTerminal: application.current_stage.is_terminal,
    isPositiveTerminal: application.current_stage.is_positive_terminal,
  }));

  return {
    candidate: {
      firstName: candidate.first_name,
      lastName: candidate.last_name,
      currentTitle: candidate.current_title,
      currentEmployer: candidate.current_employer,
      yearsOfExperience: candidate.years_of_experience,
      currentCity: candidate.current_city,
      currentState: candidate.current_state,
      contacts: candidate.contacts.map((contact) => ({
        type: contact.contact_type === "email" ? "email" : "phone_mobile",
        value: contact.value,
      })),
      employmentCount: candidate._count.employments,
      educationCount: candidate._count.educations,
      skillCount: candidate._count.skills,
      domainCount: candidate._count.domain_experiences,
      hasResume: Boolean(candidate.current_resume && !candidate.current_resume.deleted_at) || candidate.resume_versions.length > 0,
    },
    resume: {
      hasResume: Boolean(candidate.current_resume && !candidate.current_resume.deleted_at) || candidate.resume_versions.length > 0,
      parseStatus: currentResumeStatus ?? fallbackResumeStatus ?? null,
      hasOpenProfileSuggestions: candidate.ai_extractions.some(hasOpenProfileSuggestion),
    },
    applications,
    savedJobsCount: 0,
    alertsCount: 0,
    upcomingInterviews: candidate.applications
      .flatMap((application) => application.interviews)
      .filter((interview) => interview.scheduled_at && interview.scheduled_at >= new Date())
      .map((interview) => ({
        id: interview.id,
        jobTitle: interview.application.job.title,
        organizationName: formatOrganizationName(interview.application.job.organization),
        scheduledAt: interview.scheduled_at,
        interviewType: interview.interview_type,
        status: interview.status,
        format: interview.format,
      })),
  };
}

function formatOrganizationName(
  organization: { display_name: string | null; legal_name: string } | null,
): string | null {
  return organization?.display_name || organization?.legal_name || null;
}

function hasOpenProfileSuggestion(extraction: { extracted_value: unknown }): boolean {
  const value = extraction.extracted_value;

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return (value as { reviewStatus?: unknown }).reviewStatus === "ai_proposed" ||
    (value as { reviewStatus?: unknown }).reviewStatus === "candidate_edited";
}

function emptyDashboardInput(email: string): CandidateAccountDashboardInput {
  return {
    candidate: {
      firstName: email.split("@")[0] || "Candidate",
      contacts: email ? [{ type: "email", value: email }] : [],
      hasResume: false,
    },
    resume: {
      hasResume: false,
      parseStatus: null,
      hasOpenProfileSuggestions: false,
    },
    applications: [],
    savedJobsCount: 0,
    alertsCount: 0,
    upcomingInterviews: [],
  };
}
