import os
from dataclasses import dataclass
from functools import lru_cache


@dataclass(frozen=True)
class Settings:
    app_env: str
    ai_service_secret: str
    database_url: str
    jobs_ai_provider: str
    jobs_ai_model: str
    openai_api_key: str
    max_resume_file_bytes: int
    #: Render-internal address of the private ClamAV service. Reachable only
    #: from inside Render's network, which is why this bridge exists at all.
    clamav_internal_url: str
    #: Shared secret for the private scanner. Distinct from AI_SERVICE_SECRET,
    #: which guards the bridge itself.
    malware_scanner_secret: str
    malware_scan_timeout_seconds: int
    # Ceiling for the pypdf / python-docx parse. Cheap work; a low ceiling here
    # only catches pathological documents.
    text_extraction_timeout_seconds: int
    # Ceiling for the LLM structured-extraction call. The Next.js caller allows
    # this plus network overhead -- see lib/jobs/ai/config.ts.
    extraction_timeout_seconds: int

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings(
        app_env=os.getenv("APP_ENV", "development").strip() or "development",
        ai_service_secret=os.getenv("AI_SERVICE_SECRET", "").strip(),
        database_url=os.getenv("DATABASE_URL", "").strip(),
        jobs_ai_provider=os.getenv("JOBS_AI_PROVIDER", "disabled").strip() or "disabled",
        jobs_ai_model=os.getenv("JOBS_AI_MODEL", "").strip(),
        openai_api_key=os.getenv("OPENAI_API_KEY", "").strip(),
        max_resume_file_bytes=parse_positive_int(
            os.getenv("JOBS_DOCUMENT_MAX_UPLOAD_MB"),
            10,
        )
        * 1024
        * 1024,
        clamav_internal_url=normalize_internal_url(os.getenv("CLAMAV_INTERNAL_URL")),
        malware_scanner_secret=os.getenv("JOBS_MALWARE_SCANNER_SECRET", "").strip(),
        malware_scan_timeout_seconds=parse_positive_int(
            os.getenv("JOBS_MALWARE_SCAN_TIMEOUT_SECONDS"),
            60,
        ),
        text_extraction_timeout_seconds=parse_positive_int(
            os.getenv("JOBS_AI_TEXT_EXTRACTION_TIMEOUT_SECONDS"),
            30,
        ),
        extraction_timeout_seconds=parse_positive_int(
            os.getenv("JOBS_AI_EXTRACTION_TIMEOUT_SECONDS"),
            60,
        ),
    )


def parse_positive_int(value: str | None, fallback: int) -> int:
    try:
        parsed = int(value or "")
    except ValueError:
        return fallback

    return parsed if parsed > 0 else fallback


def normalize_internal_url(value: str | None) -> str:
    """Accepts either a full URL or Render's `host:port` form.

    A Blueprint `fromService` reference with `property: hostport` yields
    "service-name:10000" with no scheme, so the scheme is added rather than
    making the deployer remember to.
    """
    raw = (value or "").strip().rstrip("/")

    if not raw:
        return ""

    if raw.startswith("http://") or raw.startswith("https://"):
        return raw

    return f"http://{raw}"
