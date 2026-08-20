import { Resend } from "resend";

import {
  getJobsEmailConfig,
  validateJobsEmailConfig,
} from "./config";
import { applyJobsEmailSafetyPolicy } from "./policy";
import type {
  EmailService,
  JobsEmailConfig,
  JobsEmailMessage,
  JobsEmailSendResult,
} from "./types";

export class ResendJobsEmailService implements EmailService {
  private readonly client: Resend;

  constructor(private readonly config: JobsEmailConfig = getJobsEmailConfig()) {
    const validation = validateJobsEmailConfig(config);

    if (!validation.ok || !config.configured || config.provider !== "resend") {
      throw new Error(`Jobs email is not configured: ${validation.errors.join(" ")}`);
    }

    this.client = new Resend(config.resendApiKey);
  }

  async sendEmail(message: JobsEmailMessage): Promise<JobsEmailSendResult> {
    const safetyDecision = applyJobsEmailSafetyPolicy(message, this.config);

    if (!safetyDecision.allowed) {
      return {
        status: "blocked",
        provider: this.config.provider,
        blockedReason: safetyDecision.blockedReason,
      };
    }

    try {
      const safeMessage = safetyDecision.message;
      const response = await this.client.emails.send({
        from: this.config.from,
        to: formatRecipient(safeMessage.to),
        subject: safeMessage.subject,
        html: safeMessage.html,
        text: safeMessage.text,
        replyTo: safeMessage.replyTo || this.config.replyTo,
        headers: {
          "X-Estabizz-Jobs-Event": safeMessage.eventType,
        },
        tags: [
          {
            name: "jobs_event",
            value: safeMessage.eventType.toLowerCase(),
          },
        ],
      });

      if (response.error) {
        return {
          status: "failed",
          provider: this.config.provider,
          deliveredTo: safeMessage.to.email,
          errorMessage: response.error.message,
        };
      }

      return {
        status: "sent",
        provider: this.config.provider,
        providerMessageId: response.data?.id,
        deliveredTo: safeMessage.to.email,
      };
    } catch (error) {
      return {
        status: "failed",
        provider: this.config.provider,
        errorMessage: error instanceof Error ? error.message : "Jobs email delivery failed.",
      };
    }
  }
}

export function createJobsEmailService(
  config: JobsEmailConfig = getJobsEmailConfig(),
): EmailService {
  return new ResendJobsEmailService(config);
}

function formatRecipient(recipient: JobsEmailMessage["to"]): string {
  if (!recipient.name) {
    return recipient.email;
  }

  return `${recipient.name} <${recipient.email}>`;
}
