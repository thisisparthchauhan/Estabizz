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

## Deployment status

**Hosting is DEFERRED, not failed.** Render Private Services have no free tier —
every `pserv` at every size requires a payment method, and none is available
yet. The service itself is finished and tested; only the host is outstanding.
See [`docs/jobs/28-PHASE6.3-DEPLOYMENT-CONTINGENCY.md`](../../docs/jobs/28-PHASE6.3-DEPLOYMENT-CONTINGENCY.md).

The `pserv` block in `render.yaml` is disabled in place with a `#|` marker on
each line rather than deleted. Strip the marker to restore it verbatim:

```bash
sed -i '' 's/^#|//' render.yaml
```

Until a scanner is hosted, **production resume processing stays blocked** —
`resolveRequired` forces `required = true` in production and no environment
variable can override it. That is the intended state, not a regression.

## Deployment requirements (any host)

Nothing here is Render-specific. The same container runs anywhere Docker does.

| Requirement | Value | Why |
|---|---|---|
| **Memory** | **≥1 GB, 2 GB comfortable** | clamd loads the whole signature database into memory and is OOM-killed below the floor. A hard requirement, not a tuning preference. |
| Disk | ~1 GB free | Signature database plus room for a freshclam update to stage. |
| CPU | 1 vCPU | Scanning a 10 MB document is well under a second once signatures are resident. |
| Container port | `10000` (override with `PORT`) | The wrapper binds `0.0.0.0:$PORT` inside the container. |
| **Architecture** | **`amd64` only** | The pinned base `clamav/clamav:1.4` is the Alpine variant, which ClamAV publishes for amd64 only. ARM hosts need the `-debian` base instead — and that swap breaks the `su-exec` privilege drop in `entrypoint.sh`. See the architecture constraint in [28-PHASE6.3](../../docs/jobs/28-PHASE6.3-DEPLOYMENT-CONTINGENCY.md). |
| Inbound | **One caller only** — the jobs-ai bridge | Nothing else has any reason to reach it. |
| Outbound | `database.clamav.net` :443/:53 | freshclam signature updates. **The only egress needed.** Documents never leave. |
| Persistent volume | `/var/lib/clamav` | Optional but strongly advised: without it every restart re-downloads ~120 MB and the scanner is correctly unhealthy for minutes. |
| Health check | `GET /health`, expect `200` | Start period **≥10 minutes** — a cold signature bootstrap legitimately returns `503` for several minutes and a short grace period will restart-loop the container forever. |

### Private networking

**This service must not be publicly reachable.** It accepts document bytes; a
shared secret is authentication, not a substitute for network isolation.

In preference order:

1. **Platform-private networking** — Render Private Service, Fly.io private
   network, Railway private networking, an ECS service with no public IP, a
   Kubernetes `ClusterIP`. Nothing is published at all.
2. **Private interface binding** — on a plain VPS, bind the published port to a
   private or VPN interface (WireGuard, Tailscale, a cloud VPC address), never
   `0.0.0.0`. `docker-compose.yml` ships bound to `127.0.0.1` for this reason;
   the comment there explains what changing it costs.
3. **Same-host loopback** — if the caller runs on the same box, `127.0.0.1` is
   sufficient and nothing is exposed.

A public URL behind a firewall rule is a distant fourth and should be treated
as a temporary measure.

### Docker, on any host

```bash
cd services/jobs-clamav
cp .env.example .env          # put a real secret in it; .env is gitignored
docker compose up -d --build
curl -fsS http://127.0.0.1:8080/health
```

`docker-compose.yml` sets the memory ceiling, the signature volume, the
`127.0.0.1` binding, `platform: linux/amd64`, and a health check with a
10-minute start period. It changes nothing about the wire contract — same image,
same endpoints, same headers.

On Apple Silicon the `platform` pin means the container runs under emulation.
It works, but the first signature load is slow enough to look like a hang.

Without compose, the equivalent is:

```bash
docker build -t estabizz-jobs-clamav .
docker run -d --name estabizz-jobs-clamav \
  -p 127.0.0.1:8080:10000 \
  -e JOBS_MALWARE_SCANNER_SECRET="$SCANNER_SECRET" \
  -e JOBS_DOCUMENT_MAX_UPLOAD_MB=10 \
  -v clamav-signatures:/var/lib/clamav \
  --memory 2g \
  estabizz-jobs-clamav
```

### Pointing the application at it

Whatever the host, only **jobs-ai** needs to know where the scanner is:

| Side | Set |
|---|---|
| **this service** | `JOBS_MALWARE_SCANNER_SECRET` |
| **jobs-ai** | `CLAMAV_INTERNAL_URL` (full URL, or Render's `host:port`), and the same `JOBS_MALWARE_SCANNER_SECRET` |
| **Vercel** | `JOBS_MALWARE_SCANNER_PROVIDER=clamav` only — plus the `JOBS_AI_SERVICE_URL` / `AI_SERVICE_SECRET` it already has |

Vercel never holds this service's address or its secret. There is no
`JOBS_MALWARE_SCANNER_URL` on the application side; the bridge replaced it.

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
