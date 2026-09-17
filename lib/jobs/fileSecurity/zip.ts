/**
 * Minimal ZIP central-directory reader, used only to prove that a file claiming
 * to be a DOCX carries a real OpenXML word-processing directory rather than
 * being an arbitrary ZIP with a .docx name.
 *
 * It reads entry NAMES only. It never decompresses entry contents, so a zip
 * bomb cannot be triggered here.
 */

import type { ByteRangeReader } from "./types";
import { indexOfBytes } from "./signatures";

/** `PK\x05\x06` — End Of Central Directory record. */
const EOCD_SIGNATURE = [0x50, 0x4b, 0x05, 0x06] as const;
/** `PK\x01\x02` — a central directory file header. */
const CENTRAL_FILE_HEADER_SIGNATURE = [0x50, 0x4b, 0x01, 0x02] as const;

const EOCD_MIN_LENGTH = 22;
/** EOCD sits within the last 22 bytes plus up to 65535 bytes of comment. */
const EOCD_SEARCH_WINDOW = EOCD_MIN_LENGTH + 0xffff;
/** ZIP64 uses this sentinel in the 32-bit EOCD fields. */
const ZIP64_SENTINEL = 0xffffffff;
/** A resume's central directory is tiny; anything larger is not a resume. */
const MAX_CENTRAL_DIRECTORY_BYTES = 4 * 1024 * 1024;
const MAX_ENTRIES = 5000;

export type ZipReadFailure =
  | "eocd_not_found"
  | "zip64_unsupported"
  | "central_directory_unreadable"
  | "central_directory_malformed";

export type ZipEntryNamesResult =
  | { ok: true; names: string[] }
  | { ok: false; failure: ZipReadFailure };

export async function readZipEntryNames(
  size: number,
  read: ByteRangeReader,
): Promise<ZipEntryNamesResult> {
  if (size < EOCD_MIN_LENGTH) {
    return { ok: false, failure: "eocd_not_found" };
  }

  const tailLength = Math.min(size, EOCD_SEARCH_WINDOW);
  const tailStart = size - tailLength;
  const tail = await read(tailStart, tailLength);
  const eocdOffsetInTail = lastIndexOfBytes(tail, EOCD_SIGNATURE);

  if (eocdOffsetInTail === -1 || tail.length - eocdOffsetInTail < EOCD_MIN_LENGTH) {
    return { ok: false, failure: "eocd_not_found" };
  }

  const eocd = tail.slice(eocdOffsetInTail, eocdOffsetInTail + EOCD_MIN_LENGTH);
  const view = new DataView(eocd.buffer, eocd.byteOffset, eocd.byteLength);
  const entryCount = view.getUint16(10, true);
  const centralDirectorySize = view.getUint32(12, true);
  const centralDirectoryOffset = view.getUint32(16, true);

  if (
    entryCount === 0xffff ||
    centralDirectorySize === ZIP64_SENTINEL ||
    centralDirectoryOffset === ZIP64_SENTINEL
  ) {
    return { ok: false, failure: "zip64_unsupported" };
  }

  if (
    centralDirectorySize === 0 ||
    centralDirectorySize > MAX_CENTRAL_DIRECTORY_BYTES ||
    centralDirectoryOffset + centralDirectorySize > size
  ) {
    return { ok: false, failure: "central_directory_unreadable" };
  }

  // Reuse the tail when it already covers the central directory, so the common
  // case costs one range read rather than two.
  const centralDirectory =
    centralDirectoryOffset >= tailStart
      ? tail.slice(
          centralDirectoryOffset - tailStart,
          centralDirectoryOffset - tailStart + centralDirectorySize,
        )
      : await read(centralDirectoryOffset, centralDirectorySize);

  if (centralDirectory.length < centralDirectorySize) {
    return { ok: false, failure: "central_directory_unreadable" };
  }

  return parseCentralDirectoryNames(centralDirectory, entryCount);
}

function parseCentralDirectoryNames(
  centralDirectory: Uint8Array,
  entryCount: number,
): ZipEntryNamesResult {
  const view = new DataView(
    centralDirectory.buffer,
    centralDirectory.byteOffset,
    centralDirectory.byteLength,
  );
  const names: string[] = [];
  let offset = 0;

  while (offset + 46 <= centralDirectory.length && names.length < MAX_ENTRIES) {
    for (let index = 0; index < CENTRAL_FILE_HEADER_SIGNATURE.length; index += 1) {
      if (centralDirectory[offset + index] !== CENTRAL_FILE_HEADER_SIGNATURE[index]) {
        return { ok: false, failure: "central_directory_malformed" };
      }
    }

    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const nameStart = offset + 46;
    const nameEnd = nameStart + nameLength;

    if (nameEnd > centralDirectory.length) {
      return { ok: false, failure: "central_directory_malformed" };
    }

    names.push(Buffer.from(centralDirectory.slice(nameStart, nameEnd)).toString("utf8"));
    offset = nameEnd + extraLength + commentLength;
  }

  if (names.length === 0 || names.length !== entryCount) {
    return { ok: false, failure: "central_directory_malformed" };
  }

  return { ok: true, names };
}

function lastIndexOfBytes(buffer: Uint8Array, bytes: readonly number[]): number {
  for (let offset = buffer.length - bytes.length; offset >= 0; offset -= 1) {
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

export { indexOfBytes };
