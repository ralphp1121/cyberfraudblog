## Why

The blog has a verified, approved launch post (behavioral biometrics explainer) but no infrastructure to build, containerize, or serve it. This change scaffolds the full pipeline described in `docs/fraud-blog-infra-plan.md` — 11ty static build, Docker multi-stage image, GitHub Actions publish to GHCR, pull-based deploy on the Mac origin, and an outbound-only Cloudflare Tunnel — so the launch post can go live end-to-end: push to `main` builds and publishes an image, the Mac polls and redeploys it, and the tunnel serves it publicly with no inbound port ever opened.

## What Changes

- Add the 11ty site scaffold: `.eleventy.js`, `package.json`, `src/` with one base layout, and the approved launch post moved into `src/content/posts/` from `content-pipeline/published/`.
- Add the Dockerfile (multi-stage: `node:20-alpine` build → `nginx:alpine` serve) and `docker-compose.yml`.
- Add `.github/workflows/build.yml`: builds the Docker image and pushes to GHCR on push to `main`.
- Add the pull-based deploy loop on the Mac: `check-and-deploy.sh` (polls GHCR manifest digest, pulls + recreates the container on change) plus a LaunchAgent plist to run it on a schedule.
- Add `cloudflared/config.yml` and set up the Cloudflare Tunnel as a persistent launchd service (`cloudflared service install`) — outbound-only, no inbound port. Domain name is collected interactively from the user during this step, not hardcoded in advance.
- Decide and document the Mac sleep-prevention approach (`caffeinate -s` vs. a system setting), since the tunnel and container die if the Mac sleeps.
- qa-security reviews and signs off (build verification, `npm audit`, Dockerfile hardening, tunnel/WAF config review, secret scan) before any push to `main` or `docker compose up`.

## Capabilities

### New Capabilities
- `infra/static-site-build`: Requirements for the 11ty build — pure static output (`_site/`), no server-side runtime assumptions, builds the approved launch post.
- `infra/container-image`: Requirements for the Docker multi-stage image — build stage, runtime stage, no secrets baked into layers.
- `infra/ci-publish`: Requirements for the GitHub Actions workflow that builds and publishes the image to GHCR on push to `main`.
- `infra/pull-deploy`: Requirements for the Mac-side pull-based deployment — polling script, digest comparison, LaunchAgent scheduling.
- `infra/public-exposure`: Requirements for the Cloudflare Tunnel — outbound-only, no inbound port ever opened, persistent launchd service, domain/DNS configuration.

### Modified Capabilities
(none — no existing infra capabilities)

## Impact

- New files under `src/`, `.eleventy.js`, `package.json` (owned by `fullstack-dev`).
- New files: `Dockerfile`, `docker-compose.yml`, `.github/workflows/build.yml`, `cloudflared/`, LaunchAgent plist(s), `check-and-deploy.sh` (owned by `devops-engineer`).
- `content-pipeline/published/behavioral-biometrics-bot-detection.md` becomes the source content copied/adapted into `src/content/posts/` (cross-team handoff, manual per `docs/fraud-blog-contentcreation-plan.md`).
- No changes to existing capabilities (none exist yet in the infra domain).
- Requires the user to supply a real domain name (already on Cloudflare DNS) during tunnel creation; no placeholder hostname is committed.
- Requires `qa-security` sign-off before any push to `main` or `docker compose up`, per `CLAUDE.md`'s workflow rule.
