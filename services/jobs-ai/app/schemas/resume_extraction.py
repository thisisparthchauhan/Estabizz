from pydantic import BaseModel


class ResumeTextExtractionResponse(BaseModel):
    status: str
    text: str
    pageCount: int | None = None
    detectedMimeType: str
    characterCount: int
    extractionMethod: str
    warnings: list[str]
    requiresOcr: bool
