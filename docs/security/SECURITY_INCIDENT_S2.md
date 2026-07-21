# Security Incident — S2

> **Status: DEPLOYMENT BLOCKED — Secret rotation required before any push or deploy.**
> Created: 2026-07-20 | Gate: Security Gate S2 | Project: Estabizz Admin OS / Website CMS

---

## 1. Incident summary

During a local QA agent session (prior to Security Gate S2), the contents of `.env.local` were printed to stdout inside an agent transcript or terminal log.

**This means all credential values present in `.env.local` at the time of that session must be treated as compromised and rotated immediately.**

No secret was committed to the git repository. The file `.env.local` is correctly gitignored and has never appeared in any commit (verified by `git log --all --diff-filter=A -- .env.local`).

However, local transcript/log exposure is sufficient to require rotation before any deployment.

---

## 2. Affected secret classes

The following classes of credentials must be rotated in their respective provider dashboards.  
**This document does not contain and must never contain actual values.**

| Secret class | Provider | Rotation action required |
|---|---|---|
| MongoDB connection URI / password | MongoDB Atlas | Rotate DB user password; update connection string |
| JWT signing secret | Internal / manual | Generate new random 256-bit secret |
| Cloudinary API secret | Cloudinary dashboard | Rotate API secret; update env var |
| GitHub backup token | GitHub → Settings → Tokens | Revoke and regenerate PAT with same scopes |

---

## 3. `.env.local` status

| Check | Result |
|---|---|
| `.env.local` tracked in git | NO — never committed |
| `.env.local` in `.gitignore` | YES — line 7 (`/.env.local`) and line 8 (`.env*.local`) |
| `.env.local` appears in any commit history | NO — confirmed via `git log --all --diff-filter=A` |
| Exposure vector | Local agent stdout / transcript log |

---

## 4. Deployment gate

**Deployment is blocked** until all of the following are confirmed:

1. [ ] MongoDB URI / password rotated in Atlas
2. [ ] JWT secret regenerated and updated in `.env.local`
3. [ ] Cloudinary API secret rotated and updated in `.env.local`
4. [ ] GitHub backup token revoked and regenerated (if present)
5. [ ] `.env.local` updated with all new values
6. [ ] MongoDB connectivity re-verified (Security Gate S2 Step 3)
7. [ ] Production build passing (Security Gate S2 Step 4)
8. [ ] All Security Gate S2 checks passed

---

## 5. What does NOT need to change

- Git history is clean — no rebase, no force-push required
- `.gitignore` is already correct — no change needed
- Source code is unaffected — no credential is hardcoded in any `.ts`/`.tsx` file
- The `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_API_SECRET`, and `GITHUB_BACKUP_TOKEN` environment variable names stay the same — only their values change
- Vercel environment variables (production) should also be updated when rotation is complete and owner is ready to deploy

---

## 6. Post-rotation validation steps

After the human owner rotates all secrets and updates `.env.local`:

1. Re-run Security Gate S2 Step 3 (MongoDB connectivity check)
2. Confirm `public_content_pages` count = 46, all published
3. Confirm `admin_users` collection is intact, no `.test` users
4. Re-run `npm run build` — must pass clean
5. Confirm `npx tsc --noEmit` — no errors
6. Only after all above pass: gate is cleared and deployment may proceed

---

*This document is for internal use only. Do not commit or share actual credential values.*
