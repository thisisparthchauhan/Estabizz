from pydantic import BaseModel


class PublicHealthResponse(BaseModel):
    """Unauthenticated liveness payload. Must not disclose configuration."""

    status: str
    service: str


class HealthResponse(PublicHealthResponse):
    """Authenticated payload. Adds configuration state for operators."""

    environment: str
    ai_provider: str
    ai_model_configured: bool
    database_configured: bool
