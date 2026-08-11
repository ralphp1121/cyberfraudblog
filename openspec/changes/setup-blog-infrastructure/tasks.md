## 1. Content handoff

- [x] 1.1 editor-agent moves `content-pipeline/drafts/behavioral-biometrics-bot-detection.md` to `content-pipeline/published/behavioral-biometrics-bot-detection.md` (already approved by user)

## 2. Site scaffold (fullstack-dev)

- [x] 2.1 Create `package.json` with `@11ty/eleventy` as a dependency and a build script
- [x] 2.2 Create `.eleventy.js` config (input/output dirs, passthrough copy for assets as needed)
- [x] 2.3 Create `src/` with one base layout providing shared site chrome (header/nav, footer)
- [x] 2.4 Copy/adapt `content-pipeline/published/behavioral-biometrics-bot-detection.md` into `src/content/posts/` as an 11ty-compatible markdown file, preserving front matter, body, and sources section
- [x] 2.5 Add a minimal index/listing page so the post is reachable from the site root
- [x] 2.6 Verify `npx @11ty/eleventy` builds cleanly and produces `_site/index.html` and the rendered post page
- [x] 2.7 Message qa-security: site build is ready to check, with the exact build command and expected output

## 3. Docker image (devops-engineer)

- [x] 3.1 Create `Dockerfile`: multi-stage build, `node:20-alpine` build stage running the 11ty build, `nginx:alpine` runtime stage copying only `_site/`
- [x] 3.2 Create `docker-compose.yml` exposing the container's port to `localhost` (matching the port the Cloudflare Tunnel ingress will target)
- [x] 3.3 Verify `docker build .` succeeds locally
- [x] 3.4 Verify `docker compose up -d` starts the container and an HTTP request to the published port returns the homepage with 200
- [x] 3.5 Message qa-security: image is ready to check, with the exact build/run commands and expected output

## 4. CI publish (devops-engineer)

- [x] 4.1 Create `.github/workflows/build.yml`: build and push the Docker image to GHCR on push to `main`, using `secrets.GITHUB_TOKEN` for registry auth
- [x] 4.2 Confirm image naming convention (`ghcr.io/<owner>/<repo>:latest`) matches what the poll script will check
- [x] 4.3 Message qa-security: workflow is ready to check (static review only, since it can't be triggered pre-push)

## 5. Pull-based deploy on the Mac (devops-engineer)

- [x] 5.1 Create `check-and-deploy.sh`: compares latest GHCR manifest digest against a persisted last-deployed digest, pulls and recreates the container via `docker compose` only on change
- [x] 5.2 Create the LaunchAgent plist to run `check-and-deploy.sh` on a 5–10 minute interval
- [x] 5.3 Verify the script is idempotent (a second run with no new digest makes no changes)
- [x] 5.4 Message qa-security: poll script and LaunchAgent are ready to check, with how to verify idempotency and scheduling

## 6. Public exposure via Cloudflare Tunnel (devops-engineer)

- [x] 6.1 Ask the user for the real domain name to use (must already be on Cloudflare DNS) before proceeding
- [x] 6.2 Run `cloudflared tunnel create` and obtain the tunnel ID and credentials file
- [x] 6.3 Create `cloudflared/config.yml` with the confirmed hostname routed to `http://localhost:<container-port>`, falling through to `http_status:404`
- [x] 6.4 Install `cloudflared` as a persistent launchd service (implemented as a separate LaunchAgent, `com.fraudblog.cloudflared.plist`, instead of `cloudflared service install` — see note below; created but not yet loaded)
- [x] 6.5 Confirm DNS record for the domain points at the tunnel (via Cloudflare dashboard or `cloudflared tunnel route dns`)
- [x] 6.6 Apply and document the Mac sleep-prevention approach (`caffeinate -s` or system setting)
- [x] 6.7 Message qa-security: tunnel config is ready to check, with how to verify outbound-only exposure and no secrets committed

## 7. QA and sign-off (qa-security)

- [x] 7.1 Run `npx @11ty/eleventy` and confirm clean build output
- [x] 7.2 Run `docker build .` and confirm success; review Dockerfile against the hardening checklist
- [x] 7.3 Run `npm audit` and review results
- [x] 7.4 Review `cloudflared/config.yml` and tunnel setup for outbound-only exposure (no inbound port anywhere)
- [x] 7.5 Scan repo and built image for committed secrets (tunnel credentials, GHCR tokens, `.env`)
- [x] 7.6 Review GitHub Actions workflow for credential handling and scope
- [x] 7.7 For any issue found, message the owning agent by name with the exact command/output and wait for a fix before re-checking
- [x] 7.8 Give explicit sign-off to the user and devops-engineer before any push to `main` or `docker compose up` against the public tunnel

## 8. Go live

- [ ] 8.1 devops-engineer pushes to `main` (only after qa-security sign-off)
- [ ] 8.2 Confirm GitHub Actions run succeeds and image lands in GHCR
- [ ] 8.3 Confirm the Mac's poll script picks up the new image within one polling interval and redeploys
- [ ] 8.4 Confirm the site is publicly reachable at the configured domain and the launch post renders correctly
