from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Protocol


@dataclass(frozen=True)
class ProviderRequest:
    resume_text: str
    resume_version_id: str
    candidate_id: str
    correlation_id: str
    extraction_method: str | None
    page_count: int | None


@dataclass(frozen=True)
class ProviderResponse:
    provider: str
    model: str
    data: dict[str, Any]
    input_tokens: int | None = None
    output_tokens: int | None = None


class AIProvider(Protocol):
    async def extract_structured_resume(self, request: ProviderRequest) -> ProviderResponse:
        ...


class ProviderError(Exception):
    pass


class ProviderConfigError(ProviderError):
    pass


class ProviderTimeoutError(ProviderError):
    pass


class ProviderRateLimitError(ProviderError):
    pass


class ProviderInvalidOutputError(ProviderError):
    pass
