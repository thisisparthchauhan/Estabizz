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
    )
