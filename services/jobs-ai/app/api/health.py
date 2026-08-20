from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    settings = get_settings()

    return HealthResponse(
        status="ok",
        service="estabizz-jobs-ai",
        environment=settings.app_env,
        ai_provider=settings.jobs_ai_provider,
        ai_model_configured=bool(settings.jobs_ai_model),
        database_configured=bool(settings.database_url),
    )
