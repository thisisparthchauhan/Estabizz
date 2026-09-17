/**
 * Structural file validation for candidate resumes.
 *
 * THIS IS NOT MALWARE SCANNING. Nothing here inspects a file for malicious
 * behaviour, and no antivirus engine is involved. It verifies that the bytes
 * actually are the document type the upload claimed, and rejects payloads that
 * are obviously something else. Never describe its result as "scanned",
 * "virus checked" or "safe" in code, logs, docs or UI copy.
 */

export type ResumeFileSecurityStatus =
  | "passed"
  | "rejected_empty"
  | "rejected_size"
  | "rejected_unsupported_type"
  | "rejected_signature_mismatch"
  | "rejected_structure_invalid"
  | "rejected_blocked_format"
  | "unavailable";

export interface ResumeFileSecurityResult {
  status: ResumeFileSecurityStatus;
  /** True only for `passed`. Structural validation only — see the file header. */
  ok: boolean;
  /** Stable machine-readable detail. Never contains document content. */
  detail: string;
  /** Safe to show a candidate. Never leaks storage keys or internals. */
  candidateMessage: string;
}

export const RESUME_FILE_SECURITY_CANDIDATE_MESSAGES: Record<
  ResumeFileSecurityStatus,
  string
> = {
  passed: "Your resume looks valid.",
  rejected_empty: "That file is empty. Please choose a PDF or DOCX resume with content.",
  rejected_size: "That file is larger than the allowed limit. Please upload a smaller resume.",
  rejected_unsupported_type: "Only PDF and DOCX resumes are supported.",
  rejected_signature_mismatch:
    "That file does not look like a real PDF or DOCX. Please re-save your resume and try again.",
  rejected_structure_invalid:
    "That file could not be read as a valid Word document. Please re-save it as PDF or DOCX and try again.",
  rejected_blocked_format:
    "That file type is not allowed. Please upload a PDF or DOCX resume.",
  unavailable: "We could not read your uploaded file. Please try uploading it again.",
};

export function buildResumeFileSecurityResult(
  status: ResumeFileSecurityStatus,
  detail: string,
): ResumeFileSecurityResult {
  return {
    status,
    ok: status === "passed",
    detail,
    candidateMessage: RESUME_FILE_SECURITY_CANDIDATE_MESSAGES[status],
  };
}

/** Reads `length` bytes starting at `start`. Returns fewer bytes only at EOF. */
export type ByteRangeReader = (start: number, length: number) => Promise<Uint8Array>;
