from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import app


def test_health_endpoint_returns_service_status(monkeypatch):
    monkeypatch.setenv("APP_ENV", "staging")
    monkeypatch.setenv("JOBS_AI_PROVIDER", "disabled")
    monkeypatch.delenv("JOBS_AI_MODEL", raising=False)
    monkeypatch.delenv("DATABASE_URL", raising=False)
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "estabizz-jobs-ai",
        "environment": "staging",
        "ai_provider": "disabled",
        "ai_model_configured": False,
        "database_configured": False,
    }

    get_settings.cache_clear()
