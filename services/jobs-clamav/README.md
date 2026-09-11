# Estabizz Jobs — Private ClamAV Scanner

Real antivirus scanning for candidate documents. This is the service the
application-side adapter (`lib/jobs/malwareScanning/`) talks to.

**Structural validation is not antivirus.** `lib/jobs/fileSecurity` proves a
file *is* a PDF or DOCX; it says nothing about whether that PDF is malicious.
This service is the separate, real scan.

## Why self-hosted

Commercial scanning APIs would mean sending private candidate documents to a
third party. ClamAV is open source and runs inside our own infrastructure, so a
document never leaves it.

## Design

- **Nothing touches disk.** Request bytes are streamed straight to clamd over
  the INSTREAM protocol. There is no temporary file to secure, leak, or forget
  to delete.
- **Fail-closed.** A 200 with `{"status":"clean"}` is only ever returned when
  clamd actually inspected the bytes and said so. Every other outcome — clamd
  unreachable, timed out, or answering something unrecognised — is a non-2xx,
  which the adapter reads as `unavailable` and blocks on.
- **Private Service.** Not reachable from the public internet.

## Endpoints

### `GET /health`

`200 {"status":"ok"}` only when clamd is reachable **and** has loaded its
signature database. While clamd is still starting or updating signatures it
returns `503`, so the platform will not route traffic to a scanner that cannot
yet scan.

Deliberately minimal — no versions, paths or counts.

| Response | Meaning |
|---|---|
| `200 {"status":"ok"}` | Ready |
| `503 {"status":"unavailable"}` | clamd not reachable |
| `503 {"status":"loading"}` | clamd up, signatures not loaded |

### `POST /scan`

```
headers : x-estabizz-scanner-secret: <shared secret>
          content-type: application/octet-stream
body    : raw document bytes (max 10 MB)
```

| Response | Meaning |
|---|---|
| `200 {"status":"clean"}` | clamd inspected the bytes and found nothing |
| `200 {"status":"infected","signature":"Eicar-Test-Signature"}` | Detection; `signature` is a signature NAME, never file content |
| `401` | Missing or wrong secret (constant-time comparison, identical response either way) |
| `400` | Empty body |
| `413` | Body over the configured limit |
| `503` | clamd unavailable, timed out, or unintelligible — **never** interpreted as clean |

## Environment variables

Names only. Set values in the Render dashboard; never commit them.

| Variable | Required | Notes |
|---|---|---|
| `JOBS_MALWARE_SCANNER_SECRET` | **Yes** | Shared secret. Must be byte-identical to the value on the Vercel side. Without it the service returns 503 rather than scanning unauthenticated. |
| `JOBS_DOCUMENT_MAX_UPLOAD_MB` | No (default 10) | Must match the application side |
| `CLAMD_SOCKET` | No (default `/tmp/clamd.sock`) | Set empty to use TCP instead |
| `CLAMD_HOST` / `CLAMD_PORT` | No | TCP fallback, defaults `127.0.0.1:3310` |
| `CLAMD_TIMEOUT_SECONDS` | No (default 60) | Per-scan ceiling |
| `PORT` | Set by Render | |

## How the application reaches this service

This is a **Private Service with no public URL**, so Vercel cannot call it
directly. Scans are routed through `jobs-ai`, which is already on Render's
private network and already authenticated:

```
Vercel worker
  -> jobs-ai  POST /internal/resumes/scan-malware   (x-estabizz-service-secret)
  -> THIS service  POST /scan                       (x-estabizz-scanner-secret)
  -> verdict returned; only "clean" allows AI extraction to proceed
```

Vercel therefore never needs this service's private hostname, and never holds
its secret.

| Side | Variables |
|---|---|
| **Vercel** | `JOBS_MALWARE_SCANNER_PROVIDER=clamav`, plus the existing `JOBS_AI_SERVICE_URL` and `AI_SERVICE_SECRET` |
| **jobs-ai (Render)** | `CLAMAV_INTERNAL_URL` (set from a Blueprint `fromService` reference), `JOBS_MALWARE_SCANNER_SECRET` |
| **this service** | `JOBS_MALWARE_SCANNER_SECRET` (same value as jobs-ai holds) |

## Render deployment

| Setting | Value |
|---|---|
| Service type | **Private Service** (`pserv`) — not publicly reachable |
| Name | `estabizz-clamav-staging` |
| Runtime | Docker |
| Region | Singapore |
| Root directory | `services/jobs-clamav` |
| Dockerfile path | `./Dockerfile` |
| Instance | **≥1 GB RAM** — clamd loads the full signature database into memory and is killed below that. This is a floor, not a preference. |
| Health check | `/health` |

Deploy from `render.yaml`, then set `JOBS_MALWARE_SCANNER_SECRET` in the
dashboard. Take the service's internal URL and set it as
`JOBS_MALWARE_SCANNER_URL` on the Vercel side.

First boot downloads the signature database, so `/health` reports `503` for a
few minutes. That is expected and correct.

## Tests

```bash
pip install -r requirements.txt
pytest
```

25 tests: the HTTP contract with clamd stubbed, plus wire-protocol tests against
a stub clamd that speaks real INSTREAM framing.

Detection tests use the **EICAR test string** — the industry-standard harmless
probe that antivirus engines flag by agreement. It is not malware, and no real
malicious sample is ever used.

Validated against a real clamd with a real signature database: EICAR detected
as `Eicar-Test-Signature`, clean documents reported clean, and the TypeScript
adapter driving this service end to end.
