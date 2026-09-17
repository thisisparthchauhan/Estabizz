import "server-only";

import type { PrivateObjectMetadata } from "@/lib/jobs/documentStorage/types";

export type ResumeProcessingEligibility =
  | "eligible"
  | "not_scanned"
  | "awaiting_scan"
  | "infected"
  | "scan_failed";

export interface ResumeProcessingGateResult {
  eligible: boolean;
  eligibility: ResumeProcessingEligibility;
  retryable: boolean;
  reason: string;
}

/**
 * Malware-scan eligibility.
 *
 * No malware scanner exists in this system. Uploads are stamped `not_scanned`,
 * which is a statement of fact, not a pass. Deployments therefore face an
 * explicit choice:
 *
 *   malwareScanningRequired=true   nothing processes until a scanner exists
 *   malwareScanningRequired=false  the operator has knowingly accepted
 *                                  processing unscanned files
 *
 * Structural validation (lib/jobs/fileSecurity) runs independently of this gate
 * and is not a substitute for it.
 */
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
    case "not_scanned":
      return {
        eligible: false,
        eligibility: "not_scanned",
        // No scanner exists, so retrying will never change this. Blocking
        // permanently is the honest outcome of requiring a scan we cannot do.
        retryable: false,
        reason:
          "Malware scanning is required but no scanner is configured, so this resume cannot be processed.",
      };
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
