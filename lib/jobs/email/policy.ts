import { normalizeEmail } from "./config";
import type {
  JobsEmailConfig,
  JobsEmailMessage,
  JobsEmailSafetyDecision,
} from "./types";

const STAGING_SUBJECT_PREFIX = "[Estabizz Jobs Staging]";

export function applyJobsEmailSafetyPolicy(
  message: JobsEmailMessage,
  config: JobsEmailConfig,
): JobsEmailSafetyDecision {
  const normalizedRecipient = normalizeEmail(message.to.email);

  if (!normalizedRecipient) {
    return {
      allowed: false,
      message,
      blockedReason: "Recipient email address is invalid.",
    };
  }

  if (config.environment === "production") {
    if (!config.productionDeliveryEnabled) {
      return {
        allowed: false,
        message,
        blockedReason: "Production Jobs email delivery is disabled.",
      };
    }

    return {
      allowed: true,
      message: normalizeMessageRecipient(message, normalizedRecipient),
    };
  }

  if (config.stagingAllowlist.includes(normalizedRecipient)) {
    return {
      allowed: true,
      message: withStagingSubject(normalizeMessageRecipient(message, normalizedRecipient)),
    };
  }

  if (config.stagingMode === "redirect" && config.stagingRedirectTo) {
    const redirectRecipient = normalizeEmail(config.stagingRedirectTo);

    if (redirectRecipient && config.stagingAllowlist.includes(redirectRecipient)) {
      return {
        allowed: true,
        message: withStagingSubject({
          ...message,
          to: {
            email: redirectRecipient,
            name: "Estabizz Jobs Staging",
          },
          metadata: {
            ...message.metadata,
            staging_original_recipient: normalizedRecipient,
            staging_redirected: "true",
          },
        }),
      };
    }
  }

  return {
    allowed: false,
    message,
    blockedReason: "Recipient is not in the Jobs staging email allowlist.",
  };
}

function normalizeMessageRecipient(
  message: JobsEmailMessage,
  normalizedRecipient: string,
): JobsEmailMessage {
  return {
    ...message,
    to: {
      ...message.to,
      email: normalizedRecipient,
    },
  };
}

function withStagingSubject(message: JobsEmailMessage): JobsEmailMessage {
  if (message.subject.startsWith(STAGING_SUBJECT_PREFIX)) {
    return message;
  }

  return {
    ...message,
    subject: `${STAGING_SUBJECT_PREFIX} ${message.subject}`,
  };
}
