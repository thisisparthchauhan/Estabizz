import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local", quiet: true });

const serviceUrl = normalizeUrl(process.env.JOBS_AI_SERVICE_URL);
const serviceSecret = process.env.AI_SERVICE_SECRET?.trim() || "";
const appEnv = process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || "development";
const timeoutMs = Number(process.env.JOBS_AI_REQUEST_TIMEOUT_MS || 5000);

if (appEnv === "production") {
  throw new Error("AI service internal health check refused to run in production.");
}

if (!serviceUrl) {
  throw new Error("JOBS_AI_SERVICE_URL is required.");
}

if (!serviceSecret) {
  throw new Error("AI_SERVICE_SECRET is required.");
}

if (/(^|[-_.])prod(uction)?($|[-_.])/i.test(serviceUrl)) {
  throw new Error("AI service internal health check refused to call a production-looking URL.");
}

const valid = await requestInternalHealth(serviceSecret);
const invalid = await requestInternalHealth("invalid-service-secret");
const missing = await requestInternalHealth(null);

const result = {
  environment: appEnv,
  validSecret: valid.status === 200,
  validStatus: valid.status,
  invalidSecretRejected: invalid.status === 401 || invalid.status === 403,
  invalidStatus: invalid.status,
  missingSecretRejected: missing.status === 401 || missing.status === 403,
  missingStatus: missing.status,
};

console.log(JSON.stringify(result, null, 2));

if (!result.validSecret || !result.invalidSecretRejected || !result.missingSecretRejected) {
  process.exit(1);
}

async function requestInternalHealth(secret) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const headers = {
    accept: "application/json",
  };

  if (secret) {
    headers["x-estabizz-service-secret"] = secret;
  }

  try {
    const response = await fetch(`${serviceUrl}/internal/health`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    return { status: response.status };
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeUrl(value) {
  const serviceUrl = value?.trim().replace(/\/+$/, "");

  if (!serviceUrl) {
    return "";
  }

  return new URL(serviceUrl).toString().replace(/\/+$/, "");
}
