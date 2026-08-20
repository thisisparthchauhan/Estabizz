import type {
  JobsEmailConfig,
  JobsEmailConfigValidationResult,
  JobsEmailEnvironment,
  JobsEmailProvider,
  JobsEmailStagingMode,
} from "./types";

export function getJobsEmailConfig(env: NodeJS.ProcessEnv = process.env): JobsEmailConfig {
  const provider = parseProvider(env.JOBS_EMAIL_PROVIDER);
  const environment = parseEnvironment(env.APP_ENV || env.NEXT_PUBLIC_APP_ENV);
  const stagingAllowlist = parseEmailList(env.JOBS_EMAIL_STAGING_ALLOWLIST);
  const stagingRedirectTo = normalizeEmail(env.JOBS_EMAIL_STAGING_REDIRECT_TO);

  return {
    configured: Boolean(provider && env.JOBS_EMAIL_FROM && env.RESEND_API_KEY),
    provider,
    environment,
    from: env.JOBS_EMAIL_FROM || "",
    replyTo: normalizeEmail(env.JOBS_EMAIL_REPLY_TO),
    stagingAllowlist,
    stagingMode: parseStagingMode(env.JOBS_EMAIL_STAGING_MODE),
    stagingRedirectTo,
    productionDeliveryEnabled: env.JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED === "true",
    resendApiKey: env.RESEND_API_KEY || "",
  };
}

export function validateJobsEmailConfig(
  config: JobsEmailConfig,
): JobsEmailConfigValidationResult {
  const errors: string[] = [];

  if (config.provider !== "resend") {
    errors.push("JOBS_EMAIL_PROVIDER must be resend.");
  }

  if (!config.from) {
    errors.push("JOBS_EMAIL_FROM is required.");
  }

  if (!config.resendApiKey) {
    errors.push("RESEND_API_KEY is required for real email delivery.");
  }

  if (config.environment !== "production" && config.stagingAllowlist.length === 0) {
    errors.push("JOBS_EMAIL_STAGING_ALLOWLIST must contain at least one recipient.");
  }

  if (
    config.environment !== "production" &&
    config.stagingMode === "redirect" &&
    (!config.stagingRedirectTo || !config.stagingAllowlist.includes(config.stagingRedirectTo))
  ) {
    errors.push("JOBS_EMAIL_STAGING_REDIRECT_TO must be present in the staging allowlist.");
  }

  if (config.environment === "production" && !config.productionDeliveryEnabled) {
    errors.push("Production Jobs email delivery is disabled until explicitly enabled.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function parseEmailList(value: string | undefined): string[] {
  return Array.from(
    new Set(
      (value || "")
        .split(",")
        .map((email) => normalizeEmail(email))
        .filter((email): email is string => Boolean(email)),
    ),
  );
}

export function normalizeEmail(value: string | undefined): string | undefined {
  const email = value?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return undefined;
  }

  return email;
}

function parseProvider(value: string | undefined): JobsEmailProvider | null {
  return value === "resend" ? value : null;
}

function parseEnvironment(value: string | undefined): JobsEmailEnvironment {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

function parseStagingMode(value: string | undefined): JobsEmailStagingMode {
  return value === "redirect" ? "redirect" : "reject";
}
