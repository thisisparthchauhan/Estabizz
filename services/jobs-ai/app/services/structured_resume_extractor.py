from pydantic import ValidationError

from app.core.config import get_settings
from app.schemas.structured_resume import (
    ProposedResumeStructuredExtraction,
    ProviderUsageMetadata,
    ResumeStructuredExtractionRequest,
    ResumeStructuredExtractionResponse,
    StructuredExtractionStatus,
)
from app.services.ai_providers import (
    ProviderConfigError,
    ProviderError,
    ProviderInvalidOutputError,
    ProviderRateLimitError,
    ProviderRequest,
    ProviderTimeoutError,
    get_ai_provider,
)
from app.services.sensitive_data import sanitize_processing_message


async def extract_structured_resume(
    request: ResumeStructuredExtractionRequest,
) -> ResumeStructuredExtractionResponse:
    settings = get_settings()

    try:
        provider = get_ai_provider(settings)
        provider_response = await provider.extract_structured_resume(
            ProviderRequest(
                resume_text=request.extractedText,
                resume_version_id=request.resumeVersionId,
                candidate_id=request.candidateId,
                correlation_id=request.correlationId,
                extraction_method=request.extractionMethod,
                page_count=request.pageCount,
            ),
        )
        data = ProposedResumeStructuredExtraction.model_validate(provider_response.data)

        return ResumeStructuredExtractionResponse(
            status="structured_extracted",
            provider=provider_response.provider,
            model=provider_response.model,
            data=data,
            usage=ProviderUsageMetadata(
                inputTokens=provider_response.input_tokens,
                outputTokens=provider_response.output_tokens,
            ),
        )
    except ProviderConfigError as exc:
        return safe_failure("provider_not_configured", exc)
    except ProviderTimeoutError as exc:
        return safe_failure("provider_timeout", exc)
    except ProviderRateLimitError as exc:
        return safe_failure("provider_rate_limited", exc)
    except ProviderInvalidOutputError as exc:
        return safe_failure("invalid_provider_output", exc)
    except ValidationError:
        return safe_failure(
            "invalid_provider_output",
            ValueError("Provider response failed structured schema validation."),
        )
    except ProviderError as exc:
        return safe_failure("provider_error", exc)


def safe_failure(
    status: StructuredExtractionStatus,
    error: Exception,
) -> ResumeStructuredExtractionResponse:
    return ResumeStructuredExtractionResponse(
        status=status,
        data=None,
        warnings=[sanitize_processing_message(safe_failure_message(status, error))],
    )


def safe_failure_message(status: StructuredExtractionStatus, error: Exception) -> str:
    if status == "provider_not_configured":
        return "Structured resume extraction provider is not configured."

    if status == "invalid_provider_output":
        return "Provider response failed structured schema validation."

    if status == "provider_timeout":
        return "Structured resume extraction provider timed out."

    if status == "provider_rate_limited":
        return "Structured resume extraction provider was rate limited."

    return "Structured resume extraction provider failed."
