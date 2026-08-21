from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path
from typing import Any

SERVICE_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = SERVICE_ROOT.parents[1]

sys.path.insert(0, str(SERVICE_ROOT))

from app.core.config import get_settings
from app.schemas.structured_resume import (
    ProposedResumeStructuredExtraction,
    ResumeStructuredExtractionRequest,
)
from app.services.structured_resume_extractor import extract_structured_resume

SYNTHETIC_RESUME_PATH = SERVICE_ROOT / "fixtures" / "synthetic_aarav_mehta_resume.txt"
SYNTHETIC_RESUME_VERSION_ID = "11111111-1111-4111-8111-111111111111"
SYNTHETIC_CANDIDATE_ID = "22222222-2222-4222-8222-222222222222"
SYNTHETIC_CORRELATION_ID = "33333333-3333-4333-8333-333333333333"
GPT_5_6_LUNA_INPUT_USD_PER_MILLION_TOKENS = 0.20
GPT_5_6_LUNA_OUTPUT_USD_PER_MILLION_TOKENS = 1.20


def main() -> None:
    load_local_env_files()
    settings = get_settings()
    preflight(settings)

    response = asyncio.run(
        extract_structured_resume(
            ResumeStructuredExtractionRequest(
                resumeVersionId=SYNTHETIC_RESUME_VERSION_ID,
                candidateId=SYNTHETIC_CANDIDATE_ID,
                correlationId=SYNTHETIC_CORRELATION_ID,
                extractedText=SYNTHETIC_RESUME_PATH.read_text(encoding="utf-8"),
                extractionMethod="synthetic_text_fixture",
                pageCount=None,
            ),
        ),
    )

    if response.status != "structured_extracted" or response.data is None:
        raise SystemExit(f"Structured extraction failed safely with status: {response.status}")

    checks = run_acceptance_checks(response.data)

    print("Estabizz Jobs synthetic structured-resume OpenAI smoke test")
    print(f"Environment: {settings.app_env}")
    print(f"Provider: {response.provider}")
    print(f"Model: {response.model}")
    print("Acceptance checks:")

    for label, passed in checks:
        print(f"- {label}: {'PASS' if passed else 'FAIL'}")

    if response.usage:
        input_tokens = response.usage.inputTokens
        output_tokens = response.usage.outputTokens
        total_tokens = (
            input_tokens + output_tokens
            if input_tokens is not None and output_tokens is not None
            else None
        )
        print("Usage:")
        print(f"- inputTokens: {input_tokens if input_tokens is not None else 'unavailable'}")
        print(f"- outputTokens: {output_tokens if output_tokens is not None else 'unavailable'}")
        print(f"- totalTokens: {total_tokens if total_tokens is not None else 'unavailable'}")
        estimated_cost = estimate_gpt_5_6_luna_cost(input_tokens, output_tokens)
        print(f"- estimatedCostUsd: {format_cost(estimated_cost)}")

    print("Sanitized synthetic result:")
    print(f"- name: {field_value(response.data.identity.candidateName)}")
    print(f"- location: {field_value(response.data.contact.location)}")
    print(f"- current designation: {field_value(response.data.professional.currentDesignation)}")
    print(f"- current employer: {field_value(response.data.professional.currentEmployer)}")
    print(f"- total experience: {field_value(response.data.professional.totalExperienceYears)}")

    if not all(passed for _label, passed in checks):
        raise SystemExit("One or more acceptance checks failed.")


def preflight(settings: Any) -> None:
    if settings.is_production or settings.app_env.lower() in {"prod", "production"}:
        raise SystemExit("Refusing to run structured resume smoke test in production.")

    if settings.jobs_ai_provider != "openai":
        raise SystemExit("JOBS_AI_PROVIDER must be openai for this smoke test.")

    if not settings.jobs_ai_model:
        raise SystemExit("JOBS_AI_MODEL is required for this smoke test.")

    if not settings.openai_api_key:
        raise SystemExit("OPENAI_API_KEY is required for this smoke test.")

    if not SYNTHETIC_RESUME_PATH.exists():
        raise SystemExit("Synthetic resume fixture is missing.")


def run_acceptance_checks(data: ProposedResumeStructuredExtraction) -> list[tuple[str, bool]]:
    domain = data.regulatoryFinancialDomain
    skills = collect_skill_names(data)
    education_values = collect_values(data.education)
    certification_values = collect_values(data.other.certifications)
    language_values = [str(field.value).lower() for field in data.other.languages if field.value]

    return [
        ("name extracted correctly", contains(field_value(data.identity.candidateName), "Aarav", "Mehta")),
        ("Mumbai location extracted", contains(field_value(data.contact.location), "Mumbai")),
        (
            "total experience approximately 5 years",
            numeric_between(field_value(data.professional.totalExperienceYears), 4.5, 5.5),
        ),
        (
            "current employer extracted",
            contains(field_value(data.professional.currentEmployer), "FinNova"),
        ),
        (
            "current designation extracted",
            contains(field_value(data.professional.currentDesignation), "Compliance", "Manager"),
        ),
        (
            "previous employer extracted",
            has_employment_history_match(data, employer="Alpha Credit Solutions Private Limited"),
        ),
        (
            "previous role extracted",
            has_employment_history_match(
                data,
                employer="Alpha Credit Solutions Private Limited",
                designation="Compliance Analyst",
            ),
        ),
        ("RBI domain identified", truthy_field(domain.RBI)),
        ("NBFC domain identified", truthy_field(domain.NBFC)),
        ("Fintech domain identified", truthy_field(domain.Fintech)),
        ("Compliance domain identified", truthy_field(domain.Compliance)),
        ("Risk domain identified", truthy_field(domain.Risk)),
        ("skills extracted", all(skill in skills for skill in ["kyc", "aml", "excel"])),
        ("education extracted", any("b.com" in value or "commerce" in value for value in education_values)),
        ("certification extracted", any("aml" in value for value in certification_values)),
        ("English language extracted", "english" in language_values),
        ("Hindi language extracted", "hindi" in language_values),
        ("unsupported fields remain empty", unsupported_fields_empty(data)),
        ("prompt injection ignored", not contains_any_value(data, ["best candidate"])),
        ("sensitive attributes not inferred", sensitive_attributes_absent(data)),
        ("review status remains ai_proposed", review_statuses_are_proposed(data.model_dump())),
    ]


def load_local_env_files() -> None:
    for env_path in [
        REPO_ROOT / ".env.local",
        REPO_ROOT / ".env",
        SERVICE_ROOT / ".env.local",
        SERVICE_ROOT / ".env",
    ]:
        if env_path.exists():
            load_env_file(env_path)

    get_settings.cache_clear()


def load_env_file(path: Path) -> None:
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()

        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")

        if key and key not in os.environ:
            os.environ[key] = value


def field_value(field: Any) -> Any:
    return getattr(field, "value", None) if field is not None else None


def contains(value: Any, *needles: str) -> bool:
    normalized = str(value or "").lower()
    return all(needle.lower() in normalized for needle in needles)


def numeric_between(value: Any, minimum: float, maximum: float) -> bool:
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return False

    return minimum <= parsed <= maximum


def truthy_field(field: Any) -> bool:
    return field_value(field) is True


def has_employment_history_match(
    data: ProposedResumeStructuredExtraction,
    *,
    employer: str,
    designation: str | None = None,
) -> bool:
    current_employer = str(field_value(data.professional.currentEmployer) or "").lower()
    target_employer = employer.lower()

    for item in data.professional.employmentHistory:
        item_employer = str(field_value(item.employer) or "").lower()
        item_designation = str(field_value(item.designation) or "").lower()

        if target_employer not in item_employer:
            continue

        if target_employer in current_employer:
            continue

        if designation and designation.lower() not in item_designation:
            continue

        return True

    return False


def collect_skill_names(data: ProposedResumeStructuredExtraction) -> set[str]:
    values: set[str] = set()

    for bucket in [data.skills.skills, data.skills.tools, data.skills.technologies]:
        for item in bucket:
            value = field_value(item.name)
            if value:
                values.add(str(value).lower())

    return values


def collect_values(value: Any) -> list[str]:
    collected: list[str] = []

    if isinstance(value, list):
        for item in value:
            collected.extend(collect_values(item))
    elif hasattr(value, "model_dump"):
        collected.extend(collect_values(value.model_dump()))
    elif isinstance(value, dict):
        if "value" in value and value["value"] is not None:
            collected.append(str(value["value"]).lower())
        else:
            for child in value.values():
                collected.extend(collect_values(child))

    return collected


def unsupported_fields_empty(data: ProposedResumeStructuredExtraction) -> bool:
    return all(
        field is None
        for field in [
            data.contact.email,
            data.contact.mobile,
            data.other.noticePeriod,
            data.other.currentCompensation,
            data.other.expectedCompensation,
        ]
    )


def contains_any_value(data: ProposedResumeStructuredExtraction, banned_values: list[str]) -> bool:
    values = collect_values(data)
    return any(banned in value for banned in banned_values for value in values)


def sensitive_attributes_absent(data: ProposedResumeStructuredExtraction) -> bool:
    serialized = data.model_dump()
    sensitive_keys = {
        "age",
        "religion",
        "caste",
        "ethnicity",
        "politicalAffiliation",
        "maritalStatus",
        "disability",
        "sexualOrientation",
    }
    return not contains_key(serialized, sensitive_keys)


def contains_key(value: Any, target_keys: set[str]) -> bool:
    if isinstance(value, dict):
        return any(key in target_keys or contains_key(child, target_keys) for key, child in value.items())

    if isinstance(value, list):
        return any(contains_key(item, target_keys) for item in value)

    return False


def review_statuses_are_proposed(value: Any) -> bool:
    if isinstance(value, dict):
        if value.get("reviewStatus") not in {None, "ai_proposed"}:
            return False

        return all(review_statuses_are_proposed(child) for child in value.values())

    if isinstance(value, list):
        return all(review_statuses_are_proposed(item) for item in value)

    return True


def estimate_gpt_5_6_luna_cost(input_tokens: int | None, output_tokens: int | None) -> float | None:
    if input_tokens is None or output_tokens is None:
        return None

    return (
        (input_tokens / 1_000_000) * GPT_5_6_LUNA_INPUT_USD_PER_MILLION_TOKENS
        + (output_tokens / 1_000_000) * GPT_5_6_LUNA_OUTPUT_USD_PER_MILLION_TOKENS
    )


def format_cost(value: float | None) -> str:
    return f"${value:.6f}" if value is not None else "unavailable"


if __name__ == "__main__":
    main()
