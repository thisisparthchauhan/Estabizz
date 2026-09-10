/**
 * Magic-byte checks. See ./types.ts — this is structural validation, not
 * malware scanning.
 */

/** `%PDF-` */
export const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;

/** `PK\x03\x04` — a ZIP local file header, which is how every DOCX starts. */
export const ZIP_LOCAL_FILE_HEADER = [0x50, 0x4b, 0x03, 0x04] as const;

/**
 * pypdf tolerates a short run of junk before the PDF header, and so do most
 * real-world writers, so the header is searched for rather than required at
 * offset 0 — but it must appear within this window.
 */
export const PDF_HEADER_SEARCH_WINDOW = 1024;

interface BlockedFormat {
  label: string;
  bytes: readonly number[];
}

/**
 * Formats that must never reach the parser, matched at offset 0. DOCX is itself
 * a ZIP, so ZIP is deliberately absent here — DOCX uploads are instead required
 * to carry a real OpenXML directory (see ./zip.ts).
 */
const BLOCKED_FORMATS: readonly BlockedFormat[] = [
  { label: "windows_executable", bytes: [0x4d, 0x5a] }, // MZ
  { label: "elf_executable", bytes: [0x7f, 0x45, 0x4c, 0x46] },
  { label: "mach_o_executable", bytes: [0xfe, 0xed, 0xfa, 0xce] },
  { label: "mach_o_executable", bytes: [0xfe, 0xed, 0xfa, 0xcf] },
  { label: "mach_o_executable", bytes: [0xcf, 0xfa, 0xed, 0xfe] },
  { label: "mach_o_universal", bytes: [0xca, 0xfe, 0xba, 0xbe] },
  { label: "shell_script", bytes: [0x23, 0x21] }, // #!
  { label: "rar_archive", bytes: [0x52, 0x61, 0x72, 0x21] }, // Rar!
  { label: "seven_zip_archive", bytes: [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c] },
  { label: "gzip_archive", bytes: [0x1f, 0x8b] },
  { label: "bzip2_archive", bytes: [0x42, 0x5a, 0x68] }, // BZh
  { label: "xz_archive", bytes: [0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00] },
  { label: "java_class", bytes: [0xca, 0xfe, 0xba, 0xbe] },
  { label: "rtf_document", bytes: [0x7b, 0x5c, 0x72, 0x74, 0x66] }, // {\rtf
  // OLE2 compound file: legacy .doc/.xls. DOC is deliberately unsupported.
  { label: "legacy_ole2_document", bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] },
];

/** ASCII prefixes that indicate markup/script rather than a document. */
const BLOCKED_TEXT_PREFIXES: readonly { label: string; prefix: string }[] = [
  { label: "html_document", prefix: "<!doctype html" },
  { label: "html_document", prefix: "<html" },
  { label: "script_content", prefix: "<script" },
  { label: "php_script", prefix: "<?php" },
];

export function startsWithBytes(buffer: Uint8Array, bytes: readonly number[]): boolean {
  if (buffer.length < bytes.length) {
    return false;
  }

  return bytes.every((byte, index) => buffer[index] === byte);
}

export function indexOfBytes(
  buffer: Uint8Array,
  bytes: readonly number[],
  limit = buffer.length,
): number {
  const end = Math.min(limit, buffer.length) - bytes.length;

  for (let offset = 0; offset <= end; offset += 1) {
    let matched = true;

    for (let index = 0; index < bytes.length; index += 1) {
      if (buffer[offset + index] !== bytes[index]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return offset;
    }
  }

  return -1;
}

/** Returns a stable format label when the header matches a blocked type. */
export function detectBlockedFormat(head: Uint8Array): string | null {
  for (const format of BLOCKED_FORMATS) {
    if (startsWithBytes(head, format.bytes)) {
      return format.label;
    }
  }

  const asciiPrefix = Buffer.from(head.slice(0, 64)).toString("latin1").trimStart().toLowerCase();

  for (const { label, prefix } of BLOCKED_TEXT_PREFIXES) {
    if (asciiPrefix.startsWith(prefix)) {
      return label;
    }
  }

  return null;
}

export function hasPdfSignature(head: Uint8Array): boolean {
  return indexOfBytes(head, PDF_SIGNATURE, PDF_HEADER_SEARCH_WINDOW) !== -1;
}

export function hasZipSignature(head: Uint8Array): boolean {
  return startsWithBytes(head, ZIP_LOCAL_FILE_HEADER);
}
