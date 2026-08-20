from fastapi import Header, HTTPException, status

from app.core.config import get_settings


def require_service_secret(x_estabizz_ai_secret: str | None = Header(default=None)) -> None:
    settings = get_settings()

    if not settings.ai_service_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service authentication is not configured.",
        )

    if x_estabizz_ai_secret != settings.ai_service_secret:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid AI service credentials.",
        )
