from app.core.config import Settings, get_settings
from app.services.ai_providers.openai_provider import OpenAIProvider
from app.services.ai_providers.types import AIProvider, ProviderConfigError


def get_ai_provider(settings: Settings | None = None) -> AIProvider:
    resolved_settings = settings or get_settings()

    if resolved_settings.jobs_ai_provider == "openai":
        return OpenAIProvider(resolved_settings)

    raise ProviderConfigError("Structured resume extraction provider is not configured.")
