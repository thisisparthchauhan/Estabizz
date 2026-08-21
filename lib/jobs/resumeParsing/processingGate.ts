import "server-only";

import type { PrivateObjectMetadata } from "@/lib/jobs/documentStorage/types";

export type ResumeProcessingEligibility =
  | "eligible"
  | "awaiting_scan"
  | "infected"
  | "scan_failed";

export interface ResumeProcessingGateResult {
  eligible: boolean;
  eligibility: ResumeProcessingEligibility;
  retryable: boolean;
  reason: string;
}

export function checkResumeProcessingGate(
  metadata: PrivateObjectMetadata,
  config: { malwareScanningRequired: boolean },
): ResumeProcessingGateResult {
  if (!config.malwareScanningRequired) {
    if (metadata.malwareScanStatus === "infected") {
      return {
        eligible: false,
        eligibility: "infected",
        retryable: false,
        reason: "Resume document was flagged as infected.",
      };
    }

    return { eligible: true, eligibility: "eligible", retryable: false, reason: "" };
  }

  switch (metadata.malwareScanStatus) {
    case "clean":
    case "skipped":
      return { eligible: true, eligibility: "eligible", retryable: false, reason: "" };
    case "pending":
      return {
        eligible: false,
        eligibility: "awaiting_scan",
        retryable: true,
        reason: "Resume document is awaiting security scan.",
      };
    case "infected":
      return {
        eligible: false,
        eligibility: "infected",
        retryable: false,
        reason: "Resume document was flagged as infected.",
      };
    case "failed":
      return {
        eligible: false,
        eligibility: "scan_failed",
        retryable: false,
        reason: "Resume document security scan failed.",
      };
    default:
      return {
        eligible: false,
        eligibility: "awaiting_scan",
        retryable: true,
        reason: "Resume document security scan status is unknown.",
      };
  }
}
