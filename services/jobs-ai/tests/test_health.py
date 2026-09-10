from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import app, docs_enabled


def test_public_health_endpoint_discloses_no_configuration(monkeypatch):
    monkeypatch.setenv("APP_ENV", "staging")
    monkeypatch.setenv("JOBS_AI_PROVIDER", "openai")
    monkeypatch.setenv("JOBS_AI_MODEL", "gpt-5.6-luna")
    monkeypatch.setenv("DATABASE_URL", "postgres://synthetic/db")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    # The unauthenticated probe must never leak environment or provider state.
    assert response.json() == {
        "status": "ok",
        "service": "estabizz-jobs-ai",
    }

    get_settings.cache_clear()


def test_internal_health_reports_configuration_state(monkeypatch):
    monkeypatch.setenv("APP_ENV", "staging")
    monkeypatch.setenv("AI_SERVICE_SECRET", "test-service-secret")
    monkeypatch.setenv("JOBS_AI_PROVIDER", "disabled")
    monkeypatch.delenv("JOBS_AI_MODEL", raising=False)
    monkeypatch.delenv("DATABASE_URL", raising=False)
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get(
        "/internal/health",
        headers={"x-estabizz-service-secret": "test-service-secret"},
    )

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


def test_internal_health_without_authentication_fails(monkeypatch):
    monkeypatch.setenv("AI_SERVICE_SECRET", "test-service-secret")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get("/internal/health")

    assert response.status_code == 401

    get_settings.cache_clear()


def test_internal_health_with_bad_secret_fails(monkeypatch):
    monkeypatch.setenv("AI_SERVICE_SECRET", "test-service-secret")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get(
        "/internal/health",
        headers={"x-estabizz-service-secret": "wrong-secret"},
    )

    assert response.status_code == 401

    get_settings.cache_clear()


def test_internal_health_with_correct_secret_succeeds(monkeypatch):
    monkeypatch.setenv("APP_ENV", "staging")
    monkeypatch.setenv("AI_SERVICE_SECRET", "test-service-secret")
    monkeypatch.setenv("JOBS_AI_PROVIDER", "disabled")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.get(
        "/internal/health",
        headers={"x-estabizz-service-secret": "test-service-secret"},
    )

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "estabizz-jobs-ai"
    assert response.json()["environment"] == "staging"

    get_settings.cache_clear()


def test_docs_exposure_is_fail_closed():
    # Only a literal APP_ENV=development opts in. Anything else -- including an
    # unset or misspelled value on a deployed host -- keeps the schema hidden.
    assert docs_enabled("development") is True
    assert docs_enabled(" development ") is True
    assert docs_enabled(None) is False
    assert docs_enabled("") is False
    assert docs_enabled("staging") is False
    assert docs_enabled("production") is False
    assert docs_enabled("Development") is False


def test_redoc_is_never_exposed():
    client = TestClient(app)

    assert client.get("/redoc").status_code == 404
