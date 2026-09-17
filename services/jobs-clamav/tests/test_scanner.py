"""Tests for the ClamAV scanner wrapper.

clamd is stubbed: the property under test is the HTTP contract and the
fail-closed behaviour, not ClamAV's detection engine. The EICAR string is the
industry-standard harmless probe -- it is NOT malware -- and is assembled at
runtime so no scanner-tripping literal sits in source.
"""
from __future__ import annotations

import logging

import pytest
from fastapi.testclient import TestClient

from app import clamd_client
from app.config import get_settings
from app.main import app

SECRET = "synthetic-scanner-secret-for-tests"
EICAR = "X5O!P%@AP[4\\PZX54(P^)7CC)7}" + "$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*"
SYNTHETIC_PDF = b"%PDF-1.4\n% synthetic test document\n%%EOF\n"


@pytest.fixture(autouse=True)
def _settings(monkeypatch):
    monkeypatch.setenv("JOBS_MALWARE_SCANNER_SECRET", SECRET)
    monkeypatch.setenv("JOBS_DOCUMENT_MAX_UPLOAD_MB", "10")
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


@pytest.fixture
def client():
    return TestClient(app)


def _auth(secret: str = SECRET) -> dict[str, str]:
    return {"x-estabizz-scanner-secret": secret, "content-type": "application/octet-stream"}


# --- /health -----------------------------------------------------------------

def test_health_ok_only_when_clamd_ready_and_signatures_loaded(client, monkeypatch):
    monkeypatch.setattr(clamd_client, "ping", lambda *a, **k: True)
    monkeypatch.setattr(clamd_client, "version", lambda *a, **k: "ClamAV 1.4.1/27000/Tue Sep 9 2026")
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_is_503_when_clamd_unreachable(client, monkeypatch):
    monkeypatch.setattr(clamd_client, "ping", lambda *a, **k: False)
    response = client.get("/health")
    assert response.status_code == 503
    assert response.json()["status"] == "unavailable"


def test_health_is_503_while_signatures_are_still_loading(client, monkeypatch):
    monkeypatch.setattr(clamd_client, "ping", lambda *a, **k: True)
    monkeypatch.setattr(clamd_client, "version", lambda *a, **k: None)
    assert client.get("/health").status_code == 503


def test_health_discloses_no_diagnostics(client, monkeypatch):
    monkeypatch.setattr(clamd_client, "ping", lambda *a, **k: True)
    monkeypatch.setattr(clamd_client, "version", lambda *a, **k: "ClamAV 1.4.1/27000/Tue Sep 9 2026")
    body = client.get("/health").json()
    assert body == {"status": "ok"}, "health must not leak versions, paths or counts"


# --- authentication ----------------------------------------------------------

def test_scan_without_secret_is_401(client):
    response = client.post("/scan", content=SYNTHETIC_PDF,
                           headers={"content-type": "application/octet-stream"})
    assert response.status_code == 401


def test_scan_with_wrong_secret_is_401(client):
    response = client.post("/scan", content=SYNTHETIC_PDF, headers=_auth("not-the-secret"))
    assert response.status_code == 401


def test_scan_is_503_when_the_service_has_no_secret_configured(client, monkeypatch):
    monkeypatch.setenv("JOBS_MALWARE_SCANNER_SECRET", "")
    get_settings.cache_clear()
    response = client.post("/scan", content=SYNTHETIC_PDF, headers=_auth())
    assert response.status_code == 503, "an unconfigured scanner must refuse, not scan"


# --- verdicts ----------------------------------------------------------------

def test_clean_document_returns_the_contract_shape(client, monkeypatch):
    monkeypatch.setattr(clamd_client, "scan_stream",
                        lambda *a, **k: clamd_client.ScanResult(status="clean"))
    response = client.post("/scan", content=SYNTHETIC_PDF, headers=_auth())
    assert response.status_code == 200
    assert response.json() == {"status": "clean"}


def test_eicar_probe_returns_infected_with_a_signature(client, monkeypatch):
    monkeypatch.setattr(
        clamd_client, "scan_stream",
        lambda *a, **k: clamd_client.ScanResult(status="infected", signature="Eicar-Test-Signature"),
    )
    response = client.post("/scan", content=EICAR.encode(), headers=_auth())
    assert response.status_code == 200
    assert response.json() == {"status": "infected", "signature": "Eicar-Test-Signature"}


# --- fail-closed -------------------------------------------------------------

def test_clamd_unavailable_fails_closed(client, monkeypatch):
    def _unavailable(*a, **k):
        raise clamd_client.ClamdUnavailableError("clamd_unreachable")

    monkeypatch.setattr(clamd_client, "scan_stream", _unavailable)
    response = client.post("/scan", content=SYNTHETIC_PDF, headers=_auth())
    assert response.status_code == 503
    assert "clean" not in response.text


def test_malformed_clamd_reply_cannot_claim_clean():
    # The parser raises rather than returning a verdict it does not understand.
    for line in ["stream: something ERROR", "", "garbage", "stream:"]:
        with pytest.raises(clamd_client.ClamdUnavailableError):
            clamd_client._parse_response(line)


def test_parser_recognises_the_real_clamd_replies():
    assert clamd_client._parse_response("stream: OK").status == "clean"
    found = clamd_client._parse_response("stream: Eicar-Test-Signature FOUND")
    assert found.status == "infected"
    assert found.signature == "Eicar-Test-Signature"


def test_signature_name_is_length_bounded():
    result = clamd_client._parse_response("stream: " + ("A" * 500) + " FOUND")
    assert len(result.signature or "") <= 100


# --- limits ------------------------------------------------------------------

def test_oversized_body_is_rejected(client, monkeypatch):
    monkeypatch.setenv("JOBS_DOCUMENT_MAX_UPLOAD_MB", "1")
    get_settings.cache_clear()
    response = client.post("/scan", content=b"x" * (1024 * 1024 + 1), headers=_auth())
    assert response.status_code == 413


def test_empty_body_is_rejected(client):
    assert client.post("/scan", content=b"", headers=_auth()).status_code == 400


# --- log hygiene -------------------------------------------------------------

def test_logs_never_contain_document_content_or_the_secret(client, monkeypatch, caplog):
    def _unavailable(*a, **k):
        raise clamd_client.ClamdUnavailableError("clamd_unreachable")

    monkeypatch.setattr(clamd_client, "scan_stream", _unavailable)

    with caplog.at_level(logging.DEBUG):
        client.post("/scan", content=EICAR.encode(), headers=_auth())

    logged = caplog.text
    assert "EICAR" not in logged.upper(), "document content reached the logs"
    assert SECRET not in logged, "scanner secret reached the logs"
    assert ".pdf" not in logged.lower(), "a filename reached the logs"


def test_infected_verdict_logs_no_content(client, monkeypatch, caplog):
    monkeypatch.setattr(
        clamd_client, "scan_stream",
        lambda *a, **k: clamd_client.ScanResult(status="infected", signature="Eicar-Test-Signature"),
    )

    with caplog.at_level(logging.DEBUG):
        client.post("/scan", content=EICAR.encode(), headers=_auth())

    assert "EICAR" not in caplog.text.upper()
