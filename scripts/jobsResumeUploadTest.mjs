import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-resume-upload-"));

async function main() {
  execFileSync(
    "npx",
    [
      "tsc",
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--moduleResolution",
      "node",
      "--esModuleInterop",
      "--skipLibCheck",
      "--outDir",
      outDir,
      "lib/jobs/documentStorage/types.ts",
      "lib/jobs/documentStorage/policy.ts",
      "lib/jobs/candidateIdentity/types.ts",
      "lib/jobs/resumeUpload/types.ts",
      "lib/jobs/resumeUpload/token.ts",
      "lib/jobs/resumeUpload/service.ts",
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const service = require(path.join(outDir, "resumeUpload/service.js"));
  const token = require(path.join(outDir, "resumeUpload/token.js"));
  const types = require(path.join(outDir, "resumeUpload/types.js"));

  await runTests(service, token, types);
  console.log("Jobs private resume upload synthetic tests: PASS");
}

async function runTests(service, token, types) {
  const secret = "synthetic-upload-secret";
  const candidateA = session("11111111-1111-4111-8111-111111111111", "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
  const candidateB = session("22222222-2222-4222-8222-222222222222", "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb");
  const storage = new FakeStorage();
  const repository = new FakeResumeRepository();
  const dependencies = {
    storage,
    repository,
    maxUploadBytes: 2_000_000,
    presignedUploadTtlSeconds: 600,
    tokenSecret: secret,
  };

  const pdfIntent = await service.createResumeUploadIntent(
    candidateA,
    service.parseResumeUploadIntentBody({
      fileName: "Aarav Synthetic Resume.pdf",
      contentType: "application/pdf",
      contentLengthBytes: 1024,
      candidateId: candidateB.candidateId,
    }),
    dependencies,
  );
  assert(pdfIntent.uploadUrl.startsWith("https://storage.example/upload/"));
  assert.equal(pdfIntent.allowedExtensions.includes("doc"), false, "DOC must not be advertised");
  assert.equal(pdfIntent.requiredHeaders["Content-Type"], "application/pdf");

  const pdfToken = token.verifyResumeUploadToken(pdfIntent.uploadRef, secret);
  assert.equal(pdfToken.candidateId, candidateA.candidateId, "browser candidateId must be ignored");
  assert.equal(pdfToken.objectKey.includes("Aarav"), false, "object key must not contain candidate name");
  assert.equal(pdfToken.objectKey.includes("example.test"), false, "object key must not contain email");

  storage.markUploaded(pdfToken.objectKey, {
    contentType: "application/pdf",
    contentLengthBytes: 1024,
  });
  const confirmedV1 = await service.confirmResumeUpload(candidateA, { uploadRef: pdfIntent.uploadRef }, dependencies);
  assert.equal(confirmedV1.versionNumber, 1);
  assert.equal(repository.currentVersion(candidateA.candidateId).id, confirmedV1.resumeVersionId);

  const duplicateConfirm = await service.confirmResumeUpload(candidateA, { uploadRef: pdfIntent.uploadRef }, dependencies);
  assert.equal(duplicateConfirm.resumeVersionId, confirmedV1.resumeVersionId, "duplicate confirmation must be idempotent");
  assert.equal(repository.versionsFor(candidateA.candidateId).length, 1, "duplicate confirmation must not create a second resume");

  const docxIntent = await service.createResumeUploadIntent(
    candidateA,
    service.parseResumeUploadIntentBody({
      fileName: "new-resume.docx",
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      contentLengthBytes: 2048,
    }),
    dependencies,
  );
  const docxToken = token.verifyResumeUploadToken(docxIntent.uploadRef, secret);
  storage.markUploaded(docxToken.objectKey, {
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    contentLengthBytes: 2048,
  });
  const confirmedV2 = await service.confirmResumeUpload(candidateA, { uploadRef: docxIntent.uploadRef }, dependencies);
  assert.equal(confirmedV2.versionNumber, 2, "second upload should create version 2");
  assert.equal(repository.versionsFor(candidateA.candidateId).length, 2, "previous version must be preserved");
  assert.equal(repository.currentVersion(candidateA.candidateId).id, confirmedV2.resumeVersionId, "new verified upload becomes current");
  assert.equal(
    repository.versionsFor(candidateA.candidateId).filter((item) => item.isCurrent).length,
    1,
    "exactly one current resume is allowed",
  );

  const failedIntent = await service.createResumeUploadIntent(
    candidateA,
    service.parseResumeUploadIntentBody({
      fileName: "failed.pdf",
      contentType: "application/pdf",
      contentLengthBytes: 1000,
    }),
    dependencies,
  );
  await assert.rejects(
    () => service.confirmResumeUpload(candidateA, { uploadRef: failedIntent.uploadRef }, dependencies),
    types.ResumeUploadStorageError,
    "incomplete upload must be rejected",
  );
  assert.equal(repository.currentVersion(candidateA.candidateId).id, confirmedV2.resumeVersionId, "failed upload preserves current resume");

  await assert.rejects(
    () => service.confirmResumeUpload(candidateB, { uploadRef: pdfIntent.uploadRef }, dependencies),
    types.ResumeUploadAuthorizationError,
    "candidate B must not confirm candidate A upload",
  );

  const injectedToken = token.signResumeUploadToken(
    {
      candidateId: candidateA.candidateId,
      actorRefId: candidateA.actorRefId,
      objectKey: `tmp/candidates/${candidateB.candidateId}/evil.pdf`,
      fileName: "evil.pdf",
      contentType: "application/pdf",
      contentLengthBytes: 10,
      uploadKind: "resume",
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    },
    secret,
  );
  await assert.rejects(
    () => service.confirmResumeUpload(candidateA, { uploadRef: injectedToken }, dependencies),
    types.ResumeUploadAuthorizationError,
    "object-path injection must be rejected",
  );

  await assert.rejects(
    () =>
      service.createResumeUploadIntent(
        candidateA,
        { fileName: "legacy.doc", contentType: "application/msword", contentLengthBytes: 100 },
        dependencies,
      ),
    types.ResumeUploadValidationError,
    "DOC must not be supported by resume upload V1",
  );
  await assert.rejects(
    () =>
      service.createResumeUploadIntent(
        candidateA,
        { fileName: "tool.exe", contentType: "application/octet-stream", contentLengthBytes: 100 },
        dependencies,
      ),
    types.ResumeUploadValidationError,
    "EXE must be rejected",
  );
  await assert.rejects(
    () =>
      service.createResumeUploadIntent(
        candidateA,
        { fileName: "empty.pdf", contentType: "application/pdf", contentLengthBytes: 0 },
        dependencies,
      ),
    types.ResumeUploadValidationError,
    "empty resume must be rejected",
  );
  await assert.rejects(
    () =>
      service.createResumeUploadIntent(
        candidateA,
        { fileName: "large.pdf", contentType: "application/pdf", contentLengthBytes: dependencies.maxUploadBytes + 1 },
        dependencies,
      ),
    types.ResumeUploadValidationError,
    "oversized resume must be rejected",
  );
  await assert.rejects(
    () =>
      service.createResumeUploadIntent(
        candidateA,
        { fileName: "mismatch.pdf", contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", contentLengthBytes: 100 },
        dependencies,
      ),
    types.ResumeUploadValidationError,
    "MIME/extension mismatch must be rejected",
  );

  const wrongSizeIntent = await service.createResumeUploadIntent(
    candidateA,
    service.parseResumeUploadIntentBody({
      fileName: "wrong-size.pdf",
      contentType: "application/pdf",
      contentLengthBytes: 1200,
    }),
    dependencies,
  );
  const wrongSizeToken = token.verifyResumeUploadToken(wrongSizeIntent.uploadRef, secret);
  storage.markUploaded(wrongSizeToken.objectKey, {
    contentType: "application/pdf",
    contentLengthBytes: 0,
  });
  await assert.rejects(
    () => service.confirmResumeUpload(candidateA, { uploadRef: wrongSizeIntent.uploadRef }, dependencies),
    types.ResumeUploadStorageError,
    "zero-byte uploaded object must be rejected",
  );
}

function session(candidateId, actorRefId) {
  return {
    candidateId,
    actorRefId,
    email: "synthetic.candidate@example.test",
    displayName: "Synthetic Candidate",
  };
}

class FakeStorage {
  constructor() {
    this.objects = new Map();
    this.sequence = 0;
  }

  async validateConfiguredBucket() {}

  async createPresignedUpload(request) {
    this.sequence += 1;
    const extension = request.contentType === "application/pdf" ? "pdf" : "docx";
    const objectKey = `tmp/candidates/${request.candidateId}/synthetic-${this.sequence}.${extension}`;
    return {
      objectKey,
      uploadUrl: `https://storage.example/upload/${this.sequence}`,
      expiresAt: new Date(Date.now() + 600_000),
      requiredHeaders: {
        "Content-Type": request.contentType,
        "x-amz-meta-candidate-id": request.candidateId,
      },
    };
  }

  async createPresignedDownload() {
    throw new Error("not implemented in synthetic test");
  }

  async getObjectMetadata(objectKey) {
    const object = this.objects.get(objectKey);
    return object
      ? {
          objectKey,
          contentType: object.contentType,
          contentLengthBytes: object.contentLengthBytes,
          uploadedAt: new Date(),
          malwareScanStatus: "not_scanned",
        }
      : null;
  }

  async getObjectRange(objectKey, start, endInclusive) {
    const object = this.objects.get(objectKey);

    if (!object) {
      return null;
    }

    return object.content.slice(start, endInclusive + 1);
  }

  async deleteObject(objectKey) {
    this.objects.delete(objectKey);
  }

  markUploaded(objectKey, metadata) {
    // The confirm path now structurally validates the stored bytes, so a
    // synthetic object needs real content of the declared type.
    this.objects.set(objectKey, {
      ...metadata,
      content: metadata.content ?? syntheticContentFor(metadata.contentType, metadata.contentLengthBytes),
    });
  }
}

/** Minimal but structurally real PDF / DOCX bytes for the synthetic storage. */
function syntheticContentFor(contentType, contentLengthBytes) {
  const body =
    contentType === "application/pdf" ? syntheticPdfBytes() : syntheticDocxBytes();
  const padded = new Uint8Array(Math.max(contentLengthBytes, body.length));
  padded.set(body, 0);

  // A DOCX is validated from its trailer, so padding must not follow it.
  return contentType === "application/pdf" ? padded.slice(0, contentLengthBytes || body.length) : body;
}

function syntheticPdfBytes() {
  return new Uint8Array(Buffer.from("%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer\n%%EOF\n", "latin1"));
}

function syntheticDocxBytes() {
  return buildStoreOnlyZip([
    ["[Content_Types].xml", "<Types/>"],
    ["word/document.xml", "<document><body>synthetic</body></document>"],
  ]);
}

function buildStoreOnlyZip(entries) {
  const chunks = [];
  const files = [];
  let offset = 0;

  for (const [name, content] of entries) {
    const nameBytes = Buffer.from(name, "utf8");
    const data = Buffer.from(content, "utf8");
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
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

class FakeResumeRepository {
  constructor() {
    this.versions = [];
  }

  async confirmUploadedResume(input) {
    const existing = this.versions.find(
      (item) => item.candidateId === input.session.candidateId && item.objectKey === input.token.objectKey,
    );
    if (existing) {
      return toRepositoryResult(existing, false);
    }

    const versionNumber = this.versions.filter((item) => item.candidateId === input.session.candidateId).length + 1;
    for (const item of this.versions) {
      if (item.candidateId === input.session.candidateId) {
        item.isCurrent = false;
      }
    }
    const created = {
      id: `resume-${this.versions.length + 1}`,
      candidateId: input.session.candidateId,
      versionNumber,
      isCurrent: true,
      objectKey: input.token.objectKey,
      fileName: input.token.fileName,
      fileType: input.token.contentType,
      fileSizeBytes: input.metadata.contentLengthBytes,
      uploadedAt: new Date(),
    };
    this.versions.push(created);
    return toRepositoryResult(created, true);
  }

  versionsFor(candidateId) {
    return this.versions.filter((item) => item.candidateId === candidateId);
  }

  currentVersion(candidateId) {
    return this.versionsFor(candidateId).find((item) => item.isCurrent);
  }
}

function toRepositoryResult(version, created) {
  return {
    resumeVersionId: version.id,
    versionNumber: version.versionNumber,
    fileName: version.fileName,
    fileType: version.fileType,
    fileSizeBytes: version.fileSizeBytes,
    uploadedAt: version.uploadedAt,
    created,
  };
}

try {
  await main();
} finally {
  rmSync(outDir, { force: true, recursive: true });
}
