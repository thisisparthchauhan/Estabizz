# Estabizz Jobs — Phase 6.3: No-Card Deployment Contingency

No payment method is available for Render right now. This records what that
actually blocks, what it does not, and how to deploy the scanner later on any
host rather than only on Render.

**Nothing here weakens a security control.** The scanner is not switched to an
undersized instance, the production fail-closed requirement is untouched, and
production resume processing stays blocked until a real scanner is hosted.

---

## 1. Status: deferred, not failed

The ClamAV scanner is **built, tested and unhosted**.

| | |
|---|---|
| Service code | Complete — `services/jobs-clamav/` |
| Wire contract | Complete and pinned by tests |
| Bridge architecture | Complete — Vercel → jobs-ai → private scanner |
| Real-engine validation | **Passed** — real clamd, real signature database, EICAR detected as `Eicar-Test-Signature` through the full TypeScript → jobs-ai → scanner chain |
| Tests | 25 Python + 24 TypeScript-contract, all passing |
| Container image build | **Unverified** — Docker is not installed on this machine. Independent of payment. |
| Hosting | **Deferred** — waiting on a payment method |

Nothing failed. Render Private Services simply have no free tier: every `pserv`,
at every plan size, requires a card on the account. The smallest one that would
even satisfy the memory floor is a paid tier regardless.

### What changed in `render.yaml`

The `pserv` and the `CLAMAV_INTERNAL_URL` reference that points at it are
**disabled in place, not deleted** — every line carries a `#|` prefix.

This was necessary rather than cosmetic. A Blueprint that declares a service it
cannot create fails validation, and a failed sync applies *nothing* in the file
— including settings that have nothing to do with malware scanning. Leaving the
`pserv` in place would have left the whole Blueprint un-appliable.

Restore is one command, and it reproduces the original lines verbatim:

```bash
sed -i '' 's/^#|//' render.yaml        # macOS; drop the '' on Linux
```

*Verified:* stripping the marker yields a Blueprint structurally identical to
the pre-deferral version, parsed and compared field by field.

### Why the deferral is safe

With no scanner reachable, the malware verdict is `not_configured` (nothing
configured) or `unavailable` (bridge up, no scanner behind it). **Both block.**
`resolveRequired` in `lib/jobs/malwareScanning/config.ts` returns `true` for
`APP_ENV=production` unconditionally — the environment variable is ignored
there, so no stray value can switch antivirus off for real candidates.

This is asserted, not merely described. `scripts/jobsMalwareScanningTest.mjs`
now covers:

- production with **nothing** configured — blocked, end to end;
- production with every plausible "just get it working" variable set, including
  `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=false` — still blocked;
- a reachable bridge with no scanner behind it — `unavailable`, never `clean`,
  and **retryable**, so queued work drains on its own the day a scanner exists.

Both assertions were mutation-tested: weakening `resolveRequired` and weakening
the gate each turn them red.

---

## 2. Provider-neutral deployment

Nothing about this service is Render-specific. It is a Docker container that
serves two HTTP endpoints.

### Requirements

| Requirement | Value | Why |
|---|---|---|
| **Memory** | **≥1 GB; 2 GB comfortable** | clamd loads the entire signature database into memory and is OOM-killed below the floor. A hard requirement — this is the reason a free instance is not an option anywhere. |
| Disk | ~1 GB free | Signature database plus room for an update to stage. |
| CPU | 1 vCPU | Scanning a 10 MB document is sub-second once signatures are resident. |
| **Architecture** | **`amd64` only** | See the warning below — the pinned base image publishes no ARM build. |
| Container port | `10000`, override with `PORT` | Wrapper binds `0.0.0.0:$PORT` inside the container. |
| **Inbound** | **From the jobs-ai bridge only** | Nothing else has any reason to reach it. |
| **Outbound** | `database.clamav.net` :443 and :53 | freshclam updates. The **only** egress required — documents never leave the container. |
| Persistent volume | `/var/lib/clamav` | Strongly advised. Without it every restart re-downloads ~120 MB and the scanner is correctly unhealthy for minutes. |
| Health check | `GET /health` → `200` | **Start period ≥10 minutes.** A cold signature bootstrap legitimately returns `503` for several minutes; a short grace period restart-loops the container forever. |

### Architecture constraint: amd64 only

`services/jobs-clamav/Dockerfile` pins `clamav/clamav:1.4`, which is the
**Alpine** variant. Verified against Docker Hub on 2026-09-12: ClamAV publishes
the Alpine tags (`1.4`, `1.4.6`, `latest`, `stable`) for **amd64 only**. The
Debian tags (`1.4-debian`, `1.4-debian13-slim`) are the multi-arch ones —
amd64, arm64 and ppc64le.

Consequences:

- **Apple Silicon** (this machine is an M1): `docker compose up --build` needs
  `--platform linux/amd64` emulation. clamd under QEMU is slow enough that the
  signature load may look like a hang. Workable for a smoke test, unpleasant.
- **ARM VPS and Oracle Cloud Ampere: will not run as-is.**
- amd64 hosts — Render, Fly.io, Hetzner CX/CPX, DigitalOcean — are unaffected.

**Remediation for an ARM host** is a base-image change, not a contract change:
`FROM clamav/clamav:1.4-debian13-slim`, with `apk add python3 py3-pip` replaced
by the `apt-get` equivalent. It is **not committed, because it cannot be tested
here** — Docker is not installed on this machine — and it carries one genuine
security regression to solve first: `entrypoint.sh` drops the wrapper to the
unprivileged `clamav` user via `su-exec`, which is Alpine-specific. On Debian
that lookup fails and the wrapper silently **runs as root**. Anyone taking the
ARM path must swap in `gosu` and confirm the drop actually happened before
putting candidate documents through it.

### Environment variables

| Variable | Required | Notes |
|---|---|---|
| `JOBS_MALWARE_SCANNER_SECRET` | **Yes** | Shared secret for `x-estabizz-scanner-secret`. Byte-identical to the value on jobs-ai. Without it the service returns 503 to everything rather than scanning unauthenticated. |
| `JOBS_DOCUMENT_MAX_UPLOAD_MB` | No (default 10) | Must match the application side. |
| `CLAMD_SOCKET` | No (default `/tmp/clamd.sock`) | Set empty to use TCP. |
| `CLAMD_HOST` / `CLAMD_PORT` | No | TCP fallback, `127.0.0.1:3310`. |
| `CLAMD_TIMEOUT_SECONDS` | No (default 60) | Per-scan ceiling. |
| `PORT` | No (default 10000) | Set by most platforms. |

Only **jobs-ai** ever needs the scanner's address (`CLAMAV_INTERNAL_URL`) and
its secret. Vercel holds neither, on any host.

### Private networking

**The scanner must not be publicly reachable.** It accepts raw document bytes;
a shared secret is authentication, not a substitute for network isolation.

In preference order:

1. **Platform-private networking** — Fly.io 6PN, Railway private networking, an
   ECS service with no public IP, a Kubernetes `ClusterIP`, a Render Private
   Service. Nothing is published at all.
2. **Private interface binding** — on a plain VPS, publish the port on a VPC,
   WireGuard or Tailscale address, never `0.0.0.0`. `docker-compose.yml` ships
   bound to `127.0.0.1` for exactly this reason.
3. **Same-host loopback** — if the caller shares the box, `127.0.0.1` exposes
   nothing.

A public URL behind a firewall rule is a distant fourth and should be temporary.

### `docker-compose.yml`

`services/jobs-clamav/docker-compose.yml` runs the identical container on any
Docker host. It sets the memory ceiling, the signature volume, the `127.0.0.1`
binding and a health check with a 10-minute start period.

```bash
cd services/jobs-clamav
cp .env.example .env          # real secret goes here; .env is gitignored
docker compose up -d --build
curl -fsS http://127.0.0.1:8080/health
```

**It changes nothing about the application contract** — same image, same
`POST /scan` and `GET /health`, same header. Only the host differs.

---

## 3. Hosting options

Prices are indicative and were not verified against current published pricing —
**confirm before committing.** The comparison that matters is the memory floor,
which no free tier clears.

| Option | Approx. cost | Private networking | Notes |
|---|---|---|---|
| **Hetzner CX22 + Docker** | **~€4/mo** | Private network or WireGuard | Cheapest credible option. 4 GB RAM, comfortably over the floor. Requires running your own host: patching, Docker, firewall. |
| **Fly.io, 2 GB machine** | ~$10–12/mo | **Built in (6PN)** | Best fit for the architecture — private networking is native, so the Render design transfers unchanged. Deploys the same Dockerfile. |
| **Railway** | ~$5/mo + usage | Built in | Simple; usage-based billing needs watching. |
| **DigitalOcean droplet, 2 GB** | ~$12/mo | VPC | Familiar, more expensive than Hetzner for the same thing. |
| **Render Private Service** | ~$25/mo | Built in | Already written and committed. Costs the most; needs no new work. |
| Oracle Cloud Always Free (Ampere **ARM**) | $0 | VCN | Free and large enough, but **the image does not build for ARM as committed** — see the architecture constraint above. Capacity is also frequently unavailable and accounts can be reclaimed. Not a production answer. |

**Cheapest that is not a false economy: Hetzner.** **Simplest that matches the
existing design: Fly.io.** Both need a card, so neither unblocks today; the
point is that Render is not the only door, and it is the most expensive one.

---

## 4. When a paid host becomes mandatory

**The trigger is the first real candidate resume processed in production.**

Precisely:

| Situation | Scanner needed? |
|---|---|
| Local development | No — `required` defaults on but can be set `false` outside production |
| Staging, synthetic files, `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=false` | No — verdict is recorded honestly as `not_configured`, processing proceeds |
| Staging with scanning required | Yes |
| **Production, any resume upload** | **Yes — hard block, not overridable** |

In production with no scanner, an upload is accepted and stored, then stops at
the malware gate: `parse_status` becomes `failed` and the candidate sees a
failure they cannot act on. So the real deadline is **before the candidate
resume flow is enabled on the production domain**, not before production exists.

A jobs board without resume upload could launch first. That needs a flag to
disable the upload entry point cleanly — one does not exist today, and building
one is only worth it if the launch date genuinely precedes the card.

---

## 5. Also blocked by payment (not just ClamAV)

The scanner is not the only paid dependency, and the other one is easy to miss.

**jobs-ai is on Render's free plan.** Measured consequences, already recorded in
[27-PHASE6-PRODUCTION-READINESS.md](27-PHASE6-PRODUCTION-READINESS.md):

- cold starts of **33–63 s** against a 45 s caller timeout;
- an 839 KB PDF exhausted the 60 s structured-extraction budget on free-tier
  compute.

This degrades safely rather than losing work — a timeout is retryable, QStash
re-delivers, and the atomic claim makes the retry safe — but production needs a
paid always-on instance for acceptable first-parse latency and for large
documents. Section 4 of the Phase 6 document already specifies this.

So a card unblocks **two** production dependencies, not one.

---

## 6. Outstanding, and what it depends on

| Item | Blocked by |
|---|---|
| Create the private ClamAV service | **Payment method** |
| Verify Render `fromService` resolves for a `pserv` | **Payment method** (needs the service to exist) |
| Paid always-on jobs-ai instance | **Payment method** |
| Build and boot the container image | **Docker not installed locally** — not payment |
| ARM/Apple-Silicon image variant (Debian base + `gosu`) | Docker not installed locally; needed only if an ARM host is chosen |
| Production Neon / B2 / Upstash / Resend provisioning | Payment method for the paid tiers among them |
| Four privacy-policy decisions (retention schedule, backup residue window, Lead erasure path, admin deletion UI) | **Nobody — these are decisions, not infrastructure** |
| `JobPosting` structured data; `/careers` existence | Nobody — feature work |
| Production restore drill | Production database existing |
