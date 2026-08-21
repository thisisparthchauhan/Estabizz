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
          malwareScanStatus: "pending",
        }
      : null;
  }

  async deleteObject(objectKey) {
    this.objects.delete(objectKey);
  }

  markUploaded(objectKey, metadata) {
    this.objects.set(objectKey, metadata);
  }
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
