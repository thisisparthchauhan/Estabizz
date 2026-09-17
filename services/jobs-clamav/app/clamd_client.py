"""Minimal clamd client speaking the INSTREAM protocol.

Streaming to clamd over a socket means the document NEVER touches disk in this
service -- there is no temporary file to secure, leak or forget to delete.

INSTREAM framing: send `zINSTREAM\\0`, then for each chunk a 4-byte big-endian
length followed by the bytes, then a zero-length chunk to terminate. clamd
answers with one NUL-terminated line.
"""
from __future__ import annotations

import socket
import struct
from dataclasses import dataclass
from typing import Iterable, Literal

ScanStatus = Literal["clean", "infected", "error"]

#: clamd rejects a chunk larger than its StreamMaxLength; stay well under.
CHUNK_SIZE = 64 * 1024


class ClamdUnavailableError(Exception):
    """clamd could not be reached, timed out, or answered unintelligibly."""


@dataclass(frozen=True)
class ScanResult:
    status: ScanStatus
    #: Virus signature NAME (e.g. "Eicar-Test-Signature"). Never file content.
    signature: str | None = None


def _connect(socket_path: str, host: str, port: int, timeout: float) -> socket.socket:
    if socket_path:
        sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        sock.connect(socket_path)
        return sock

    sock = socket.create_connection((host, port), timeout=timeout)
    sock.settimeout(timeout)
    return sock


def ping(socket_path: str, host: str, port: int, timeout: float) -> bool:
    """True when clamd answers PING with PONG."""
    try:
        with _connect(socket_path, host, port, timeout) as sock:
            sock.sendall(b"zPING\0")
            return sock.recv(64).startswith(b"PONG")
    except (OSError, socket.timeout):
        return False


def version(socket_path: str, host: str, port: int, timeout: float) -> str | None:
    """clamd VERSION string, which includes the signature database date.

    Used only to confirm signatures are loaded; never returned to callers.
    """
    try:
        with _connect(socket_path, host, port, timeout) as sock:
            sock.sendall(b"zVERSION\0")
            raw = sock.recv(256).rstrip(b"\0").decode("utf-8", "replace").strip()
            return raw or None
    except (OSError, socket.timeout):
        return None


def scan_stream(
    chunks: Iterable[bytes],
    *,
    socket_path: str,
    host: str,
    port: int,
    timeout: float,
) -> ScanResult:
    """Streams bytes to clamd and returns its verdict.

    Raises ClamdUnavailableError for anything that is not a definite verdict.
    A caller must never be able to read an error as "clean".
    """
    try:
        with _connect(socket_path, host, port, timeout) as sock:
            sock.sendall(b"zINSTREAM\0")

            for chunk in chunks:
                if not chunk:
                    continue
                sock.sendall(struct.pack("!L", len(chunk)) + chunk)

            sock.sendall(struct.pack("!L", 0))

            response = b""
            while b"\0" not in response:
                received = sock.recv(4096)
                if not received:
                    break
                response += received
    except (OSError, socket.timeout) as exc:
        raise ClamdUnavailableError("clamd_unreachable") from exc

    return _parse_response(response.split(b"\0", 1)[0].decode("utf-8", "replace").strip())


def _parse_response(line: str) -> ScanResult:
    # "stream: OK"
    if line.endswith("OK") and "FOUND" not in line:
        return ScanResult(status="clean")

    # "stream: Eicar-Test-Signature FOUND"
    if line.endswith("FOUND"):
        body = line.split(":", 1)[1].strip() if ":" in line else line
        signature = body[: -len("FOUND")].strip() or "unknown"
        return ScanResult(status="infected", signature=signature[:100])

    # "stream: <reason> ERROR", an empty reply, or anything unrecognised.
    raise ClamdUnavailableError("clamd_unrecognised_response")
