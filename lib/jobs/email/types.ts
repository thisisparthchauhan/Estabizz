export const JOBS_EMAIL_EVENT_TYPES = [
  "CANDIDATE_EMAIL_VERIFICATION",
  "APPLICATION_RECEIVED",
  "APPLICATION_STATUS_UPDATED",
  "INTERVIEW_INVITATION",
  "INTERVIEW_REMINDER",
  "JOB_ALERT",
  "RECRUITER_NOTIFICATION",
  "STAGING_SMOKE_TEST",
] as const;

export type JobsEmailEventType = (typeof JOBS_EMAIL_EVENT_TYPES)[number];

export type JobsEmailProvider = "resend";

export type JobsEmailEnvironment = "development" | "staging" | "production";

export type JobsEmailStagingMode = "reject" | "redirect";

export type JobsEmailDeliveryStatus = "sent" | "blocked" | "failed";

export interface JobsEmailConfig {
  configured: boolean;
  provider: JobsEmailProvider | null;
  environment: JobsEmailEnvironment;
  from: string;
  replyTo?: string;
  stagingAllowlist: string[];
  stagingMode: JobsEmailStagingMode;
  stagingRedirectTo?: string;
  productionDeliveryEnabled: boolean;
  resendApiKey: string;
}

export interface JobsEmailConfigValidationResult {
  ok: boolean;
  errors: string[];
}

export interface JobsEmailRecipient {
  email: string;
  name?: string;
}

export interface JobsEmailMessage {
  eventType: JobsEmailEventType;
  to: JobsEmailRecipient;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  metadata?: Record<string, string>;
}

export interface JobsEmailSendResult {
  status: JobsEmailDeliveryStatus;
  provider: JobsEmailProvider | null;
  providerMessageId?: string;
  deliveredTo?: string;
  blockedReason?: string;
  errorMessage?: string;
}

export interface EmailService {
  sendEmail(_message: JobsEmailMessage): Promise<JobsEmailSendResult>;
}

export interface JobsEmailSafetyDecision {
  allowed: boolean;
  message: JobsEmailMessage;
  blockedReason?: string;
}

export interface JobsEmailTemplate {
  subject: string;
  html: string;
  text: string;
}
