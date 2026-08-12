## Context

See `proposal.md` - Why. This is the first infra change for the project; nothing currently exists under `src/`, no Dockerfile, no CI, no tunnel config. The full architecture and every file's exact contents are already specified in `docs/fraud-blog-infra-plan.md` — this design records the decisions layered on top of that plan (scope, ordering, and the manual/interactive steps) rather than re-deriving the architecture.

Ownership is fixed by `CLAUDE.md`: `fullstack-dev` owns `src/`, `.eleventy.js`, `package.json`; `devops-engineer` owns `Dockerfile`, `docker-compose.yml`, `.github/workflows/`, `cloudflared/`, LaunchAgent plists, `check-and-deploy.sh`, and all git/GitHub push operations; `qa-security` is read-only and gates sign-off before any push or deploy.

## Goals / Non-Goals

**Goals:**
- Get the approved launch post (`content-pipeline/published/behavioral-biometrics-bot-detection.md`) live and publicly reachable end-to-end: push to `main` → GHCR image → Mac pulls and redeploys → Cloudflare Tunnel serves it.
- Build the full pipeline from `docs/fraud-blog-infra-plan.md` in this change (not a manual-deploy-only stopgap) — GitHub Actions, poll script, LaunchAgent, and tunnel all land together.
- Keep the tunnel outbound-only with zero inbound ports, per project non-negotiables.

**Non-Goals:**
- Cowork-driven scheduled management (health checks, WAF log review, content research) — section 7 of the infra plan describes these but they are follow-up work, not part of getting the first post live.
- Multiple posts, tagging/category structure, RSS, or any content beyond the single launch post and whatever minimal index page is needed to reach it.
- VPS migration / upgrade path — out of scope until the Mac-as-origin approach proves unreliable in practice.

## Decisions

**Full pipeline now, not manual-first.** Build GitHub Actions + GHCR + poll script + LaunchAgent in this change rather than doing one manual `docker compose up` first. Rationale: the user confirmed this during exploration — the automation is small and well-specified enough in the infra plan that splitting it into a second change would just add coordination overhead without reducing risk.

**Domain name collected interactively, not placeholder-then-swap.** `devops-engineer` pauses mid-task at the tunnel-creation step and asks the user for the real domain (already expected to be on Cloudflare DNS) rather than writing a placeholder hostname into `cloudflared/config.yml` now. Rationale: user's explicit preference — avoids a config file that looks real but silently doesn't route anywhere, and avoids a follow-up edit step being forgotten.

**Content handoff is a manual copy, not automated.** The launch post moves from `content-pipeline/published/` into `src/content/posts/` as a one-time manual/agent-assisted copy during this change, not a build-time read from `content-pipeline/`. Rationale: matches the existing boundary already documented in `docs/fraud-blog-contentcreation-plan.md` — the content pipeline and the site are deliberately decoupled, `published/` is the pipeline's own record, not a live data source for the build.

**qa-security gates every push, per existing CLAUDE.md rule.** No new decision here, just confirming this change doesn't relax it: `devops-engineer` scaffolds and locally verifies (`docker build .`, `npx @11ty/eleventy`) but does not push to `main` or run `docker compose up` in a way that triggers real deployment until `qa-security` signs off in-session.

## Risks / Trade-offs

- **Mac reliability is the whole system's weak point** (sleep, reboots, ISP outage, Docker Desktop resource conflicts on a daily-driver machine) → Mitigated for v1 by the sleep-prevention step (`caffeinate -s` or system setting); accepted as a known limitation per `docs/fraud-blog-infra-plan.md` §8, with a documented VPS upgrade path if it becomes a real problem.
- **Interactive domain prompt mid-task blocks automated/unattended execution of this change** → Acceptable trade-off since tunnel creation is inherently a one-time, human-in-the-loop step (Cloudflare account access, DNS ownership); not something that should be automated away.
- **Building the full CI/CD loop before ever manually verifying the container runs** risks discovering a Dockerfile/compose problem only after wiring GitHub Actions → Mitigated by task ordering: local `docker build` and `docker compose up` verification happens before the GitHub Actions workflow is exercised by an actual push.
- **Secrets handling** (tunnel credentials JSON, GHCR auth) → Mitigated by `qa-security`'s explicit secret-scan gate (per `infra/container-image` and `infra/public-exposure` specs) before any push.

## Migration Plan

Not applicable — this is a first-time setup with no prior infra to migrate from or roll back to. If the Mac-origin approach is later replaced by a VPS, the repo/Actions/Tunnel config carry over unchanged per the infra plan's upgrade path; that migration is out of scope here.
