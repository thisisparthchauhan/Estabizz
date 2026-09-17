from io import BytesIO

from docx import Document
from fastapi.testclient import TestClient
from reportlab.pdfgen import canvas

from app.core.config import get_settings
from app.main import app

SECRET = "test-service-secret"
HEADERS = {"x-estabizz-service-secret": SECRET}
FORM = {
    "resume_version_id": "11111111-1111-4111-8111-111111111111",
    "candidate_id": "22222222-2222-4222-8222-222222222222",
    "correlation_id": "33333333-3333-4333-8333-333333333333",
}


def test_resume_pdf_text_extraction(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)
    pdf_bytes = build_text_pdf("Synthetic Resume PDF Text")

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", pdf_bytes, "application/pdf")},
        headers=HEADERS,
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "text_extracted"
    assert "Synthetic Resume PDF Text" in body["text"]
    assert body["pageCount"] == 1
    assert body["requiresOcr"] is False
    assert body["characterCount"] > 0


def test_resume_docx_text_extraction(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)
    docx_bytes = build_docx("Synthetic Resume DOCX Text")

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={
            "file": (
                "resume.docx",
                docx_bytes,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ),
        },
        headers=HEADERS,
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "text_extracted"
    assert "Synthetic Resume DOCX Text" in body["text"]
    assert body["requiresOcr"] is False


def test_resume_extraction_missing_secret_fails(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", build_text_pdf("Hidden"), "application/pdf")},
    )

    assert response.status_code == 401


def test_resume_extraction_invalid_secret_fails(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", build_text_pdf("Hidden"), "application/pdf")},
        headers={"x-estabizz-service-secret": "wrong-secret"},
    )

    assert response.status_code == 401


def test_resume_extraction_unsupported_type(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.txt", b"plain text", "text/plain")},
        headers=HEADERS,
    )

    assert response.status_code == 200
    assert response.json()["status"] == "unsupported_type"


def test_resume_extraction_corrupt_document(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", b"not a pdf", "application/pdf")},
        headers=HEADERS,
    )

    assert response.status_code == 200
    assert response.json()["status"] == "corrupt_document"


def test_resume_extraction_empty_document(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", b"", "application/pdf")},
        headers=HEADERS,
    )

    assert response.status_code == 200
    assert response.json()["status"] == "empty_document"


def test_resume_extraction_scanned_pdf_requires_ocr(monkeypatch):
    configure_secret(monkeypatch)
    client = TestClient(app)

    response = client.post(
        "/internal/resumes/extract-text",
        data=FORM,
        files={"file": ("resume.pdf", build_blank_pdf(), "application/pdf")},
        headers=HEADERS,
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ocr_required"
    assert body["requiresOcr"] is True


def configure_secret(monkeypatch):
    monkeypatch.setenv("AI_SERVICE_SECRET", SECRET)
    monkeypatch.setenv("APP_ENV", "staging")
    get_settings.cache_clear()


def build_text_pdf(text: str) -> bytes:
    stream = BytesIO()
    pdf = canvas.Canvas(stream)
    pdf.drawString(72, 720, text)
    pdf.save()
    return stream.getvalue()


def build_blank_pdf() -> bytes:
    stream = BytesIO()
    pdf = canvas.Canvas(stream)
    pdf.showPage()
    pdf.save()
    return stream.getvalue()


def build_docx(text: str) -> bytes:
    stream = BytesIO()
    document = Document()
    document.add_paragraph(text)
    document.save(stream)
    return stream.getvalue()
