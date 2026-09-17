"""Wire-protocol tests against a stub clamd speaking real INSTREAM framing.

The endpoint tests stub `scan_stream` entirely, so nothing there exercises the
socket framing -- which is the part most likely to be subtly wrong. This starts
a real unix-socket server, decodes what the client actually sends, and replies
the way clamd does.
"""
from __future__ import annotations

import os
import socket
import struct
import tempfile
import threading

import pytest

from app import clamd_client

EICAR = "X5O!P%@AP[4\\PZX54(P^)7CC)7}" + "$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*"


class StubClamd:
    """Accepts one connection, decodes the INSTREAM frames, replies as clamd."""

    def __init__(self, reply: bytes, capture: list[bytes]):
        self.reply = reply
        self.capture = capture
        self.command: bytes | None = None
        self._dir = tempfile.mkdtemp()
        self.path = os.path.join(self._dir, "clamd.sock")
        self._server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self._server.bind(self.path)
        self._server.listen(1)
        self._thread = threading.Thread(target=self._serve, daemon=True)
        self._thread.start()

    def _serve(self) -> None:
        conn, _ = self._server.accept()
        try:
            with conn:
                # The command is NUL-terminated and the client may already have
                # written frame bytes behind it, so read to the delimiter and
                # keep the remainder rather than grabbing a fixed-size block.
                buffer = b""
                while b"\0" not in buffer:
                    chunk = conn.recv(64)
                    if not chunk:
                        return
                    buffer += chunk

                self.command, buffer = buffer.split(b"\0", 1)

                if self.command.startswith(b"zPING"):
                    conn.sendall(b"PONG\0")
                    return
                if self.command.startswith(b"zVERSION"):
                    conn.sendall(b"ClamAV 1.4.1/27000/Tue Sep 9 2026\0")
                    return

                # INSTREAM: 4-byte big-endian length, then that many bytes,
                # terminated by a zero-length chunk.
                while True:
                    buffer = self._fill(conn, buffer, 4)
                    if len(buffer) < 4:
                        break

                    (length,) = struct.unpack("!L", buffer[:4])
                    buffer = buffer[4:]

                    if length == 0:
                        break

                    buffer = self._fill(conn, buffer, length)
                    self.capture.append(buffer[:length])
                    buffer = buffer[length:]

                conn.sendall(self.reply)
        except (BrokenPipeError, ConnectionResetError, OSError):
            # The client hung up first; nothing for this stub to report.
            pass

    @staticmethod
    def _fill(conn: socket.socket, buffer: bytes, needed: int) -> bytes:
        """Reads until `buffer` holds at least `needed` bytes."""
        while len(buffer) < needed:
            chunk = conn.recv(65536)
            if not chunk:
                break
            buffer += chunk
        return buffer

    def close(self) -> None:
        self._server.close()


@pytest.fixture
def stub():
    created: list[StubClamd] = []

    def _make(reply: bytes):
        captured: list[bytes] = []
        server = StubClamd(reply, captured)
        created.append(server)
        return server, captured

    yield _make

    for server in created:
        server.close()


def _scan(path: str, payload: bytes):
    return clamd_client.scan_stream(
        (payload[i : i + 64] for i in range(0, len(payload), 64)),
        socket_path=path, host="", port=0, timeout=5.0,
    )


def test_instream_framing_delivers_the_exact_bytes(stub):
    server, captured = stub(b"stream: OK\0")
    payload = b"%PDF-1.4\n" + b"synthetic" * 100

    result = _scan(server.path, payload)

    assert result.status == "clean"
    assert server.command.startswith(b"zINSTREAM"), "wrong clamd command issued"
    assert b"".join(captured) == payload, "framing corrupted the document"


def test_eicar_probe_is_reported_infected_over_the_wire(stub):
    server, captured = stub(b"stream: Eicar-Test-Signature FOUND\0")

    result = _scan(server.path, EICAR.encode())

    assert result.status == "infected"
    assert result.signature == "Eicar-Test-Signature"
    assert b"".join(captured) == EICAR.encode()


def test_clamd_error_reply_raises_rather_than_returning_clean(stub):
    server, _ = stub(b"stream: INSTREAM size limit exceeded ERROR\0")

    with pytest.raises(clamd_client.ClamdUnavailableError):
        _scan(server.path, b"payload")


def test_truncated_reply_raises(stub):
    server, _ = stub(b"\0")

    with pytest.raises(clamd_client.ClamdUnavailableError):
        _scan(server.path, b"payload")


def test_unreachable_socket_raises(tmp_path):
    with pytest.raises(clamd_client.ClamdUnavailableError):
        clamd_client.scan_stream(
            [b"payload"], socket_path=str(tmp_path / "nope.sock"), host="", port=0, timeout=1.0,
        )


def test_ping_and_version_speak_the_real_protocol(stub):
    ping_server, _ = stub(b"")
    assert clamd_client.ping(ping_server.path, "", 0, 5.0) is True

    version_server, _ = stub(b"")
    reported = clamd_client.version(version_server.path, "", 0, 5.0)
    assert reported is not None and "/" in reported


def test_ping_is_false_when_nothing_is_listening(tmp_path):
    assert clamd_client.ping(str(tmp_path / "nope.sock"), "", 0, 1.0) is False


def test_large_payload_is_chunked_not_truncated(stub):
    server, captured = stub(b"stream: OK\0")
    payload = os.urandom(300_000)

    assert _scan(server.path, payload).status == "clean"
    assert b"".join(captured) == payload
    assert len(captured) > 1, "payload should have been sent in multiple frames"
