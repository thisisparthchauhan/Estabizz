import os

from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.resumes import router as resumes_router


def docs_enabled(app_env: str | None) -> bool:
    """Interactive docs and the OpenAPI schema describe every internal endpoint.

    The deployed service is reachable from the public internet, so this is
    fail-closed: only a literal APP_ENV=development opts in. An unset or
    misspelled APP_ENV keeps the schema hidden rather than exposing it.
    """
    return (app_env or "").strip() == "development"


_docs_enabled = docs_enabled(os.getenv("APP_ENV"))

app = FastAPI(
    title="Estabizz Jobs AI Service",
    version="0.1.0",
    docs_url="/docs" if _docs_enabled else None,
    redoc_url=None,
    openapi_url="/openapi.json" if _docs_enabled else None,
)

app.include_router(health_router)
app.include_router(resumes_router)
