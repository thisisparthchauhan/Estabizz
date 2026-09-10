import asyncio

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.core.config import get_settings
from app.core.security import require_service_secret
from app.schemas.resume_extraction import ResumeTextExtractionResponse
from app.schemas.structured_resume import (
    ResumeStructuredExtractionRequest,
    ResumeStructuredExtractionResponse,
)
from app.services.document_text_extractor import extract_document_text
from app.services.structured_resume_extractor import extract_structured_resume

router = APIRouter(prefix="/internal/resumes", dependencies=[Depends(require_service_secret)])


@router.post("/extract-text", response_model=ResumeTextExtractionResponse)
async def extract_resume_text(
    resume_version_id: str = Form(...),
    candidate_id: str = Form(...),
    correlation_id: str = Form(...),
    file: UploadFile = File(...),
) -> ResumeTextExtractionResponse:
    settings = get_settings()
    content = await file.read(settings.max_resume_file_bytes + 1)
    detected_mime_type = file.content_type or "application/octet-stream"

    # Identifiers are accepted for traceability, but no candidate data is logged.
    _ = (resume_version_id, candidate_id, correlation_id)

    if len(content) > settings.max_resume_file_bytes:
        return ResumeTextExtractionResponse(
            status="too_large",
            text="",
            pageCount=None,
            detectedMimeType=detected_mime_type,
            characterCount=0,
            extractionMethod="none",
            warnings=["Resume exceeds the configured file-size limit."],
            requiresOcr=False,
        )

    try:
        return await asyncio.wait_for(
            asyncio.to_thread(extract_document_text, content, detected_mime_type),
            timeout=settings.text_extraction_timeout_seconds,
        )
    except TimeoutError:
        return ResumeTextExtractionResponse(
            status="timeout",
            text="",
            pageCount=None,
            detectedMimeType=detected_mime_type,
            characterCount=0,
            extractionMethod="none",
            warnings=["Resume text extraction timed out."],
            requiresOcr=False,
        )


@router.post("/structured-extraction", response_model=ResumeStructuredExtractionResponse)
async def structured_resume_extraction(
    request: ResumeStructuredExtractionRequest,
) -> ResumeStructuredExtractionResponse:
    return await extract_structured_resume(request)
