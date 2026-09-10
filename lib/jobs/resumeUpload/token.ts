import { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes } from "crypto";

import type { ResumeUploadTokenPayload } from "./types";
import { ResumeUploadValidationError } from "./types";

/**
 * The upload reference travels through the browser between upload-intent and
 * confirm. It is AUTHENTICATED ENCRYPTION, not a signed plaintext blob: the
 * payload names the private storage object key, and a merely signed token would
 * hand that key to the client in readable form.
 *
 * Format: v2.<base64url iv>.<base64url ciphertext>.<base64url auth tag>
 *
 * AES-256-GCM authenticates as well as encrypts, so a tampered reference fails
 * to decrypt rather than needing a separate signature check.
 */
const TOKEN_VERSION = "v2";
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const HKDF_INFO = "estabizz-jobs-resume-upload-reference-v2";

export function signResumeUploadToken(
  payload: ResumeUploadTokenPayload,
  secret: string,
): string {
  if (!secret) {
    throw new Error("Resume upload token secret is not configured.");
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, deriveKey(secret), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  return [
    TOKEN_VERSION,
    iv.toString("base64url"),
    ciphertext.toString("base64url"),
    cipher.getAuthTag().toString("base64url"),
  ].join(".");
}

export function verifyResumeUploadToken(
  token: string,
  secret: string,
  now = new Date(),
): ResumeUploadTokenPayload {
  if (!secret) {
    throw new Error("Resume upload token secret is not configured.");
  }

  const parts = token.split(".");

  if (parts.length !== 4 || parts[0] !== TOKEN_VERSION) {
    throw invalidReference();
  }

  const [, encodedIv, encodedCiphertext, encodedAuthTag] = parts;
  let payload: ResumeUploadTokenPayload;

  try {
    const decipher = createDecipheriv(
      ALGORITHM,
      deriveKey(secret),
      Buffer.from(encodedIv, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(encodedAuthTag, "base64url"));

    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(encodedCiphertext, "base64url")),
      decipher.final(),
    ]).toString("utf8");

    payload = JSON.parse(plaintext);
  } catch {
    // Covers a wrong key, a tampered ciphertext, a bad auth tag and malformed
    // JSON alike. They are all "this reference is not usable".
    throw invalidReference();
  }

  if (payload.uploadKind !== "resume") {
    throw invalidReference();
  }

  if (!(Date.parse(payload.expiresAt) > now.getTime())) {
    throw new ResumeUploadValidationError("Upload reference has expired.", [
      { field: "uploadRef", message: "Upload reference has expired." },
    ]);
  }

  return payload;
}

/**
 * The configured secret is a shared application secret (and may fall back to
 * JWT_SECRET), so it is stretched into a purpose-bound key rather than used
 * directly. A reference key must not be usable anywhere else.
 */
function deriveKey(secret: string): Buffer {
  return Buffer.from(
    hkdfSync(
      "sha256",
      Buffer.from(secret, "utf8"),
      createHmac("sha256", HKDF_INFO).update("salt").digest(),
      Buffer.from(HKDF_INFO, "utf8"),
      KEY_LENGTH,
    ),
  );
}

function invalidReference(): ResumeUploadValidationError {
  return new ResumeUploadValidationError("Upload reference is invalid.", [
    { field: "uploadRef", message: "Upload reference is invalid." },
  ]);
}
