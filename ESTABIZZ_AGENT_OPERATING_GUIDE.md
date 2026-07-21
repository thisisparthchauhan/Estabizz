# Estabizz — Agent Operating Guide

> Written: 2026-07-22 · For future AI agents working on this codebase
> **Read this file before doing any work.** It will save you from common mistakes.

---

## 1. Operating Model — Which Agent for What

### Claude Code (this agent — `claude-sonnet-*`)
- Primary implementation agent
- File editing, code generation, bug fixing, architecture
- TypeScript, Next.js, MongoDB, API routes
- Always available in this repo

### Codex / GPT-4o
- Secondary agent for isolated, well-scoped tasks
- Good for: small UI components, YAML/config changes, simple refactors
- Do NOT use Codex for: security-sensitive code, auth changes, permission system changes, database schema changes

### Antigravity / QA Agent
- Verification agent — reads code and reports findings; does not edit
- Use after any significant feature or bug fix
- Always QA before tagging a task as complete

---

## 2. Absolute Rules (Never Break These)

### Git / Deploy
- **Do not push to remote** unless the owner explicitly asks in the current message.
- **Do not deploy** (Vercel, any production system) unless explicitly asked.
- **Do not run `npm run build` while the dev server is running.** Both write to `.next/` and will corrupt each other. Stop dev server first.
- **Do not `git push --force`** under any circumstances.
- **Do not amend published commits.** Create new commits only.

### Secrets / Credentials
- **Do not read, display, or echo `.env.local`** in any form.
- **Do not print API keys, JWT secrets, or passwords** in tool output or responses.
- **Do not store raw base64 image data in MongoDB.** TipTap: `allowBase64: false`. sanitize-html: `allowedSchemesByTag.img: ['https']`.
- **Do not store local file paths** from the user's machine in the database.
- **Cloudinary API secret must never reach the browser.** Unsigned upload only (cloud name + upload preset in `NEXT_PUBLIC_*`).

### Scope Discipline
- **Do not start the next phase** until the owner explicitly asks.
- **Do not modify** `app/layout.tsx`, Google Analytics, navbar (unless the task is specifically about those).
- **Do not change**: homepage layout, blog categories code (unless explicitly tasked), domain/DNS, Vercel configuration.
- **Do not add error handling for impossible states.** Trust internal code and framework guarantees.
- **Do not add comments** explaining what code does. Only add comments for non-obvious WHY.

### Security Coding Rules
- Never use `eval()`, `innerHTML` (use DOMParser or sanitize-html instead), or `dangerouslySetInnerHTML` without sanitization.
- Never expose server-side secrets (env vars without `NEXT_PUBLIC_` prefix) to client components.
- Always use `requirePermission` (not just `requireAdmin`) for any admin API route that modifies data.
- Always sanitize user-supplied HTML before storing in MongoDB (`sanitize-html` server-side).
- Validate all external URLs before storing: must be `https:`, must be from the expected host.

---

## 3. Development Workflow

### Starting a session
1. Check `git status` — note any uncommitted changes before starting new work.
2. Check `CMS_STATUS.md` for current phase and last completed task.
3. Read the relevant documentation file for the module you're working on.
4. Do NOT start the dev server unless you need to test UI changes.

### Before every commit
1. Run `npx tsc --noEmit` — must pass with zero errors.
2. Check `git status` — confirm only intended files are modified.
3. Never commit `.env.local`, `*.pem`, or files likely to contain secrets.
4. Use descriptive commit messages following the pattern: `Module: action taken`
   - Examples: `CMS Blog Editor: fix media retry and image validation`
   - Examples: `Docs: map Estabizz architecture and future roadmap`

### Running the dev server
The `dev` script in `package.json` is:
```
npx tailwindcss ... --watch & next dev --turbopack
```
Use `preview_start` (Claude Code browser tool) to start it — this ensures the child Tailwind process is cleaned up on stop. Do NOT use `Bash` to `npm run dev` as a background command unless you explicitly need to avoid the browser pane.

### TypeScript check
```bash
npx tsc --noEmit
```
Must produce zero errors before any commit.

---

## 4. Tech Stack Quick Reference

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js App Router | Turbopack in dev, standard webpack in build |
| Language | TypeScript (strict) | `tsconfig.json` |
| Styles | Tailwind CSS standalone CLI | NOT PostCSS plugin; compiled to `public/tailwind.css` |
| DB | MongoDB via Mongoose | Connection pool in `lib/mongodb.ts` |
| Auth (admin) | JWT, HS256, httpOnly cookie `auth_token`, 7-day expiry | `lib/admin/session.ts` |
| Auth (user) | Same JWT flow, separate cookie | |
| Rich text | TipTap 3.28.0 | `immediatelyRender: false` required for Next.js |
| Media | Cloudinary (unsigned upload) | `NEXT_PUBLIC_CLOUDINARY_*` in client; never secret in browser |
| Email | Resend (env var exists; not yet wired) | `RESEND_API_KEY` |
| HTML sanitization | sanitize-html (server-side) | Always sanitize before DB write |
| HTML parsing (server) | htmlparser2 + domutils | Transitive dep of sanitize-html |
| Word import | Mammoth.js | `.docx` → HTML + Cloudinary image upload |
| Deploy | Vercel + GitHub auto-deploy | Push to `main` triggers deploy |

---

## 5. File System Map (Key Files)

```
app/
  admin/                       ← Admin OS (requires auth)
    blogs/
      _components/
        RichContentEditor.tsx  ← TipTap editor + Word import
        BlogEditorClient.tsx   ← Main blog editor page
    content-pages/             ← CMS content page editor
    media/                     ← Media library
  api/
    admin/
      blogs/
        save/route.ts          ← Blog save + HTML validation
      media/route.ts           ← Idempotent media upsert
      content-pages/           ← Content page CMS API
    auth/
      login/route.ts           ← LOGIN — NO RATE LIMIT (TD-001)
    leads/route.ts             ← Lead capture
  [public routes]/             ← Public website
lib/
  admin/
    requireAdmin.ts            ← JWT verify + allowlist check
    requirePermission.ts       ← requireAdmin + DB permission check + seed fallback
    seedData.ts                ← Seed admin users (super_admin, admin)
    session.ts                 ← JWT sign/verify helpers
  models/                      ← Mongoose models
    Blog.ts
    MediaAsset.ts
    ContentPage.ts
    ContentBlock.ts
    AdminUser.ts
    RegulatoryUpdate.ts
    Lead.ts
    ContentAudit.ts
  mongodb.ts                   ← Connection pool
  blog/
    categories.ts              ← HARDCODED (TD-003) — not yet DB-driven
components/
  ui/
    ChatWidget.tsx
    ActionBar.tsx
public/
  tailwind.css                 ← Generated by Tailwind CLI — do not edit manually
```

---

## 6. Common Mistakes to Avoid

| Mistake | What happens | Correct approach |
|---------|-------------|-----------------|
| Running `npm run build` with dev server active | Corrupts `.next/` Turbopack cache; dev server crashes with ENOENT | Stop dev server first, then build |
| Using `MediaAsset.create()` for media upsert | Throws E11000 on duplicate `publicId` | Use `findOneAndUpdate` + `$setOnInsert` + E11000 catch |
| Regex parsing HTML attributes | Breaks on single quotes, uppercase ALT, multiline | Use `htmlparser2` + `domutils` |
| `getAdminUserByEmail` only in `requirePermission` | Returns null for seed accounts without DB record → 403 | Also check `seedAdminUsers` fallback |
| Gating UI scans behind `hasWordImagesRef` | Misses alt text issues on initial load and existing blogs | Always call `countUnresolvedAlts` on every editor update |
| Reading `.env.local` to verify secrets | Exposes secrets in tool output | Trust env var names; never print values |
| Adding `immediatelyRender: true` or omitting the flag | TipTap hydration warning in Next.js | Always use `immediatelyRender: false` |
| Committing without TypeScript check | Type errors silently ship | Always run `npx tsc --noEmit` first |

---

## 7. CMS_STATUS.md — How to Update

`CMS_STATUS.md` is the owner's source of truth for what has been done. Keep it current.

**Format for a new entry**:
```markdown
## [Date] — [Short title]

**Task**: What was done.
**Files changed**: `path/to/file.ts`, `other/file.tsx`
**Commit**: [commit-hash]
**Status**: Complete
```

Add new entries at the top (most recent first). Never remove old entries.

---

## 8. Permissions System — Fast Reference

When an admin API route should require a specific permission, use:

```typescript
import { requirePermission } from '@/lib/admin/requirePermission';

// Inside the route handler:
const auth = await requirePermission(request, 'manage_media');
if (!auth.ok) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: auth.status });
}
const { email, role, permissions } = auth.admin;
```

`requirePermission` already calls `requireAdmin` internally. Never call `requireAdmin` manually and then `requirePermission` — `requirePermission` handles both.

### Available permissions
`view_admin` · `manage_blogs` · `create_blog` · `edit_blog` · `approve_blog` · `publish_blog` · `reject_blog` · `archive_blog` · `delete_blog` · `manage_categories` · `manage_media` · `manage_users` · `manage_content` · `publish_content` · `manage_navigation` · `delete_content` · `purge_content` · `manage_seo` · `manage_backups`

---

## 9. Known Deferred Decisions

These items have been noted but not yet resolved. Do not make assumptions about them — ask the owner if they become relevant:

1. **Client portal auth strategy**: Separate JWT flow vs. shared flow with different role.
2. **PostgreSQL adoption**: Deferred to Phase 2–3; not yet installed.
3. **Signed Cloudinary uploads**: Current unsigned preset works; signing is a hardening step (Phase 2).
4. **n8n hosting**: Self-hosted vs. n8n cloud not decided.
5. **WATI vs. other WhatsApp provider**: Not decided.
6. **Multi-tenancy**: Not planned — single-tenant platform.

---

## 10. Documentation Index

All canonical docs are in the project root:

| File | Contents |
|------|---------|
| `ESTABIZZ_TECHNICAL_ARCHITECTURE.md` | Stack, patterns, env vars, build/deploy flow |
| `ESTABIZZ_MODULE_INVENTORY.md` | All Admin OS + public site modules, components |
| `ESTABIZZ_API_DATABASE_MAP.md` | Full API catalogue, DB models |
| `ESTABIZZ_SECURITY_PERMISSION_MAP.md` | Auth flow, roles, permissions matrix |
| `ESTABIZZ_CURRENT_COMPLETION_STATUS.md` | What is complete vs. placeholder vs. not built |
| `ESTABIZZ_TECHNICAL_DEBT_REGISTER.md` | 15 known issues with severity and fix |
| `ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md` | Full product vision: client portal, AI, CRM |
| `ESTABIZZ_NEXT_20_TASKS.md` | Ordered task list — Priority 0 first |
| `ESTABIZZ_AGENT_OPERATING_GUIDE.md` | This file — rules and working conventions |
| `ESTABIZZ_PROJECT_MASTER_CONTEXT.md` | Master index; read this first in a new session |
| `CMS_STATUS.md` | Running log of what has been built and committed |
