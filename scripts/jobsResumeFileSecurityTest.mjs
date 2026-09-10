/**
 * Synthetic tests for the Phase 5 resume file-security gate, upload token
 * ownership rules, processing gate and status derivation.
 *
 * Uses generated synthetic fixtures only. No real candidate CV is read.
 * Makes no network calls, no database calls and no AI calls.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import zlib from "node:zlib";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-file-security-"));

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓  ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗  ${name}`);
    console.log(`       ${error.message}`);
  }
}

async function checkAsync(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓  ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗  ${name}`);
    console.log(`       ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Synthetic fixtures, built in-process so the suite has no external inputs.
// ---------------------------------------------------------------------------

function buildZip(entries) {
  // Minimal store-only ZIP writer: local headers, central directory, EOCD.
  const files = [];
  const chunks = [];
  let offset = 0;

  for (const [name, content] of entries) {
    const nameBytes = Buffer.from(name, "utf8");
    const data = Buffer.from(content, "utf8");
    const crc = zlib.crc32 ? zlib.crc32(data) : crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, nameBytes, data);
    files.push({ nameBytes, crc, size: data.length, offset });
    offset += local.length + nameBytes.length + data.length;
  }

  const centralStart = offset;
  for (const file of files) {
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt32LE(file.crc, 16);
    central.writeUInt32LE(file.size, 20);
    central.writeUInt32LE(file.size, 24);
    central.writeUInt16LE(file.nameBytes.length, 28);
    central.writeUInt32LE(file.offset, 42);
    chunks.push(central, file.nameBytes);
    offset += central.length + file.nameBytes.length;
  }

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(offset - centralStart, 12);
  eocd.writeUInt32LE(centralStart, 16);
  chunks.push(eocd);

  return new Uint8Array(Buffer.concat(chunks));
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const bytes = (s) => new Uint8Array(Buffer.from(s, "latin1"));

const FIXTURES = {
  validPdf: bytes("%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer\n%%EOF\n"),
  pdfWithLeadingJunk: new Uint8Array(
    Buffer.concat([Buffer.alloc(200, 0x20), Buffer.from("%PDF-1.7\ncontent\n%%EOF\n")]),
  ),
  pdfHeaderTooDeep: new Uint8Array(
    Buffer.concat([Buffer.alloc(2000, 0x20), Buffer.from("%PDF-1.7\n")]),
  ),
  notAPdf: bytes("this is definitely not a pdf document\n".repeat(40)),
  validDocx: buildZip([
    ["[Content_Types].xml", "<Types/>"],
    ["_rels/.rels", "<Relationships/>"],
    ["word/document.xml", "<document><body>synthetic</body></document>"],
  ]),
  arbitraryZip: buildZip([
    ["notes.txt", "arbitrary zip content"],
    ["data/values.csv", "a,b,c"],
  ]),
  spreadsheetPackage: buildZip([
    ["[Content_Types].xml", "<Types/>"],
    ["xl/workbook.xml", "<workbook/>"],
  ]),
  windowsExecutable: new Uint8Array(Buffer.concat([Buffer.from([0x4d, 0x5a, 0x90]), Buffer.alloc(300)])),
  elfExecutable: new Uint8Array(Buffer.concat([Buffer.from([0x7f, 0x45, 0x4c, 0x46]), Buffer.alloc(300)])),
  htmlDocument: bytes("<!DOCTYPE html><html><body>resume</body></html>"),
  shellScript: bytes("#!/bin/sh\nrm -rf /\n"),
  rtfDocument: bytes("{\\rtf1\\ansi resume content}"),
  ole2Document: new Uint8Array(
    Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.alloc(300)]),
  ),
  rarArchive: new Uint8Array(Buffer.concat([Buffer.from("Rar!"), Buffer.alloc(300)])),
  gzipArchive: new Uint8Array(Buffer.concat([Buffer.from([0x1f, 0x8b, 0x08]), Buffer.alloc(300)])),
  empty: new Uint8Array(0),
};

const PDF = "application/pdf";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX = 10 * 1024 * 1024;

async function main() {
  execFileSync(
    "npx",
    [
      "tsc",
      "--module", "commonjs",
      "--target", "es2020",
      "--moduleResolution", "node",
      "--esModuleInterop",
      "--skipLibCheck",
      "--outDir", outDir,
      "lib/jobs/fileSecurity/types.ts",
      "lib/jobs/fileSecurity/signatures.ts",
      "lib/jobs/fileSecurity/zip.ts",
      "lib/jobs/fileSecurity/validate.ts",
      "lib/jobs/documentStorage/types.ts",
      "lib/jobs/documentStorage/policy.ts",
      "lib/jobs/candidateIdentity/types.ts",
      "lib/jobs/resumeUpload/types.ts",
      "lib/jobs/resumeUpload/token.ts",
      "lib/jobs/resumeUpload/service.ts",
      "lib/jobs/resumeStatus/types.ts",
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const validate = require(path.join(outDir, "fileSecurity/validate.js"));
  const signatures = require(path.join(outDir, "fileSecurity/signatures.js"));
  const uploadService = require(path.join(outDir, "resumeUpload/service.js"));
  const uploadToken = require(path.join(outDir, "resumeUpload/token.js"));
  const statusTypes = require(path.join(outDir, "resumeStatus/types.js"));

  const run = (mime, content) =>
    validate.validateResumeFileBytes({ declaredMimeType: mime, maxUploadBytes: MAX }, content);

  console.log("\nPDF signature validation:");
  await checkAsync("a real PDF passes", async () => {
    const r = await run(PDF, FIXTURES.validPdf);
    assert.equal(r.status, "passed");
    assert.equal(r.ok, true);
  });
  await checkAsync("a PDF with short leading junk still passes", async () => {
    assert.equal((await run(PDF, FIXTURES.pdfWithLeadingJunk)).status, "passed");
  });
  await checkAsync("a PDF header beyond the search window is rejected", async () => {
    const r = await run(PDF, FIXTURES.pdfHeaderTooDeep);
    assert.equal(r.status, "rejected_signature_mismatch");
  });
  await checkAsync("non-PDF bytes declared as PDF are rejected", async () => {
    const r = await run(PDF, FIXTURES.notAPdf);
    assert.equal(r.status, "rejected_signature_mismatch");
    assert.equal(r.detail, "pdf_header_missing");
  });
  await checkAsync("a DOCX package declared as PDF is rejected", async () => {
    assert.equal((await run(PDF, FIXTURES.validDocx)).status, "rejected_signature_mismatch");
  });

  console.log("\nDOCX structure validation:");
  await checkAsync("a real OpenXML word package passes", async () => {
    const r = await run(DOCX, FIXTURES.validDocx);
    assert.equal(r.status, "passed");
    assert.equal(r.detail, "docx_openxml_structure_present");
  });
  await checkAsync("an arbitrary ZIP renamed to DOCX is rejected", async () => {
    const r = await run(DOCX, FIXTURES.arbitraryZip);
    assert.equal(r.status, "rejected_structure_invalid");
    assert.equal(r.detail, "docx_content_types_missing");
  });
  await checkAsync("a spreadsheet OpenXML package is rejected as DOCX", async () => {
    const r = await run(DOCX, FIXTURES.spreadsheetPackage);
    assert.equal(r.status, "rejected_structure_invalid");
    assert.equal(r.detail, "docx_main_document_part_missing");
  });
  await checkAsync("PDF bytes declared as DOCX are rejected", async () => {
    const r = await run(DOCX, FIXTURES.validPdf);
    assert.equal(r.status, "rejected_signature_mismatch");
    assert.equal(r.detail, "zip_header_missing");
  });
  await checkAsync("a truncated ZIP is rejected", async () => {
    const truncated = FIXTURES.validDocx.slice(0, FIXTURES.validDocx.length - 30);
    const r = await run(DOCX, truncated);
    assert.notEqual(r.status, "passed");
  });

  console.log("\nBlocked formats:");
  for (const [name, fixture, mime] of [
    ["windows executable", FIXTURES.windowsExecutable, PDF],
    ["ELF executable", FIXTURES.elfExecutable, PDF],
    ["HTML document", FIXTURES.htmlDocument, PDF],
    ["shell script", FIXTURES.shellScript, PDF],
    ["RTF document", FIXTURES.rtfDocument, DOCX],
    ["legacy OLE2 .doc", FIXTURES.ole2Document, DOCX],
    ["RAR archive", FIXTURES.rarArchive, DOCX],
    ["gzip archive", FIXTURES.gzipArchive, DOCX],
  ]) {
    await checkAsync(`${name} is rejected as a blocked format`, async () => {
      const r = await run(mime, fixture);
      assert.equal(r.status, "rejected_blocked_format");
      assert.equal(r.ok, false);
    });
  }

  console.log("\nSize and type preconditions:");
  await checkAsync("a zero-byte file is rejected", async () => {
    assert.equal((await run(PDF, FIXTURES.empty)).status, "rejected_empty");
  });
  await checkAsync("an oversized file is rejected before any byte is read", async () => {
    let reads = 0;
    const r = await validate.validateResumeFileRanges(
      { declaredMimeType: PDF, declaredSizeBytes: MAX + 1, maxUploadBytes: MAX },
      async () => {
        reads += 1;
        return new Uint8Array(0);
      },
    );
    assert.equal(r.status, "rejected_size");
    assert.equal(reads, 0, "oversized files must not be fetched");
  });
  await checkAsync("an unsupported MIME type is rejected", async () => {
    const r = await run("application/msword", FIXTURES.validPdf);
    assert.equal(r.status, "rejected_unsupported_type");
  });
  await checkAsync("a storage read failure reports unavailable, not a rejection", async () => {
    const r = await validate.validateResumeFileRanges(
      { declaredMimeType: PDF, declaredSizeBytes: 1000, maxUploadBytes: MAX },
      async () => {
        throw new Error("storage unreachable");
      },
    );
    assert.equal(r.status, "unavailable");
    assert.equal(r.ok, false);
  });

  console.log("\nCandidate-facing messages:");
  await checkAsync("no rejection message leaks internals", async () => {
    for (const fixture of Object.values(FIXTURES)) {
      for (const mime of [PDF, DOCX]) {
        const r = await run(mime, fixture);
        const message = r.candidateMessage.toLowerCase();
        for (const leak of ["bucket", "s3", "backblaze", "tmp/", "x-amz", "qstash", "openai", "http"]) {
          assert.ok(!message.includes(leak), `message leaked "${leak}": ${r.candidateMessage}`);
        }
      }
    }
  });

  console.log("\nRanged reads:");
  await checkAsync("ranged validation matches whole-buffer validation", async () => {
    for (const [mime, fixture] of [
      [PDF, FIXTURES.validPdf],
      [DOCX, FIXTURES.validDocx],
      [DOCX, FIXTURES.arbitraryZip],
      [PDF, FIXTURES.notAPdf],
    ]) {
      const whole = await run(mime, fixture);
      const ranged = await validate.validateResumeFileRanges(
        { declaredMimeType: mime, declaredSizeBytes: fixture.length, maxUploadBytes: MAX },
        async (start, length) => fixture.slice(start, start + length),
      );
      assert.equal(ranged.status, whole.status, `${mime} disagreed`);
    }
  });
  await checkAsync("a valid DOCX is validated without reading the whole file", async () => {
    const big = new Uint8Array(2 * 1024 * 1024);
    big.set(FIXTURES.validDocx.slice(0, 4), 0);
    big.set(FIXTURES.validDocx, big.length - FIXTURES.validDocx.length);
    let bytesRead = 0;
    await validate.validateResumeFileRanges(
      { declaredMimeType: DOCX, declaredSizeBytes: big.length, maxUploadBytes: MAX },
      async (start, length) => {
        bytesRead += length;
        return big.slice(start, start + length);
      },
    );
    assert.ok(bytesRead < big.length, `read ${bytesRead} of ${big.length} bytes`);
  });

  console.log("\nSignature helpers:");
  check("detectBlockedFormat returns null for real documents", () => {
    assert.equal(signatures.detectBlockedFormat(FIXTURES.validPdf), null);
    assert.equal(signatures.detectBlockedFormat(FIXTURES.validDocx), null);
  });
  check("detectBlockedFormat labels are stable", () => {
    assert.equal(signatures.detectBlockedFormat(FIXTURES.windowsExecutable), "windows_executable");
    assert.equal(signatures.detectBlockedFormat(FIXTURES.htmlDocument), "html_document");
  });

  console.log("\nUpload token ownership:");
  const secret = "synthetic-upload-token-secret";
  const basePayload = {
    candidateId: "11111111-1111-4111-8111-111111111111",
    actorRefId: "22222222-2222-4222-8222-222222222222",
    objectKey: "tmp/candidates/11111111-1111-4111-8111-111111111111/abc.pdf",
    fileName: "resume.pdf",
    contentType: PDF,
    contentLengthBytes: 1234,
    uploadKind: "resume",
    expiresAt: new Date(Date.now() + 600_000).toISOString(),
  };

  check("a valid token round-trips", () => {
    const token = uploadToken.signResumeUploadToken(basePayload, secret);
    const verified = uploadToken.verifyResumeUploadToken(token, secret);
    assert.equal(verified.candidateId, basePayload.candidateId);
  });
  check("an expired token is rejected", () => {
    const token = uploadToken.signResumeUploadToken(
      { ...basePayload, expiresAt: new Date(Date.now() - 1000).toISOString() },
      secret,
    );
    assert.throws(() => uploadToken.verifyResumeUploadToken(token, secret), /expired/i);
  });
  check("a token signed with another secret is rejected", () => {
    const token = uploadToken.signResumeUploadToken(basePayload, "different-secret");
    assert.throws(() => uploadToken.verifyResumeUploadToken(token, secret), /invalid/i);
  });
  check("a tampered ciphertext is rejected", () => {
    const token = uploadToken.signResumeUploadToken(basePayload, secret);
    const parts = token.split(".");
    const ciphertext = Buffer.from(parts[2], "base64url");
    ciphertext[0] ^= 0xff;
    parts[2] = ciphertext.toString("base64url");
    assert.throws(() => uploadToken.verifyResumeUploadToken(parts.join("."), secret), /invalid/i);
  });
  check("a swapped auth tag is rejected", () => {
    const a = uploadToken.signResumeUploadToken(basePayload, secret).split(".");
    const b = uploadToken.signResumeUploadToken(basePayload, secret).split(".");
    a[3] = b[3];
    assert.throws(() => uploadToken.verifyResumeUploadToken(a.join("."), secret), /invalid/i);
  });
  check("the reference does not leak the storage object key to the client", () => {
    const token = uploadToken.signResumeUploadToken(basePayload, secret);
    assert.ok(!token.includes("tmp/"), "object key appeared in the reference");
    assert.ok(!token.includes(basePayload.candidateId), "candidate id appeared in the reference");

    // Nothing readable should survive a base64url decode of any segment either.
    for (const part of token.split(".")) {
      const decoded = Buffer.from(part, "base64url").toString("utf8");
      assert.ok(!decoded.includes("tmp/"), "object key recoverable from the reference");
      assert.ok(!decoded.includes("candidateId"), "payload readable from the reference");
    }
  });
  check("each reference uses a fresh IV", () => {
    const first = uploadToken.signResumeUploadToken(basePayload, secret);
    const second = uploadToken.signResumeUploadToken(basePayload, secret);
    assert.notEqual(first, second, "identical payloads produced identical references");
  });

  console.log("\nUpload intent validation:");
  check("a PDF/extension mismatch is rejected", () => {
    assert.throws(
      () =>
        uploadService.validateResumeUploadIntent(
          { fileName: "resume.docx", contentType: PDF, contentLengthBytes: 100 },
          MAX,
        ),
      /invalid/i,
    );
  });
  check("legacy .doc is rejected", () => {
    assert.throws(
      () =>
        uploadService.validateResumeUploadIntent(
          { fileName: "resume.doc", contentType: "application/msword", contentLengthBytes: 100 },
          MAX,
        ),
      /invalid/i,
    );
  });
  check("a zero-byte intent is rejected", () => {
    assert.throws(
      () =>
        uploadService.validateResumeUploadIntent(
          { fileName: "resume.pdf", contentType: PDF, contentLengthBytes: 0 },
          MAX,
        ),
      /invalid/i,
    );
  });
  check("an oversized intent is rejected", () => {
    assert.throws(
      () =>
        uploadService.validateResumeUploadIntent(
          { fileName: "resume.pdf", contentType: PDF, contentLengthBytes: MAX + 1 },
          MAX,
        ),
      /invalid/i,
    );
  });

  console.log("\nStatus vocabulary:");
  check("in-progress statuses are exactly pending and processing", () => {
    const inProgress = statusTypes.RESUME_PROCESSING_STATUSES.filter((s) =>
      statusTypes.isResumeProcessingInProgress(s),
    );
    assert.deepEqual(inProgress, ["pending", "processing"]);
  });
  check("every status has a candidate message", () => {
    for (const status of statusTypes.RESUME_PROCESSING_STATUSES) {
      assert.ok(statusTypes.RESUME_STATUS_MESSAGES[status], `missing message for ${status}`);
    }
  });
  check("no status message claims the file was scanned", () => {
    for (const message of Object.values(statusTypes.RESUME_STATUS_MESSAGES)) {
      assert.ok(
        !/\b(scanned for|virus|malware|antivirus|safe)\b/i.test(message),
        `misleading safety claim: ${message}`,
      );
    }
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => rmSync(outDir, { recursive: true, force: true }));
