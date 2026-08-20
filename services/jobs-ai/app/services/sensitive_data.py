import re

REDACTED = "[redacted]"


def sanitize_processing_message(message: str, max_length: int = 500) -> str:
    return re.sub(r"\s+", " ", redact_sensitive_text(message)).strip()[:max_length]


def redact_sensitive_text(value: str) -> str:
    redacted = re.sub(
        r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b",
        REDACTED,
        value,
        flags=re.IGNORECASE,
    )
    redacted = re.sub(r"\b(?:\+?\d[\s().-]?){8,}\d\b", REDACTED, redacted)
    redacted = re.sub(r"\bhttps?://\S+", REDACTED, redacted, flags=re.IGNORECASE)
    redacted = re.sub(
        r"\b(?:Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+",
        REDACTED,
        redacted,
        flags=re.IGNORECASE,
    )
    redacted = re.sub(r"\b[A-Za-z0-9+/]{80,}={0,2}\b", REDACTED, redacted)
    return redacted
