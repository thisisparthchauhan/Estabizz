"""Configuration for the ClamAV scanner service. Values come from the
environment; nothing is ever logged."""
from __future__ import annotations

import os
from dataclasses import dataclass
from functools import lru_cache

DEFAULT_MAX_BYTES = 10 * 1024 * 1024
DEFAULT_TIMEOUT_SECONDS = 60.0


@dataclass(frozen=True)
class Settings:
    #: Shared secret. Same name and value as the application side.
    scanner_secret: str
    clamd_socket: str
    clamd_host: str
    clamd_port: int
    clamd_timeout_seconds: float
    #: Must match JOBS_DOCUMENT_MAX_UPLOAD_MB on the application side.
    max_request_bytes: int


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings(
        scanner_secret=os.getenv("JOBS_MALWARE_SCANNER_SECRET", "").strip(),
        clamd_socket=os.getenv("CLAMD_SOCKET", "/tmp/clamd.sock").strip(),
        clamd_host=os.getenv("CLAMD_HOST", "127.0.0.1").strip(),
        clamd_port=parse_int(os.getenv("CLAMD_PORT"), 3310),
        clamd_timeout_seconds=float(parse_int(os.getenv("CLAMD_TIMEOUT_SECONDS"), 60)),
        max_request_bytes=parse_int(os.getenv("JOBS_DOCUMENT_MAX_UPLOAD_MB"), 10) * 1024 * 1024,
    )


def parse_int(value: str | None, fallback: int) -> int:
    try:
        parsed = int(value or "")
    except ValueError:
        return fallback

    return parsed if parsed > 0 else fallback
