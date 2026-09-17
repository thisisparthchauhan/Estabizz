import { config as loadEnv } from "dotenv";

import {
  createJobsEmailService,
  getJobsEmailConfig,
  normalizeEmail,
  renderJobsEmailSmokeTestTemplate,
  validateJobsEmailConfig,
} from "../lib/jobs/email";

loadEnv({ path: ".env.local", quiet: true });

async function main() {
  const config = getJobsEmailConfig();
  const requestedRecipient = normalizeEmail(process.env.JOBS_EMAIL_SMOKE_TEST_TO);
  const validation = validateJobsEmailConfig(config);

  if (config.environment === "production") {
    throw new Error("Jobs email smoke test refused to run because APP_ENV is production.");
  }

  if (!requestedRecipient) {
    throw new Error("JOBS_EMAIL_SMOKE_TEST_TO must be configured locally for the smoke test.");
  }

  if (!config.stagingAllowlist.includes(requestedRecipient)) {
    throw new Error("Smoke-test recipient is not in JOBS_EMAIL_STAGING_ALLOWLIST.");
  }

  if (!validation.ok) {
    throw new Error(`Jobs email smoke test refused to run: ${validation.errors.join(" ")}`);
  }

  const template = renderJobsEmailSmokeTestTemplate();
  const emailService = createJobsEmailService(config);
  const result = await emailService.sendEmail({
    eventType: "STAGING_SMOKE_TEST",
    to: {
      email: requestedRecipient,
      name: "Estabizz Jobs Test",
    },
    subject: template.subject,
    html: template.html,
    text: template.text,
    metadata: {
      smoke_test: "true",
    },
  });

  console.log(
    JSON.stringify(
      {
        environment: config.environment,
        recipientAllowlisted: true,
        sent: result.status === "sent",
        status: result.status,
        provider: result.provider,
        providerMessageIdPresent: Boolean(result.providerMessageId),
        blocked: result.status === "blocked",
        failed: result.status === "failed",
      },
      null,
      2,
    ),
  );

  if (result.status !== "sent") {
    throw new Error("Jobs email smoke test did not send successfully.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Jobs email smoke test failed.");
  process.exit(1);
});
