import { createHmac, timingSafeEqual } from "crypto";

import type { ResumeUploadTokenPayload } from "./types";
import { ResumeUploadValidationError } from "./types";

export function signResumeUploadToken(
  payload: ResumeUploadTokenPayload,
  secret: string,
): string {
  if (!secret) {
    throw new Error("Resume upload token secret is not configured.");
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createSignature(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyResumeUploadToken(
  token: string,
  secret: string,
  now = new Date(),
): ResumeUploadTokenPayload {
  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra) {
    throw new ResumeUploadValidationError("Upload reference is invalid.", [
      { field: "uploadRef", message: "Upload reference is invalid." },
    ]);
  }

  const expectedSignature = createSignature(encodedPayload, secret);
  if (!safeEqual(signature, expectedSignature)) {
    throw new ResumeUploadValidationError("Upload reference is invalid.", [
      { field: "uploadRef", message: "Upload reference is invalid." },
    ]);
  }

  let payload: ResumeUploadTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  } catch {
    throw new ResumeUploadValidationError("Upload reference is invalid.", [
      { field: "uploadRef", message: "Upload reference is invalid." },
    ]);
  }

  if (payload.uploadKind !== "resume" || Date.parse(payload.expiresAt) <= now.getTime()) {
    throw new ResumeUploadValidationError("Upload reference has expired.", [
      { field: "uploadRef", message: "Upload reference has expired." },
    ]);
  }

  return payload;
}

function createSignature(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
