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
