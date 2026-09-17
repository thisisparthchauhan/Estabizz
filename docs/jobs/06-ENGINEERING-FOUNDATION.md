# Estabizz Jobs - Phase 1A Engineering Foundation

> Phase: 1A - Engineering Foundation, Part 1  
> Status: implemented locally  
> Scope: CI foundation, staging safety preparation, and safe existing security-baseline fixes  
> Architecture authority: `docs/jobs/05-ARCHITECTURE-FREEZE.md`

## 1. Current Repository Audit

### Branch And Git

- Current branch: `jobs-platform-phase-0`.
- Remote: `origin` points to `https://github.com/thisisparthchauhan/Estabizz`.
- Local branch inventory includes `main`, CMS/admin branches, global markets branches, and the Jobs phase branch.
- Existing working tree included untracked Jobs docs and local build/diff artifacts before this phase started.

### GitHub Configuration

- No `.github/workflows` CI configuration existed before Phase 1A Part 1.
- A minimal pull-request CI workflow has now been added at `.github/workflows/ci.yml`.

### Vercel Configuration

- `vercel.json` exists.
- Framework: Next.js.
- Build command: `npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css && next build`.
- Redirect: apex `estabizz.com` redirects to `www.estabizz.com`.
- Local `.vercel/repo.json` links the repo to the `estabizz` Vercel project.

### Package Scripts

Existing supported commands after Phase 1A Part 1:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run type-check`

The previous lint script used `next lint`, which is not compatible with the current Next.js 16 CLI behavior in this repository. It now runs ESLint directly using the existing `.eslintrc.json`.

### TypeScript

- `tsconfig.json` uses strict mode.
- `noEmit` is enabled.
- `moduleResolution` is `bundler`.
- `allowJs` is enabled.

### Lint

- `.eslintrc.json` extends `next/core-web-vitals`.
- Existing warnings remain warnings. Phase 1A did not attempt a broad lint cleanup.
- Two stale inline disables referencing an uninstalled `@typescript-eslint` rule were removed so ESLint can run.

### Test Infrastructure

- No `test` script exists in `package.json`.
- No Jest, Vitest, or Playwright config was found.
- No automated test command was invented for CI.

### Gitignore

- `.vercel`, `node_modules`, `.next`, `out`, `.npm-cache`, `.vercel-home`, local env files, `.DS_Store`, `tsconfig.tsbuildinfo`, and local Claude tooling state are ignored.

### Environment Variables

Existing environment-sensitive features include:

- MongoDB: `MONGODB_URI`
- JWT auth: `JWT_SECRET`
- Rate limiting: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- AI helper APIs: `ANTHROPIC_API_KEY`
- Lead notifications: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`
- CMS/blog media: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- Public forms: `NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID`, `NEXT_PUBLIC_FORMSPREE_COUNTRY_FORM_ID`
- Optional backup settings: `GITHUB_BACKUP_*`

`.env.example` has been added as a non-secret developer and staging checklist.

## 2. CI Design

The new CI workflow runs on pull requests to `main` and `jobs-platform-phase-0`, plus manual dispatch.

Pipeline:

1. checkout
2. Node.js 22 setup with npm cache
3. `npm ci`
4. `npm run type-check`
5. `npm run lint`
6. `npm run build`

The workflow does not require production secrets. It does not set `MONGODB_URI`, PostgreSQL, object storage, AI, email, or Cloudinary credentials.

Automated tests are not included because the repository does not currently expose a supported test command.

## 3. Staging Lifecycle

Desired lifecycle:

Feature branch -> Pull Request -> CI -> Staging/Preview -> Browser QA -> Approval -> main -> Production

Repository-side preparation completed:

- pull-request CI added
- build and lint gates repaired
- non-secret environment checklist added
- staging isolation rules documented

Manual GitHub/Vercel setup is still required:

- enable branch protection on `main`
- require the CI workflow before merge
- configure Vercel Preview deployments for feature branches and pull requests
- create separate Vercel environments for development, preview/staging, and production
- configure separate environment variables per environment
- ensure staging Jobs variables never point to production Jobs infrastructure

## 4. Environment Boundaries

### Development

- Local `.env.local` only.
- May use local or sandbox MongoDB.
- May use in-memory rate limiting when not production.
- Must not use production candidate CV/document storage.

### Staging

- Separate Vercel preview/staging environment.
- Separate Jobs PostgreSQL when PostgreSQL is introduced.
- Separate private object-storage bucket when Jobs documents are introduced.
- Separate queue and AI credentials when background jobs are introduced.
- Staging may read production MongoDB for CMS content only if approved, but Jobs integration tests must not write recruitment test data into production MongoDB.

### Production

- Production Vercel environment only.
- Production MongoDB, rate limit store, lead notification settings, and public site domain settings.
- Future production Jobs PostgreSQL, object storage, queue, and AI credentials must be isolated from staging.

## 5. Jobs Staging Prohibitions

Jobs staging must never:

- send production candidate emails
- access production CV/document storage
- run AI jobs against production candidate data
- write Jobs records to production PostgreSQL
- write recruitment test data into production MongoDB
- use Cloudinary for candidate CVs or candidate documents

## 6. Security Fixes Performed

### User Password Projection

`lib/models/User.ts` now excludes the public `User.password` field by default with `select: false`.

The login route explicitly opts in with `.select('+password')` because password comparison genuinely needs the hash.

### Lint Gate Repair

The lint script now uses the existing ESLint configuration directly:

```bash
npm run lint
```

This makes lint usable for CI on the current Next.js version.

### Stale ESLint Rule Comments

Two stale inline disables for `@typescript-eslint/no-unused-vars` were removed because this repository does not install that plugin and ESLint treated the comments as errors.

## 7. Security Fixes Deferred

### Static Admin Allowlist

The hard-coded admin allowlist remains in place for now to avoid locking out current administrators.

Recommended migration procedure:

1. Confirm every allowlisted administrator has an active `admin_users` database record with the expected role.
2. Add a temporary audit script that reports allowlisted emails missing from `admin_users`.
3. Seed missing DB records using the existing admin-user repository paths.
4. Deploy a transition where the allowlist is accepted only as a bootstrap fallback.
5. After owner approval and successful admin login QA, remove the permanent super-admin bypass.

No destructive admin-auth migration was performed in Phase 1A Part 1.

### Public API Rate Limiting

Final verification was performed against the current repository after the Phase 1A Part 1 changes.

The earlier audit statement that `/api/leads`, `/api/signup`, and `/api/submit-blog` were not rate limited is stale for the current codebase:

- There is no current `/api/signup` route; the implemented signup route is `/api/auth/signup`.
- `/api/auth/signup` imports and uses `limitRequest` from `lib/security/rateLimit.ts`.
- `/api/leads` imports and uses `limitRequest` from `lib/security/rateLimit.ts`.
- `/api/submit-blog` imports and uses `limitRequest` from `lib/security/rateLimit.ts`.

Public and publicly reachable mutation matrix:

| Route | HTTP mutation methods | Authentication requirement | Current rate-limit protection | Limiter used | Fail behaviour | Abuse risk | Recommended action |
|---|---:|---|---|---|---|---|---|
| `/api/auth/login` | `POST` | None | Yes | `auth-login-ip` 5 / 15 min and `auth-login-id` 10 / 30 min | Missing production Upstash config returns 503 before limiting; runtime store errors fail open | High: credential stuffing and brute force | No code change. Keep existing shared limiter. |
| `/api/auth/signup` | `POST` | None | Yes | `auth-signup-ip` 5 / 15 min and `auth-signup-email` 3 / 60 min | Missing production Upstash config returns 503; runtime store errors fail open | High: account spam and bcrypt cost abuse | No code change. Earlier `/api/signup` audit path is outdated. |
| `/api/auth/logout` | `POST` | None required; clears caller cookie | No limiter | None | Not applicable | Low: no DB write, clears `auth_token` cookie only | No immediate action. |
| `/api/chat` | `POST` | None | Yes | `chat` 10 / 10 min per IP | Fail closed; missing/unreachable limiter returns 503 | High: AI cost and prompt abuse | No code change. Keep fail-closed. |
| `/api/leads` | `POST` | None | Yes | `leads-ip` 5 / 60 min and `leads-email` 3 / 24 hr | Missing production Upstash config returns 503; runtime store errors fail open | High: lead spam, email notification abuse, Mongo writes | No code change. Earlier audit is outdated. |
| `/api/submit-blog` | `POST` | None | Yes | `submit-blog-ip` 3 / 60 min and `submit-blog-email` 2 / 12 hr | Missing production Upstash config returns 503; runtime store errors fail open | High: spam content, Mongo writes, moderation load | No code change. Earlier audit is outdated. |
| `/api/my-blogs/[id]` | `DELETE` | Required user session via `getSessionEmailFromRequest` JWT verification | No standalone limiter | Auth + ownership check | Not applicable | Medium: authenticated deletion attempt spam, ownership enforced | No Phase 1A change. Consider per-user limiter later if abuse appears. |
| `/api/recommend-services` | `POST` | None | Yes | `recommend-services` 5 / 10 min per IP | Fail closed; missing/unreachable limiter returns 503 | High: AI cost abuse | No code change. Keep fail-closed. |
| `/api/regulatory-updates` | None; `GET` only | None | No mutation limiter needed | None | Not applicable | Low for mutation abuse; public read endpoint only returns published updates | No action for Phase 1A. Consider cache/traffic controls separately if read abuse appears. |

Admin mutation routes under `/api/admin/*` were not treated as public mutation endpoints because they use admin authentication/permission gates. They should still keep their existing admin checks and can receive separate per-admin throttles in a future hardening pass if needed.

Conclusion: no additional endpoint rate limiting was added during final Phase 1A verification. The completion report statement is correct for the current high-risk unauthenticated mutation endpoints, and the earlier audit no longer reflects the current repository state.

### Cloudinary

Cloudinary unsigned upload remains legacy CMS/blog/media infrastructure.

Per the architecture freeze, Cloudinary is prohibited for future Jobs candidate CVs and candidate documents. Jobs documents must use private S3/R2-style object storage with presigned URLs and audit controls.

## 8. Build Gates

Required gates before Jobs implementation merges:

- `npm ci`
- `npm run type-check`
- `npm run lint`
- `npm run build`

Future gates to add when infrastructure exists:

- Prisma schema validation
- migration validation
- Jobs route/API tests
- candidate document storage tests against staging-only storage
- queue integration tests against staging-only queue

## 9. Rollback Considerations

This phase is low risk:

- CI workflow can be disabled or reverted without runtime impact.
- `.env.example` contains no secrets and has no runtime effect.
- password default projection is a security hardening change; rollback should be avoided unless a login regression is found.
- the login route explicitly selects the password hash, preserving the current login flow.
- no Jobs infrastructure, schemas, migrations, or feature routes were added.

## 10. Architecture Change Control

`docs/jobs/05-ARCHITECTURE-FREEZE.md` is controlling.

If implementation reveals a material conflict with the frozen architecture, stop that portion of work, document the proposed change, and request review before modifying the architecture or implementation direction.

## 11. Phase 1A Part 1 Result

Phase 1A Part 1 completed the repository-side CI/staging foundation and one safe security baseline fix.

It is safe to proceed to PostgreSQL and Prisma setup only after:

- CI is visible in GitHub on a pull request
- Vercel preview/staging environment separation is configured manually
- owner confirms staging secrets will be separate from production secrets
- the static admin allowlist migration plan is accepted for a later security phase
