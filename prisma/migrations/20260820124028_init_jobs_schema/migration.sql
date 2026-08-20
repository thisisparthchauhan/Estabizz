-- PostgreSQL extensions required by the frozen Jobs V1 ERD.
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('candidate_user', 'admin_user', 'system');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('active', 'passive', 'placed', 'on_notice', 'do_not_contact', 'blacklisted', 'archived');

-- CreateEnum
CREATE TYPE "CandidateSource" AS ENUM ('portal_registration', 'recruiter_sourced', 'referral', 'linkedin', 'job_board', 'career_fair', 'other');

-- CreateEnum
CREATE TYPE "WorkPreference" AS ENUM ('remote', 'hybrid', 'on_site', 'flexible');

-- CreateEnum
CREATE TYPE "CandidateDedupStatus" AS ENUM ('unique', 'suspected_duplicate', 'confirmed_duplicate', 'merged_into');

-- CreateEnum
CREATE TYPE "CandidateContactType" AS ENUM ('email', 'phone_mobile', 'phone_work', 'linkedin', 'github', 'portfolio', 'other');

-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('data_processing', 'marketing_email', 'data_retention_extended', 'profile_sharing_with_clients', 'ai_processing');

-- CreateEnum
CREATE TYPE "ConsentEvent" AS ENUM ('granted', 'withdrawn');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('full_time', 'part_time', 'contract', 'consulting', 'internship');

-- CreateEnum
CREATE TYPE "SkillProficiency" AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- CreateEnum
CREATE TYPE "DomainProficiency" AS ENUM ('aware', 'working', 'practitioner', 'expert');

-- CreateEnum
CREATE TYPE "ParseStatus" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('id_proof', 'certificate', 'offer_letter', 'reference_letter', 'other');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('candidate', 'job', 'system');

-- CreateEnum
CREATE TYPE "CandidateActivityType" AS ENUM ('profile_created', 'resume_uploaded', 'application_submitted', 'stage_changed', 'note_added', 'email_sent', 'call_logged', 'interview_scheduled', 'offer_extended', 'placed', 'contacted');

-- CreateEnum
CREATE TYPE "OrganizationSizeRange" AS ENUM ('1_10', '11_50', '51_200', '201_1000', '1000_plus');

-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('active', 'inactive', 'do_not_approach');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('retained', 'contingency', 'exclusive', 'preferred_supplier');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('active', 'on_hold', 'closed');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('percentage_ctc', 'fixed_fee', 'retainer_plus_success', 'milestone');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('draft', 'open', 'on_hold', 'closed', 'filled', 'cancelled');

-- CreateEnum
CREATE TYPE "JobEmploymentType" AS ENUM ('permanent', 'contract', 'consulting', 'fixed_term');

-- CreateEnum
CREATE TYPE "SeniorityLevel" AS ENUM ('junior', 'mid', 'senior', 'lead', 'director', 'vp', 'c_suite');

-- CreateEnum
CREATE TYPE "RemotePolicy" AS ENUM ('remote', 'hybrid', 'on_site');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'normal', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('low', 'normal', 'high');

-- CreateEnum
CREATE TYPE "JobQuestionType" AS ENUM ('text', 'yes_no', 'multiple_choice', 'scale');

-- CreateEnum
CREATE TYPE "JobAssignmentRole" AS ENUM ('lead_recruiter', 'supporting_recruiter', 'coordinator');

-- CreateEnum
CREATE TYPE "ApplicationSource" AS ENUM ('candidate_portal', 'recruiter_assigned', 'referral', 'imported');

-- CreateEnum
CREATE TYPE "RejectionReason" AS ENUM ('not_suitable', 'candidate_withdrew', 'client_declined', 'role_cancelled', 'duplicate');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('phone_screen', 'video_call', 'in_person', 'panel', 'technical', 'hr', 'final');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');

-- CreateEnum
CREATE TYPE "InterviewFormat" AS ENUM ('in_person', 'video', 'phone');

-- CreateEnum
CREATE TYPE "InterviewParticipantType" AS ENUM ('candidate', 'estabizz_recruiter', 'client_interviewer');

-- CreateEnum
CREATE TYPE "InterviewOutcome" AS ENUM ('advance', 'reject', 'hold', 'offer');

-- CreateEnum
CREATE TYPE "FeedbackRecommendation" AS ENUM ('advance', 'reject', 'consider_another_role');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('draft', 'extended', 'accepted', 'declined', 'rescinded', 'expired');

-- CreateEnum
CREATE TYPE "PlacementStatus" AS ENUM ('active', 'joined', 'resigned_in_guarantee', 'cancelled');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending_invoice', 'invoice_sent', 'partially_paid', 'paid', 'disputed', 'written_off');

-- CreateEnum
CREATE TYPE "JobsEntityType" AS ENUM ('candidate', 'application', 'job', 'organization', 'interview');

-- CreateEnum
CREATE TYPE "NoteVisibility" AS ENUM ('private', 'team', 'all_staff');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('follow_up', 'call', 'email', 'document_request', 'reference_check', 'internal', 'other');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('open', 'completed', 'cancelled', 'snoozed');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('email', 'phone_call', 'video_call', 'in_person', 'sms', 'whatsapp');

-- CreateEnum
CREATE TYPE "CommunicationDirection" AS ENUM ('outbound', 'inbound');

-- CreateEnum
CREATE TYPE "CommunicationEntityType" AS ENUM ('candidate', 'organization', 'client_contact');

-- CreateEnum
CREATE TYPE "AIRunType" AS ENUM ('resume_parse', 'candidate_embed', 'job_embed', 'match_score', 'search');

-- CreateEnum
CREATE TYPE "AIProcessingStatus" AS ENUM ('pending', 'running', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "EmbeddingEntityType" AS ENUM ('candidate', 'job');

-- CreateEnum
CREATE TYPE "AuditActorType" AS ENUM ('candidate_user', 'admin_user', 'system', 'ai_service');

-- CreateTable
CREATE TABLE "identity_references" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "external_id" VARCHAR(24) NOT NULL,
    "external_collection" VARCHAR(50) NOT NULL,
    "identity_type" "IdentityType" NOT NULL,
    "display_name_cache" VARCHAR(200),
    "email_cache" VARCHAR(255),
    "is_active_cache" BOOLEAN NOT NULL DEFAULT true,
    "last_synced_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "identity_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_jobs_capabilities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identity_ref_id" UUID NOT NULL,
    "role_template" VARCHAR(50),
    "grants" JSONB NOT NULL DEFAULT '[]',
    "granted_by_ref_id" UUID,
    "granted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "staff_jobs_capabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identity_ref_id" UUID,
    "candidate_code" VARCHAR(20) NOT NULL,
    "status" "CandidateStatus" NOT NULL,
    "source" "CandidateSource" NOT NULL,
    "source_detail" TEXT,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "preferred_name" VARCHAR(100),
    "date_of_birth" DATE,
    "gender" VARCHAR(50),
    "nationality" VARCHAR(2),
    "current_country" VARCHAR(2),
    "current_state" VARCHAR(100),
    "current_city" VARCHAR(100),
    "current_postal_code" VARCHAR(20),
    "current_title" VARCHAR(200),
    "current_employer" VARCHAR(200),
    "years_of_experience" INTEGER,
    "current_salary_amount" DECIMAL(15,4),
    "current_salary_currency" VARCHAR(3),
    "current_total_comp_amount" DECIMAL(15,4),
    "current_total_comp_currency" VARCHAR(3),
    "notice_period_days" INTEGER,
    "available_from" DATE,
    "work_authorization" VARCHAR(50),
    "remote_preference" "WorkPreference",
    "current_resume_version_id" UUID,
    "portal_registered" BOOLEAN NOT NULL DEFAULT false,
    "profile_completeness_pct" SMALLINT NOT NULL DEFAULT 0,
    "primary_recruiter_ref_id" UUID,
    "assigned_recruiter_ref_id" UUID,
    "assigned_team_id" UUID,
    "created_by_ref_id" UUID NOT NULL,
    "last_contacted_by_ref_id" UUID,
    "last_contacted_at" TIMESTAMPTZ(6),
    "active_process_owner_ref_id" UUID,
    "placement_credit_ref_id" UUID,
    "dedup_status" "CandidateDedupStatus" NOT NULL DEFAULT 'unique',
    "is_duplicate_of_id" UUID,
    "internal_rating" SMALLINT,
    "pref_job_types" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pref_remote" "WorkPreference",
    "pref_countries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pref_cities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "expected_salary_min" DECIMAL(15,4),
    "expected_salary_max" DECIMAL(15,4),
    "expected_salary_currency" VARCHAR(3),
    "open_to_relocation" BOOLEAN,
    "open_to_international" BOOLEAN,
    "target_industries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "target_seniority" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preference_notes" TEXT,
    "deleted_at" TIMESTAMPTZ(6),
    "deleted_by_ref_id" UUID,
    "deleted_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "contact_type" "CandidateContactType" NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "phone_country_code" VARCHAR(5),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_at" TIMESTAMPTZ(6),
    "opt_out" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_consents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "consent_type" "ConsentType" NOT NULL,
    "event" "ConsentEvent" NOT NULL,
    "ip_address" INET,
    "user_agent" TEXT,
    "source" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_employments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "employer_name" VARCHAR(300) NOT NULL,
    "employer_country" VARCHAR(2),
    "title" VARCHAR(200) NOT NULL,
    "employment_type" "EmploymentType",
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "location_city" VARCHAR(100),
    "location_country" VARCHAR(2),
    "salary_amount" DECIMAL(15,4),
    "salary_currency" VARCHAR(3),
    "ai_extracted" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_employments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_educations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "institution_name" VARCHAR(300) NOT NULL,
    "institution_country" VARCHAR(2),
    "degree" VARCHAR(200),
    "field_of_study" VARCHAR(200),
    "start_year" SMALLINT,
    "end_year" SMALLINT,
    "grade" VARCHAR(50),
    "ai_extracted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_certifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "certification_name" VARCHAR(200) NOT NULL,
    "issuing_body" VARCHAR(200),
    "issued_date" DATE,
    "expiry_date" DATE,
    "license_number" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "country" VARCHAR(2),
    "ai_extracted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "category" VARCHAR(100),
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "proficiency" "SkillProficiency",
    "years_experience" DECIMAL(4,1),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "ai_extracted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "regulator" VARCHAR(100),
    "sector" VARCHAR(100),
    "parent_domain_id" UUID,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_domain_experiences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "years_experience" DECIMAL(4,1),
    "proficiency" "DomainProficiency",
    "notes" TEXT,
    "ai_extracted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_domain_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_versions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "file_storage_key" TEXT NOT NULL,
    "file_name_original" VARCHAR(500) NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "file_size_bytes" INTEGER NOT NULL,
    "uploaded_by_ref_id" UUID NOT NULL,
    "uploaded_on_behalf" BOOLEAN NOT NULL DEFAULT false,
    "parse_status" "ParseStatus" NOT NULL DEFAULT 'pending',
    "parse_completed_at" TIMESTAMPTZ(6),
    "ai_processing_run_id" UUID,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "resume_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "label" VARCHAR(200) NOT NULL,
    "file_storage_key" TEXT NOT NULL,
    "file_name_original" VARCHAR(500) NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "file_size_bytes" INTEGER NOT NULL,
    "uploaded_by_ref_id" UUID NOT NULL,
    "expires_at" DATE,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "candidate_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "tag_type" "TagType" NOT NULL,
    "colour_hex" VARCHAR(7),
    "created_by_ref_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,
    "tagged_by_ref_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_activities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_id" UUID NOT NULL,
    "activity_type" "CandidateActivityType" NOT NULL,
    "description" TEXT,
    "actor_ref_id" UUID NOT NULL,
    "related_entity_type" VARCHAR(50),
    "related_entity_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "legal_name" VARCHAR(300) NOT NULL,
    "display_name" VARCHAR(300),
    "website" VARCHAR(500),
    "industry" VARCHAR(100),
    "size_range" "OrganizationSizeRange",
    "hq_country" VARCHAR(2),
    "hq_city" VARCHAR(100),
    "description" TEXT,
    "logo_url" TEXT,
    "status" "OrganizationStatus" NOT NULL DEFAULT 'active',
    "relationship_type" "RelationshipType",
    "relationship_status" "RelationshipStatus" NOT NULL DEFAULT 'active',
    "relationship_start_date" DATE,
    "account_owner_ref_id" UUID,
    "account_manager_ref_id" UUID,
    "relationship_notes" TEXT,
    "created_by_ref_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "phone_country_code" VARCHAR(5),
    "linkedin" VARCHAR(500),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "created_by_ref_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "client_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commercial_terms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "fee_type" "FeeType" NOT NULL,
    "fee_percentage" DECIMAL(5,2),
    "fee_fixed_amount" DECIMAL(15,4),
    "fee_currency" VARCHAR(3),
    "retainer_amount" DECIMAL(15,4),
    "payment_terms_days" INTEGER,
    "replacement_guarantee_days" INTEGER,
    "notes" TEXT,
    "effective_from" DATE NOT NULL,
    "effective_to" DATE,
    "created_by_ref_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "commercial_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_code" VARCHAR(20) NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "organization_id" UUID,
    "client_contact_id" UUID,
    "description" TEXT NOT NULL,
    "internal_notes" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'draft',
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "employment_type" "JobEmploymentType",
    "seniority_level" "SeniorityLevel",
    "min_years_experience" INTEGER,
    "max_years_experience" INTEGER,
    "salary_min" DECIMAL(15,4),
    "salary_max" DECIMAL(15,4),
    "salary_currency" VARCHAR(3),
    "salary_disclosed" BOOLEAN NOT NULL DEFAULT false,
    "remote_policy" "RemotePolicy",
    "published_at" TIMESTAMPTZ(6),
    "closes_at" DATE,
    "positions_count" SMALLINT NOT NULL DEFAULT 1,
    "positions_filled" SMALLINT NOT NULL DEFAULT 0,
    "priority" "Priority" NOT NULL DEFAULT 'normal',
    "created_by_ref_id" UUID NOT NULL,
    "structured_requirements" JSONB,
    "approved_by_ref_id" UUID,
    "approved_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "proficiency" "SkillProficiency",
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_domains" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "min_years" DECIMAL(4,1),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_locations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "state" VARCHAR(100),
    "city" VARCHAR(100),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_type" "JobQuestionType" NOT NULL,
    "options" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "job_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "recruiter_ref_id" UUID NOT NULL,
    "role" "JobAssignmentRole" NOT NULL,
    "assigned_by_ref_id" UUID NOT NULL,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL,
    "removed_at" TIMESTAMPTZ(6),

    CONSTRAINT "job_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_status_histories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "previous_status" "JobStatus",
    "new_status" "JobStatus" NOT NULL,
    "changed_by_ref_id" UUID NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_status_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_stages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "is_terminal" BOOLEAN NOT NULL DEFAULT false,
    "is_positive_terminal" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "colour_hex" VARCHAR(7),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_stage_transitions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "from_stage_id" UUID NOT NULL,
    "to_stage_id" UUID NOT NULL,
    "required_permission" VARCHAR(100) NOT NULL,
    "requires_reason" BOOLEAN NOT NULL DEFAULT false,
    "requires_interview_record" BOOLEAN NOT NULL DEFAULT false,
    "is_terminal" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_stage_transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "snapshot_id" UUID,
    "current_stage_id" UUID NOT NULL,
    "source" "ApplicationSource" NOT NULL,
    "resume_version_id" UUID,
    "assigned_recruiter_ref_id" UUID,
    "recruiter_notes" TEXT,
    "rejection_reason" "RejectionReason",
    "rejection_detail" TEXT,
    "rejected_by_ref_id" UUID,
    "rejected_at" TIMESTAMPTZ(6),
    "created_by_ref_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_snapshots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "captured_at" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "current_title" VARCHAR(200),
    "current_employer" VARCHAR(200),
    "years_of_experience" INTEGER,
    "current_salary_amount" DECIMAL(15,4),
    "current_salary_currency" VARCHAR(3),
    "notice_period_days" INTEGER,
    "resume_version_id" UUID,
    "profile_data" JSONB NOT NULL,

    CONSTRAINT "application_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_answers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "answer_text" TEXT,
    "answer_boolean" BOOLEAN,
    "answer_selected" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "answer_scale" SMALLINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_stage_histories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "previous_stage_id" UUID,
    "new_stage_id" UUID NOT NULL,
    "changed_by_ref_id" UUID NOT NULL,
    "changed_at" TIMESTAMPTZ(6) NOT NULL,
    "reason" TEXT,
    "notes" TEXT,

    CONSTRAINT "application_stage_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "interview_type" "InterviewType" NOT NULL,
    "round_number" SMALLINT NOT NULL DEFAULT 1,
    "status" "InterviewStatus" NOT NULL DEFAULT 'scheduled',
    "scheduled_at" TIMESTAMPTZ(6),
    "duration_minutes" SMALLINT,
    "location_or_link" TEXT,
    "format" "InterviewFormat",
    "notes" TEXT,
    "outcome" "InterviewOutcome",
    "outcome_notes" TEXT,
    "feedback_overall_rating" SMALLINT,
    "feedback_technical_rating" SMALLINT,
    "feedback_communication_rating" SMALLINT,
    "feedback_culture_fit_rating" SMALLINT,
    "feedback_strengths" TEXT,
    "feedback_concerns" TEXT,
    "feedback_recommendation" "FeedbackRecommendation",
    "feedback_submitted_by_ref_id" UUID,
    "feedback_submitted_at" TIMESTAMPTZ(6),
    "created_by_ref_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_participants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interview_id" UUID NOT NULL,
    "participant_type" "InterviewParticipantType" NOT NULL,
    "identity_ref_id" UUID,
    "client_contact_id" UUID,
    "external_name" VARCHAR(200),
    "external_email" VARCHAR(255),
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interview_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'draft',
    "offered_salary_amount" DECIMAL(15,4),
    "offered_salary_currency" VARCHAR(3),
    "offered_total_comp_amount" DECIMAL(15,4),
    "joining_date" DATE,
    "offer_extended_at" TIMESTAMPTZ(6),
    "offer_expires_at" TIMESTAMPTZ(6),
    "accepted_at" TIMESTAMPTZ(6),
    "declined_at" TIMESTAMPTZ(6),
    "decline_reason" TEXT,
    "notes" TEXT,
    "created_by_ref_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "offer_id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "joining_date" DATE NOT NULL,
    "placed_title" VARCHAR(200),
    "placed_salary_amount" DECIMAL(15,4),
    "placed_salary_currency" VARCHAR(3),
    "placement_credit_ref_id" UUID,
    "secondary_credit_ref_id" UUID,
    "credit_split_pct" DECIMAL(5,2),
    "status" "PlacementStatus" NOT NULL DEFAULT 'active',
    "guarantee_days" INTEGER,
    "guarantee_end_date" DATE,
    "commercial_terms_id" UUID,
    "fee_type" "FeeType",
    "fee_percentage" DECIMAL(5,2),
    "calculated_fee_amount" DECIMAL(15,4),
    "gst_rate" DECIMAL(5,2),
    "gst_amount" DECIMAL(15,4),
    "invoice_amount" DECIMAL(15,4),
    "fee_currency" VARCHAR(3),
    "fee_calculation_basis" TEXT,
    "fee_approved_by_ref_id" UUID,
    "fee_approved_at" TIMESTAMPTZ(6),
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending_invoice',
    "invoice_number" VARCHAR(100),
    "invoice_sent_at" DATE,
    "invoice_due_at" DATE,
    "paid_amount" DECIMAL(15,4) NOT NULL DEFAULT 0,
    "paid_at" DATE,
    "dispute_reason" TEXT,
    "notes" TEXT,
    "created_by_ref_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruitment_notes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entity_type" "JobsEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "NoteVisibility" NOT NULL DEFAULT 'team',
    "author_ref_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "recruitment_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "task_type" "TaskType" NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" TEXT,
    "entity_type" "JobsEntityType",
    "entity_id" UUID,
    "assigned_to_ref_id" UUID NOT NULL,
    "created_by_ref_id" UUID NOT NULL,
    "due_at" TIMESTAMPTZ(6),
    "status" "TaskStatus" NOT NULL DEFAULT 'open',
    "completed_at" TIMESTAMPTZ(6),
    "completed_by_ref_id" UUID,
    "snoozed_until" TIMESTAMPTZ(6),
    "priority" "TaskPriority" NOT NULL DEFAULT 'normal',
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "communication_type" "CommunicationType" NOT NULL,
    "direction" "CommunicationDirection" NOT NULL,
    "entity_type" "CommunicationEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "subject" VARCHAR(500),
    "summary" TEXT,
    "logged_by_ref_id" UUID NOT NULL,
    "occurred_at" TIMESTAMPTZ(6) NOT NULL,
    "duration_minutes" SMALLINT,
    "outcome" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_processing_runs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "run_type" "AIRunType" NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID NOT NULL,
    "model_provider" VARCHAR(100) NOT NULL,
    "model_name" VARCHAR(100) NOT NULL,
    "model_version" VARCHAR(100) NOT NULL,
    "status" "AIProcessingStatus" NOT NULL DEFAULT 'pending',
    "started_at" TIMESTAMPTZ(6),
    "completed_at" TIMESTAMPTZ(6),
    "duration_ms" INTEGER,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "error_detail" TEXT,
    "triggered_by_ref_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_processing_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_extractions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ai_processing_run_id" UUID NOT NULL,
    "resume_version_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "field_path" VARCHAR(200) NOT NULL,
    "extracted_value" JSONB NOT NULL,
    "confidence_score" DECIMAL(4,3),
    "is_applied" BOOLEAN NOT NULL DEFAULT false,
    "applied_at" TIMESTAMPTZ(6),
    "applied_by_ref_id" UUID,
    "candidate_verified" BOOLEAN NOT NULL DEFAULT false,
    "candidate_verified_at" TIMESTAMPTZ(6),
    "recruiter_verified" BOOLEAN NOT NULL DEFAULT false,
    "recruiter_verified_at" TIMESTAMPTZ(6),
    "recruiter_verified_by_ref_id" UUID,
    "superseded_by_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_extractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_scores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ai_processing_run_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "application_id" UUID,
    "overall_score" DECIMAL(5,4) NOT NULL,
    "skill_match_score" DECIMAL(5,4),
    "domain_match_score" DECIMAL(5,4),
    "experience_match_score" DECIMAL(5,4),
    "semantic_similarity_score" DECIMAL(5,4),
    "rank_in_job" INTEGER,
    "explanation_payload" JSONB,
    "model_version" VARCHAR(100) NOT NULL,
    "scored_at" TIMESTAMPTZ(6) NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_embeddings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entity_type" "EmbeddingEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "embedding" vector NOT NULL,
    "model_provider" VARCHAR(100) NOT NULL,
    "model_name" VARCHAR(200) NOT NULL,
    "model_version" VARCHAR(100) NOT NULL,
    "dimension" INTEGER NOT NULL,
    "ai_processing_run_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entity_embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "actor_ref_id" UUID,
    "actor_type" "AuditActorType" NOT NULL,
    "changed_fields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "previous_values" JSONB,
    "new_values" JSONB,
    "context" JSONB,
    "ip_address" INET,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identity_references_external_collection_external_id_key" ON "identity_references"("external_collection", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_jobs_capabilities_identity_ref_id_key" ON "staff_jobs_capabilities"("identity_ref_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_identity_ref_id_key" ON "candidates"("identity_ref_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_candidate_code_key" ON "candidates"("candidate_code");

-- CreateIndex
CREATE INDEX "candidates_status_created_at_idx" ON "candidates"("status", "created_at");

-- CreateIndex
CREATE INDEX "candidates_current_country_current_city_idx" ON "candidates"("current_country", "current_city");

-- CreateIndex
CREATE INDEX "candidates_primary_recruiter_ref_id_idx" ON "candidates"("primary_recruiter_ref_id");

-- CreateIndex
CREATE INDEX "candidates_dedup_status_idx" ON "candidates"("dedup_status");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_contacts_candidate_id_contact_type_value_key" ON "candidate_contacts"("candidate_id", "contact_type", "value");

-- CreateIndex
CREATE INDEX "candidate_consents_candidate_id_consent_type_created_at_idx" ON "candidate_consents"("candidate_id", "consent_type", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_slug_key" ON "skills"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_skills_candidate_id_skill_id_key" ON "candidate_skills"("candidate_id", "skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "domains_name_key" ON "domains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "domains_slug_key" ON "domains"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_domain_experiences_candidate_id_domain_id_key" ON "candidate_domain_experiences"("candidate_id", "domain_id");

-- CreateIndex
CREATE UNIQUE INDEX "resume_versions_candidate_id_version_number_key" ON "resume_versions"("candidate_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_tags_candidate_id_tag_id_key" ON "candidate_tags"("candidate_id", "tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_job_code_key" ON "jobs"("job_code");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "jobs"("slug");

-- CreateIndex
CREATE INDEX "jobs_status_is_public_idx" ON "jobs"("status", "is_public");

-- CreateIndex
CREATE INDEX "jobs_organization_id_status_idx" ON "jobs"("organization_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "job_skills_job_id_skill_id_key" ON "job_skills"("job_id", "skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_domains_job_id_domain_id_key" ON "job_domains"("job_id", "domain_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_stages_name_key" ON "application_stages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "application_stages_slug_key" ON "application_stages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "application_stage_transitions_from_stage_id_to_stage_id_key" ON "application_stage_transitions"("from_stage_id", "to_stage_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_snapshots_application_id_key" ON "application_snapshots"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_answers_application_id_question_id_key" ON "application_answers"("application_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "placements_offer_id_key" ON "placements"("offer_id");

-- CreateIndex
CREATE INDEX "recruitment_notes_entity_type_entity_id_idx" ON "recruitment_notes"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "tasks_entity_type_entity_id_idx" ON "tasks"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "communications_entity_type_entity_id_idx" ON "communications"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "ai_processing_runs_entity_type_entity_id_idx" ON "ai_processing_runs"("entity_type", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "entity_embeddings_entity_type_entity_id_model_name_model_ve_key" ON "entity_embeddings"("entity_type", "entity_id", "model_name", "model_version");

-- CreateIndex
CREATE INDEX "audit_events_entity_type_entity_id_created_at_idx" ON "audit_events"("entity_type", "entity_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_events_actor_ref_id_created_at_idx" ON "audit_events"("actor_ref_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_events_action_created_at_idx" ON "audit_events"("action", "created_at");

-- Partial unique indexes required by the frozen Jobs V1 ERD.
CREATE UNIQUE INDEX "resume_versions_one_current_per_candidate_uidx"
    ON "resume_versions"("candidate_id")
    WHERE "is_current" = true;

CREATE UNIQUE INDEX "job_assignments_active_recruiter_uidx"
    ON "job_assignments"("job_id", "recruiter_ref_id")
    WHERE "removed_at" IS NULL;

CREATE UNIQUE INDEX "applications_active_candidate_job_uidx"
    ON "applications"("job_id", "candidate_id")
    WHERE "deleted_at" IS NULL;

CREATE UNIQUE INDEX "ai_scores_current_candidate_job_uidx"
    ON "ai_scores"("job_id", "candidate_id")
    WHERE "is_current" = true;

-- Search indexes required for V1 structured and fuzzy search.
CREATE INDEX "jobs_structured_requirements_gin_idx"
    ON "jobs" USING GIN ("structured_requirements");

CREATE INDEX "candidates_first_name_trgm_idx"
    ON "candidates" USING GIN ("first_name" gin_trgm_ops);

CREATE INDEX "candidates_last_name_trgm_idx"
    ON "candidates" USING GIN ("last_name" gin_trgm_ops);

CREATE INDEX "candidates_current_title_trgm_idx"
    ON "candidates" USING GIN ("current_title" gin_trgm_ops);

CREATE INDEX "candidates_current_employer_trgm_idx"
    ON "candidates" USING GIN ("current_employer" gin_trgm_ops);

CREATE INDEX "jobs_title_trgm_idx"
    ON "jobs" USING GIN ("title" gin_trgm_ops);

CREATE INDEX "candidates_pref_job_types_gin_idx"
    ON "candidates" USING GIN ("pref_job_types");

CREATE INDEX "candidates_pref_countries_gin_idx"
    ON "candidates" USING GIN ("pref_countries");

CREATE INDEX "candidates_pref_cities_gin_idx"
    ON "candidates" USING GIN ("pref_cities");

CREATE INDEX "candidates_target_industries_gin_idx"
    ON "candidates" USING GIN ("target_industries");

CREATE INDEX "candidates_target_seniority_gin_idx"
    ON "candidates" USING GIN ("target_seniority");

CREATE INDEX "skills_aliases_gin_idx"
    ON "skills" USING GIN ("aliases");

-- CHECK constraints for frozen numeric/range invariants.
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_profile_completeness_range_chk"
    CHECK ("profile_completeness_pct" >= 0 AND "profile_completeness_pct" <= 100);
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_years_of_experience_nonnegative_chk"
    CHECK ("years_of_experience" IS NULL OR "years_of_experience" >= 0);
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_current_salary_nonnegative_chk"
    CHECK ("current_salary_amount" IS NULL OR "current_salary_amount" >= 0);
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_current_total_comp_nonnegative_chk"
    CHECK ("current_total_comp_amount" IS NULL OR "current_total_comp_amount" >= 0);
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_notice_period_nonnegative_chk"
    CHECK ("notice_period_days" IS NULL OR "notice_period_days" >= 0);
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_internal_rating_range_chk"
    CHECK ("internal_rating" IS NULL OR ("internal_rating" >= 1 AND "internal_rating" <= 5));
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_expected_salary_nonnegative_chk"
    CHECK (
        ("expected_salary_min" IS NULL OR "expected_salary_min" >= 0)
        AND ("expected_salary_max" IS NULL OR "expected_salary_max" >= 0)
    );
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_expected_salary_range_chk"
    CHECK ("expected_salary_min" IS NULL OR "expected_salary_max" IS NULL OR "expected_salary_min" <= "expected_salary_max");

ALTER TABLE "candidate_employments" ADD CONSTRAINT "candidate_employments_salary_nonnegative_chk"
    CHECK ("salary_amount" IS NULL OR "salary_amount" >= 0);
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_years_experience_nonnegative_chk"
    CHECK ("years_experience" IS NULL OR "years_experience" >= 0);
ALTER TABLE "candidate_domain_experiences" ADD CONSTRAINT "candidate_domain_years_experience_nonnegative_chk"
    CHECK ("years_experience" IS NULL OR "years_experience" >= 0);
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_version_number_positive_chk"
    CHECK ("version_number" >= 1);
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_file_size_nonnegative_chk"
    CHECK ("file_size_bytes" >= 0);
ALTER TABLE "candidate_documents" ADD CONSTRAINT "candidate_documents_file_size_nonnegative_chk"
    CHECK ("file_size_bytes" >= 0);

ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_fee_percentage_range_chk"
    CHECK ("fee_percentage" IS NULL OR ("fee_percentage" >= 0 AND "fee_percentage" <= 100));
ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_amounts_nonnegative_chk"
    CHECK (
        ("fee_fixed_amount" IS NULL OR "fee_fixed_amount" >= 0)
        AND ("retainer_amount" IS NULL OR "retainer_amount" >= 0)
    );
ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_days_nonnegative_chk"
    CHECK (
        ("payment_terms_days" IS NULL OR "payment_terms_days" >= 0)
        AND ("replacement_guarantee_days" IS NULL OR "replacement_guarantee_days" >= 0)
    );
ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_effective_date_range_chk"
    CHECK ("effective_to" IS NULL OR "effective_to" >= "effective_from");

ALTER TABLE "jobs" ADD CONSTRAINT "jobs_experience_nonnegative_chk"
    CHECK (
        ("min_years_experience" IS NULL OR "min_years_experience" >= 0)
        AND ("max_years_experience" IS NULL OR "max_years_experience" >= 0)
    );
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_experience_range_chk"
    CHECK ("min_years_experience" IS NULL OR "max_years_experience" IS NULL OR "min_years_experience" <= "max_years_experience");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_salary_nonnegative_chk"
    CHECK (
        ("salary_min" IS NULL OR "salary_min" >= 0)
        AND ("salary_max" IS NULL OR "salary_max" >= 0)
    );
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_salary_range_chk"
    CHECK ("salary_min" IS NULL OR "salary_max" IS NULL OR "salary_min" <= "salary_max");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_positions_count_positive_chk"
    CHECK ("positions_count" >= 1);
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_positions_filled_range_chk"
    CHECK ("positions_filled" >= 0 AND "positions_filled" <= "positions_count");

ALTER TABLE "job_domains" ADD CONSTRAINT "job_domains_min_years_nonnegative_chk"
    CHECK ("min_years" IS NULL OR "min_years" >= 0);
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_round_number_positive_chk"
    CHECK ("round_number" >= 1);
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_duration_nonnegative_chk"
    CHECK ("duration_minutes" IS NULL OR "duration_minutes" >= 0);
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_feedback_ratings_range_chk"
    CHECK (
        ("feedback_overall_rating" IS NULL OR ("feedback_overall_rating" >= 1 AND "feedback_overall_rating" <= 5))
        AND ("feedback_technical_rating" IS NULL OR ("feedback_technical_rating" >= 1 AND "feedback_technical_rating" <= 5))
        AND ("feedback_communication_rating" IS NULL OR ("feedback_communication_rating" >= 1 AND "feedback_communication_rating" <= 5))
        AND ("feedback_culture_fit_rating" IS NULL OR ("feedback_culture_fit_rating" >= 1 AND "feedback_culture_fit_rating" <= 5))
    );

ALTER TABLE "placements" ADD CONSTRAINT "placements_salary_nonnegative_chk"
    CHECK ("placed_salary_amount" IS NULL OR "placed_salary_amount" >= 0);
ALTER TABLE "placements" ADD CONSTRAINT "placements_credit_split_range_chk"
    CHECK ("credit_split_pct" IS NULL OR ("credit_split_pct" >= 0 AND "credit_split_pct" <= 100));
ALTER TABLE "placements" ADD CONSTRAINT "placements_guarantee_days_nonnegative_chk"
    CHECK ("guarantee_days" IS NULL OR "guarantee_days" >= 0);
ALTER TABLE "placements" ADD CONSTRAINT "placements_percentage_rates_range_chk"
    CHECK (
        ("fee_percentage" IS NULL OR ("fee_percentage" >= 0 AND "fee_percentage" <= 100))
        AND ("gst_rate" IS NULL OR ("gst_rate" >= 0 AND "gst_rate" <= 100))
    );
ALTER TABLE "placements" ADD CONSTRAINT "placements_amounts_nonnegative_chk"
    CHECK (
        ("calculated_fee_amount" IS NULL OR "calculated_fee_amount" >= 0)
        AND ("gst_amount" IS NULL OR "gst_amount" >= 0)
        AND ("invoice_amount" IS NULL OR "invoice_amount" >= 0)
        AND "paid_amount" >= 0
    );

ALTER TABLE "communications" ADD CONSTRAINT "communications_duration_nonnegative_chk"
    CHECK ("duration_minutes" IS NULL OR "duration_minutes" >= 0);

ALTER TABLE "ai_processing_runs" ADD CONSTRAINT "ai_processing_runs_usage_nonnegative_chk"
    CHECK (
        ("duration_ms" IS NULL OR "duration_ms" >= 0)
        AND ("input_tokens" IS NULL OR "input_tokens" >= 0)
        AND ("output_tokens" IS NULL OR "output_tokens" >= 0)
    );
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_confidence_range_chk"
    CHECK ("confidence_score" IS NULL OR ("confidence_score" >= 0 AND "confidence_score" <= 1));
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_score_range_chk"
    CHECK (
        "overall_score" >= 0 AND "overall_score" <= 1
        AND ("skill_match_score" IS NULL OR ("skill_match_score" >= 0 AND "skill_match_score" <= 1))
        AND ("domain_match_score" IS NULL OR ("domain_match_score" >= 0 AND "domain_match_score" <= 1))
        AND ("experience_match_score" IS NULL OR ("experience_match_score" >= 0 AND "experience_match_score" <= 1))
        AND ("semantic_similarity_score" IS NULL OR ("semantic_similarity_score" >= 0 AND "semantic_similarity_score" <= 1))
    );
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_rank_positive_chk"
    CHECK ("rank_in_job" IS NULL OR "rank_in_job" >= 1);
ALTER TABLE "entity_embeddings" ADD CONSTRAINT "entity_embeddings_dimension_positive_chk"
    CHECK ("dimension" > 0);

-- HNSW on entity_embeddings.embedding is intentionally deferred until the
-- embedding model/dimension is selected; the column does not hard-code a dimension.

-- AddForeignKey
ALTER TABLE "staff_jobs_capabilities" ADD CONSTRAINT "staff_jobs_capabilities_identity_ref_id_fkey" FOREIGN KEY ("identity_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_jobs_capabilities" ADD CONSTRAINT "staff_jobs_capabilities_granted_by_ref_id_fkey" FOREIGN KEY ("granted_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_identity_ref_id_fkey" FOREIGN KEY ("identity_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_current_resume_version_id_fkey" FOREIGN KEY ("current_resume_version_id") REFERENCES "resume_versions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_primary_recruiter_ref_id_fkey" FOREIGN KEY ("primary_recruiter_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_assigned_recruiter_ref_id_fkey" FOREIGN KEY ("assigned_recruiter_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_last_contacted_by_ref_id_fkey" FOREIGN KEY ("last_contacted_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_active_process_owner_ref_id_fkey" FOREIGN KEY ("active_process_owner_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_placement_credit_ref_id_fkey" FOREIGN KEY ("placement_credit_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_is_duplicate_of_id_fkey" FOREIGN KEY ("is_duplicate_of_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_deleted_by_ref_id_fkey" FOREIGN KEY ("deleted_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_contacts" ADD CONSTRAINT "candidate_contacts_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_consents" ADD CONSTRAINT "candidate_consents_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_employments" ADD CONSTRAINT "candidate_employments_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_certifications" ADD CONSTRAINT "candidate_certifications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domains" ADD CONSTRAINT "domains_parent_domain_id_fkey" FOREIGN KEY ("parent_domain_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_domain_experiences" ADD CONSTRAINT "candidate_domain_experiences_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_domain_experiences" ADD CONSTRAINT "candidate_domain_experiences_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_uploaded_by_ref_id_fkey" FOREIGN KEY ("uploaded_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_ai_processing_run_id_fkey" FOREIGN KEY ("ai_processing_run_id") REFERENCES "ai_processing_runs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_documents" ADD CONSTRAINT "candidate_documents_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_documents" ADD CONSTRAINT "candidate_documents_uploaded_by_ref_id_fkey" FOREIGN KEY ("uploaded_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_tags" ADD CONSTRAINT "candidate_tags_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_tags" ADD CONSTRAINT "candidate_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_tags" ADD CONSTRAINT "candidate_tags_tagged_by_ref_id_fkey" FOREIGN KEY ("tagged_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_activities" ADD CONSTRAINT "candidate_activities_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_activities" ADD CONSTRAINT "candidate_activities_actor_ref_id_fkey" FOREIGN KEY ("actor_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_account_owner_ref_id_fkey" FOREIGN KEY ("account_owner_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_account_manager_ref_id_fkey" FOREIGN KEY ("account_manager_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contacts" ADD CONSTRAINT "client_contacts_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contacts" ADD CONSTRAINT "client_contacts_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commercial_terms" ADD CONSTRAINT "commercial_terms_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_client_contact_id_fkey" FOREIGN KEY ("client_contact_id") REFERENCES "client_contacts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_approved_by_ref_id_fkey" FOREIGN KEY ("approved_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_domains" ADD CONSTRAINT "job_domains_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_domains" ADD CONSTRAINT "job_domains_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_locations" ADD CONSTRAINT "job_locations_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_questions" ADD CONSTRAINT "job_questions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_assignments" ADD CONSTRAINT "job_assignments_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_assignments" ADD CONSTRAINT "job_assignments_recruiter_ref_id_fkey" FOREIGN KEY ("recruiter_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_assignments" ADD CONSTRAINT "job_assignments_assigned_by_ref_id_fkey" FOREIGN KEY ("assigned_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_status_histories" ADD CONSTRAINT "job_status_histories_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_status_histories" ADD CONSTRAINT "job_status_histories_changed_by_ref_id_fkey" FOREIGN KEY ("changed_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_transitions" ADD CONSTRAINT "application_stage_transitions_from_stage_id_fkey" FOREIGN KEY ("from_stage_id") REFERENCES "application_stages"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_transitions" ADD CONSTRAINT "application_stage_transitions_to_stage_id_fkey" FOREIGN KEY ("to_stage_id") REFERENCES "application_stages"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_snapshot_id_fkey" FOREIGN KEY ("snapshot_id") REFERENCES "application_snapshots"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_current_stage_id_fkey" FOREIGN KEY ("current_stage_id") REFERENCES "application_stages"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_resume_version_id_fkey" FOREIGN KEY ("resume_version_id") REFERENCES "resume_versions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_assigned_recruiter_ref_id_fkey" FOREIGN KEY ("assigned_recruiter_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_rejected_by_ref_id_fkey" FOREIGN KEY ("rejected_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_snapshots" ADD CONSTRAINT "application_snapshots_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_answers" ADD CONSTRAINT "application_answers_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_answers" ADD CONSTRAINT "application_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "job_questions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_histories" ADD CONSTRAINT "application_stage_histories_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_histories" ADD CONSTRAINT "application_stage_histories_previous_stage_id_fkey" FOREIGN KEY ("previous_stage_id") REFERENCES "application_stages"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_histories" ADD CONSTRAINT "application_stage_histories_new_stage_id_fkey" FOREIGN KEY ("new_stage_id") REFERENCES "application_stages"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_stage_histories" ADD CONSTRAINT "application_stage_histories_changed_by_ref_id_fkey" FOREIGN KEY ("changed_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_feedback_submitted_by_ref_id_fkey" FOREIGN KEY ("feedback_submitted_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_participants" ADD CONSTRAINT "interview_participants_interview_id_fkey" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_participants" ADD CONSTRAINT "interview_participants_identity_ref_id_fkey" FOREIGN KEY ("identity_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_participants" ADD CONSTRAINT "interview_participants_client_contact_id_fkey" FOREIGN KEY ("client_contact_id") REFERENCES "client_contacts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_placement_credit_ref_id_fkey" FOREIGN KEY ("placement_credit_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_secondary_credit_ref_id_fkey" FOREIGN KEY ("secondary_credit_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_commercial_terms_id_fkey" FOREIGN KEY ("commercial_terms_id") REFERENCES "commercial_terms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_fee_approved_by_ref_id_fkey" FOREIGN KEY ("fee_approved_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_notes" ADD CONSTRAINT "recruitment_notes_author_ref_id_fkey" FOREIGN KEY ("author_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_ref_id_fkey" FOREIGN KEY ("assigned_to_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_ref_id_fkey" FOREIGN KEY ("created_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_completed_by_ref_id_fkey" FOREIGN KEY ("completed_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communications" ADD CONSTRAINT "communications_logged_by_ref_id_fkey" FOREIGN KEY ("logged_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_processing_runs" ADD CONSTRAINT "ai_processing_runs_triggered_by_ref_id_fkey" FOREIGN KEY ("triggered_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_ai_processing_run_id_fkey" FOREIGN KEY ("ai_processing_run_id") REFERENCES "ai_processing_runs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_resume_version_id_fkey" FOREIGN KEY ("resume_version_id") REFERENCES "resume_versions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_applied_by_ref_id_fkey" FOREIGN KEY ("applied_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_recruiter_verified_by_ref_id_fkey" FOREIGN KEY ("recruiter_verified_by_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_superseded_by_id_fkey" FOREIGN KEY ("superseded_by_id") REFERENCES "ai_extractions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_ai_processing_run_id_fkey" FOREIGN KEY ("ai_processing_run_id") REFERENCES "ai_processing_runs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_scores" ADD CONSTRAINT "ai_scores_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entity_embeddings" ADD CONSTRAINT "entity_embeddings_ai_processing_run_id_fkey" FOREIGN KEY ("ai_processing_run_id") REFERENCES "ai_processing_runs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_ref_id_fkey" FOREIGN KEY ("actor_ref_id") REFERENCES "identity_references"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
