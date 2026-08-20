from fastapi import APIRouter, Depends

from app.core.config import get_settings
from app.core.security import require_service_secret
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return build_health_response()


@router.get(
    "/internal/health",
    response_model=HealthResponse,
    dependencies=[Depends(require_service_secret)],
)
def internal_health() -> HealthResponse:
    return build_health_response()


def build_health_response() -> HealthResponse:
    settings = get_settings()

    return HealthResponse(
        status="ok",
        service="estabizz-jobs-ai",
        environment=settings.app_env,
        ai_provider=settings.jobs_ai_provider,
        ai_model_configured=bool(settings.jobs_ai_model),
        database_configured=bool(settings.database_url),
    )
