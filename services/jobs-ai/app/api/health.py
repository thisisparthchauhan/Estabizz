from fastapi import APIRouter, Depends

from app.core.config import get_settings
from app.core.security import require_service_secret
from app.schemas.health import HealthResponse, PublicHealthResponse

router = APIRouter()


@router.get("/health", response_model=PublicHealthResponse)
def health() -> PublicHealthResponse:
    """Liveness probe for the platform load balancer.

    Deliberately unauthenticated and deliberately free of configuration
    details: the deployed service answers this to anyone on the internet.
    """
    return PublicHealthResponse(status="ok", service="estabizz-jobs-ai")


@router.get(
    "/internal/health",
    response_model=HealthResponse,
    dependencies=[Depends(require_service_secret)],
)
def internal_health() -> HealthResponse:
    settings = get_settings()

    return HealthResponse(
        status="ok",
        service="estabizz-jobs-ai",
        environment=settings.app_env,
        ai_provider=settings.jobs_ai_provider,
        ai_model_configured=bool(settings.jobs_ai_model),
        database_configured=bool(settings.database_url),
    )
