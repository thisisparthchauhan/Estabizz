"""Private ClamAV scanner service.

Speaks exactly the contract the application-side adapter expects
(lib/jobs/malwareScanning/scanners.ts):

    POST /scan
      headers : x-estabizz-scanner-secret, content-type: application/octet-stream
      body    : raw document bytes
      200     : {"status": "clean"} | {"status": "infected", "signature": "..."}
      non-2xx : anything else -- the adapter reads a non-2xx as `unavailable`
                and blocks, which is the behaviour we want on every failure.

FAIL-CLOSED: this service only ever emits 200 with "clean" when clamd has
actually inspected the bytes and said so. Every other path returns non-2xx.

It never logs document content, filenames, request bodies or the secret.
"""
from __future__ import annotations

import logging
from hmac import compare_digest

from fastapi import FastAPI, Header, HTTPException, Request, status
from fastapi.responses import JSONResponse

from app import clamd_client
from app.config import get_settings

logger = logging.getLogger("estabizz.clamav")

app = FastAPI(
    title="Estabizz ClamAV Scanner",
    version="1.0.0",
    # This is a private service; there is no reason to publish its schema.
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


@app.get("/health")
def health() -> JSONResponse:
    """Ready only when clamd answers AND has signatures loaded.

    Returning 200 while clamd is still loading its database would let traffic
    through to a scanner that cannot actually scan.
    """
    settings = get_settings()

    reachable = clamd_client.ping(
        settings.clamd_socket, settings.clamd_host, settings.clamd_port,
        settings.clamd_timeout_seconds,
    )

    if not reachable:
        return JSONResponse({"status": "unavailable"}, status_code=status.HTTP_503_SERVICE_UNAVAILABLE)

    # The VERSION reply carries the signature database version; its absence
    # means clamd is up but not yet usable.
    signature_version = clamd_client.version(
        settings.clamd_socket, settings.clamd_host, settings.clamd_port,
        settings.clamd_timeout_seconds,
    )

    if not signature_version or "/" not in signature_version:
        return JSONResponse({"status": "loading"}, status_code=status.HTTP_503_SERVICE_UNAVAILABLE)

    # Deliberately minimal: no version string, no paths, no diagnostics.
    return JSONResponse({"status": "ok"})


@app.post("/scan")
async def scan(
    request: Request,
    x_estabizz_scanner_secret: str | None = Header(default=None),
) -> JSONResponse:
    settings = get_settings()

    if not settings.scanner_secret:
        # Refuse to run unauthenticated rather than scanning for anyone.
        logger.error("scanner secret is not configured")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Scanner not configured.")

    # Constant-time comparison; identical response whether missing or wrong.
    if not x_estabizz_scanner_secret or not compare_digest(
        x_estabizz_scanner_secret, settings.scanner_secret
    ):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid scanner credentials.")

    body = await request.body()

    if len(body) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty request body.")

    if len(body) > settings.max_request_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Request body exceeds the configured limit.",
        )

    try:
        result = clamd_client.scan_stream(
            _chunks(body, clamd_client.CHUNK_SIZE),
            socket_path=settings.clamd_socket,
            host=settings.clamd_host,
            port=settings.clamd_port,
            timeout=settings.clamd_timeout_seconds,
        )
    except clamd_client.ClamdUnavailableError as exc:
        # Byte count only. Never the body, never a filename.
        logger.warning("scan failed: %s (%d bytes)", exc, len(body))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Scanner unavailable."
        ) from exc

    if result.status == "infected":
        logger.info("scan verdict: infected")
        return JSONResponse({"status": "infected", "signature": result.signature or "unknown"})

    if result.status == "clean":
        return JSONResponse({"status": "clean"})

    # Unreachable by construction -- scan_stream raises rather than returning
    # anything else -- but an unknown status must never become a 200.
    logger.warning("scan produced an unexpected status")
    raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Scanner unavailable.")


def _chunks(data: bytes, size: int):
    for offset in range(0, len(data), size):
        yield data[offset : offset + size]
