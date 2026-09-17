/**
 * Candidate-facing resume processing status.
 *
 * Everything in this module is safe to hand to a browser. It must never carry a
 * storage key, presigned URL, queue identifier, AI service URL, provider error
 * text, or any extracted resume content.
 */

export const RESUME_PROCESSING_STATUSES = [
  "none",
  "pending",
  "processing",
  "needs_review",
  "completed",
  "failed",
  "ocr_required",
] as const;

export type ResumeProcessingStatus = (typeof RESUME_PROCESSING_STATUSES)[number];

export interface CandidateResumeStatusResponse {
  status: ResumeProcessingStatus;
  /** True while the client should keep polling. */
  inProgress: boolean;
  needsReviewCount: number;
  resume: {
    hasResume: boolean;
    fileName: string | null;
    fileType: string | null;
    fileSizeBytes: number | null;
    uploadedAt: string | null;
  };
  message: string;
}

export const RESUME_STATUS_MESSAGES: Record<ResumeProcessingStatus, string> = {
  none: "No resume uploaded yet.",
  pending: "Your resume is queued for processing.",
  processing: "We are reading your resume.",
  needs_review: "Your resume was processed. Review the suggested details.",
  completed: "Your resume has been processed.",
  failed: "We could not process your resume. Please try uploading it again.",
  ocr_required:
    "Your resume looks like a scanned image, so we could not read any text. Please upload a text-based PDF or a DOCX file.",
};

export function isResumeProcessingInProgress(status: ResumeProcessingStatus): boolean {
  return status === "pending" || status === "processing";
}
