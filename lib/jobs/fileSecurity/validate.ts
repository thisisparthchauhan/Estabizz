/**
 * Resume file-security gate. See ./types.ts — structural validation only, NOT
 * malware scanning.
 *
 * Two entry points share one implementation:
 *
 *   validateResumeFileBytes   whole buffer already in memory (worker)
 *   validateResumeFileRanges  byte-range reads (confirm, before any DB write)
 *
 * Both run, deliberately. The confirm-time check rejects junk before a
 * ResumeVersion row exists. The worker-time check runs against the exact bytes
 * about to be handed to the AI service, which closes the window where a still
 * valid presigned PUT could replace a validated object with different bytes of
 * the same declared type and length.
 */

import {
  buildResumeFileSecurityResult,
  type ByteRangeReader,
  type ResumeFileSecurityResult,
} from "./types";
import { detectBlockedFormat, hasPdfSignature, hasZipSignature, PDF_HEADER_SEARCH_WINDOW } from "./signatures";
import { readZipEntryNames } from "./zip";

export const PDF_MIME_TYPE = "application/pdf";
export const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Enough for the PDF header window and the ZIP local file header. */
const HEAD_LENGTH = PDF_HEADER_SEARCH_WINDOW;

/**
 * Every OpenXML package carries this. A plain ZIP renamed to .docx will not.
 */
const OPENXML_CONTENT_TYPES_ENTRY = "[Content_Types].xml";

/**
 * A word-processing package must carry the main document part. This is what
 * separates a DOCX from an XLSX or PPTX that also has [Content_Types].xml.
 */
const WORDPROCESSING_MAIN_PART = /^word\/document[0-9]*\.xml$/i;

export interface ResumeFileSecurityInput {
  declaredMimeType: string;
  declaredSizeBytes: number;
  maxUploadBytes: number;
}

export async function validateResumeFileRanges(
  input: ResumeFileSecurityInput,
  read: ByteRangeReader,
): Promise<ResumeFileSecurityResult> {
  const preconditions = checkPreconditions(input);

  if (preconditions) {
    return preconditions;
  }

  let head: Uint8Array;

  try {
    head = await read(0, Math.min(HEAD_LENGTH, input.declaredSizeBytes));
  } catch {
    return buildResumeFileSecurityResult("unavailable", "head_range_read_failed");
  }

  if (head.length === 0) {
    return buildResumeFileSecurityResult("rejected_empty", "head_range_empty");
  }

  const blocked = detectBlockedFormat(head);

  if (blocked) {
    return buildResumeFileSecurityResult("rejected_blocked_format", blocked);
  }

  if (input.declaredMimeType === PDF_MIME_TYPE) {
    return validatePdfHead(head);
  }

  return validateDocx(head, input.declaredSizeBytes, read);
}

export async function validateResumeFileBytes(
  input: Omit<ResumeFileSecurityInput, "declaredSizeBytes">,
  content: Uint8Array,
): Promise<ResumeFileSecurityResult> {
  return validateResumeFileRanges(
    { ...input, declaredSizeBytes: content.length },
    async (start, length) => content.slice(start, start + length),
  );
}

function checkPreconditions(input: ResumeFileSecurityInput): ResumeFileSecurityResult | null {
  if (input.declaredMimeType !== PDF_MIME_TYPE && input.declaredMimeType !== DOCX_MIME_TYPE) {
    return buildResumeFileSecurityResult("rejected_unsupported_type", "mime_not_allowed");
  }

  if (!Number.isInteger(input.declaredSizeBytes) || input.declaredSizeBytes <= 0) {
    return buildResumeFileSecurityResult("rejected_empty", "size_not_positive");
  }

  if (input.declaredSizeBytes > input.maxUploadBytes) {
    return buildResumeFileSecurityResult("rejected_size", "size_over_limit");
  }

  return null;
}

function validatePdfHead(head: Uint8Array): ResumeFileSecurityResult {
  if (!hasPdfSignature(head)) {
    return buildResumeFileSecurityResult("rejected_signature_mismatch", "pdf_header_missing");
  }

  return buildResumeFileSecurityResult("passed", "pdf_header_present");
}

async function validateDocx(
  head: Uint8Array,
  sizeBytes: number,
  read: ByteRangeReader,
): Promise<ResumeFileSecurityResult> {
  if (!hasZipSignature(head)) {
    return buildResumeFileSecurityResult("rejected_signature_mismatch", "zip_header_missing");
  }

  let entries;

  try {
    entries = await readZipEntryNames(sizeBytes, read);
  } catch {
    return buildResumeFileSecurityResult("unavailable", "zip_range_read_failed");
  }

  if (!entries.ok) {
    const status =
      entries.failure === "central_directory_unreadable" ? "unavailable" : "rejected_structure_invalid";
    return buildResumeFileSecurityResult(status, `docx_${entries.failure}`);
  }

  const names = entries.names;

  if (!names.includes(OPENXML_CONTENT_TYPES_ENTRY)) {
    return buildResumeFileSecurityResult(
      "rejected_structure_invalid",
      "docx_content_types_missing",
    );
  }

  if (!names.some((name) => WORDPROCESSING_MAIN_PART.test(name))) {
    return buildResumeFileSecurityResult(
      "rejected_structure_invalid",
      "docx_main_document_part_missing",
    );
  }

  return buildResumeFileSecurityResult("passed", "docx_openxml_structure_present");
}
