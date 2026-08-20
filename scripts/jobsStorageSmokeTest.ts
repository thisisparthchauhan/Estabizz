import { createHash } from "crypto";
import { config as loadEnv } from "dotenv";

import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
  validateDocumentStorageConfig,
} from "../lib/jobs/documentStorage";

loadEnv({ path: ".env.local", quiet: true });

const candidateId = "storage-smoke-test";
const uploadId = `smoke-${Date.now()}`;
const body = Buffer.from(
  "%PDF-1.4\n% Estabizz Jobs storage smoke test only. Not a candidate CV.\n%%EOF\n",
  "utf8",
);
const sha256Hex = createHash("sha256").update(body).digest("hex");
const results = {
  stagingSafety: false,
  connection: false,
  upload: false,
  metadata: false,
  download: false,
  delete: false,
  cleanup: false,
};

async function main() {
  const storageConfig = getDocumentStorageConfig();
  const validation = validateDocumentStorageConfig(storageConfig);

  if (storageConfig.environment === "production") {
    throw new Error("Smoke test refused to run because APP_ENV is production.");
  }

  if (!/(^|[-_])staging($|[-_])/i.test(storageConfig.bucket)) {
    throw new Error("Smoke test refused to run because bucket name does not clearly contain staging.");
  }

  if (!validation.ok) {
    throw new Error(`Smoke test refused to run: ${validation.errors.join(" ")}`);
  }

  results.stagingSafety = true;

  const storage = createS3CompatibleDocumentStorage(storageConfig);
  let objectKey = "";

  try {
    await storage.validateConfiguredBucket();
    results.connection = true;

    const uploadTarget = await storage.createPresignedUpload({
      candidateId,
      uploadId,
      uploadKind: "resume",
      originalFilename: "storage-smoke-test.pdf",
      contentType: "application/pdf",
      contentLengthBytes: body.byteLength,
      requestedByRefId: "storage-smoke-test",
      sha256Hex,
    });
    objectKey = uploadTarget.objectKey;

    const uploadResponse = await fetch(uploadTarget.uploadUrl, {
      method: "PUT",
      headers: uploadTarget.requiredHeaders,
      body,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Upload failed with HTTP ${uploadResponse.status}: ${await safeResponseText(uploadResponse)}`,
      );
    }

    results.upload = true;

    const metadata = await storage.getObjectMetadata(objectKey);

    if (
      !metadata ||
      metadata.contentType !== "application/pdf" ||
      metadata.contentLengthBytes !== body.byteLength ||
      metadata.sha256Hex !== sha256Hex
    ) {
      throw new Error("Uploaded object metadata did not match the smoke-test expectations.");
    }

    results.metadata = true;

    const downloadTarget = await storage.createPresignedDownload({
      objectKey,
      candidateId,
      requestedByRefId: "storage-smoke-test",
      reason: "system_verification",
    });
    const downloadResponse = await fetch(downloadTarget.downloadUrl);

    if (!downloadResponse.ok) {
      throw new Error(
        `Download failed with HTTP ${downloadResponse.status}: ${await safeResponseText(downloadResponse)}`,
      );
    }

    const downloaded = Buffer.from(await downloadResponse.arrayBuffer());

    if (!downloaded.equals(body)) {
      throw new Error("Downloaded smoke-test content did not match uploaded content.");
    }

    results.download = true;

    await storage.deleteObject(objectKey);
    results.delete = true;

    const afterDelete = await storage.getObjectMetadata(objectKey);
    results.cleanup = afterDelete === null;

    if (!results.cleanup) {
      throw new Error("Smoke-test object still exists after deletion.");
    }
  } catch (error) {
    if (objectKey) {
      await storage.deleteObject(objectKey).catch(() => undefined);
      results.cleanup = (await storage.getObjectMetadata(objectKey).catch(() => null)) === null;
    }

    throw error;
  } finally {
    console.log(JSON.stringify(results, null, 2));
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Storage smoke test failed.");
  process.exit(1);
});

async function safeResponseText(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return text.replace(/https?:\/\/\\S+/g, "[redacted-url]").slice(0, 600) || "no response body";
}
