export const DEFAULT_LOGIN_RETURN_PATH = "/";

export function getSafeInternalReturnPath(
  value: string | null | undefined,
  fallback = DEFAULT_LOGIN_RETURN_PATH,
): string {
  const fallbackPath = isSafeInternalPath(fallback) ? fallback : DEFAULT_LOGIN_RETURN_PATH;

  if (!value) {
    return fallbackPath;
  }

  const trimmed = value.trim();
  if (!isSafeInternalPath(trimmed)) {
    return fallbackPath;
  }

  try {
    const parsed = new URL(trimmed, "https://estabizz.local");
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallbackPath;
  }
}

export function buildLoginHref(returnPath: string): string {
  const safePath = getSafeInternalReturnPath(returnPath);
  return `/login?redirect=${encodeURIComponent(safePath)}`;
}

export function buildSignupHref(returnPath: string): string {
  const safePath = getSafeInternalReturnPath(returnPath);
  return `/signup?redirect=${encodeURIComponent(safePath)}`;
}

function isSafeInternalPath(value: string): boolean {
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return false;
  }

  if (/[\u0000-\u001f\u007f]/.test(value)) {
    return false;
  }

  try {
    const parsed = new URL(value, "https://estabizz.local");
    return parsed.origin === "https://estabizz.local";
  } catch {
    return false;
  }
}
