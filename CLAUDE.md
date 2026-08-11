# Cyber Fraud & Bot Attacks Blog

Static blog on bot-driven fraud in e-commerce/OTA and AI's effect on both fraud and defense. Full architecture: `docs/fraud-blog-infra-plan.md`.

**Stack:** Astro/Eleventy (11ty) content → Docker multi-stage build (node build stage → nginx) → image pushed to GHCR by GitHub Actions → pulled and run on a Mac origin via a pull-based polling script + LaunchAgent → exposed publicly only through an outbound Cloudflare Tunnel (no inbound ports ever).

## Team roles (see `.claude/agents/`)

| Agent | Owns (exclusive write access) |
|---|---|
| `devops-engineer` | `Dockerfile`, `docker-compose.yml`, `.github/workflows/`, `cloudflared/`, launchd/LaunchAgent plists, `check-and-deploy.sh`, `.gitignore`, all git/GitHub push operations, and repo-level files not claimed below (`README.md`, `docs/`) |
| `fullstack-dev` | `src/`, `.eleventy.js`, `package.json`, `package-lock.json`, front-end assets/content |
| `qa-security` | No files — read-only by design. Runs tests/checks and reports back; never edits another agent's files |

Every file in the repo has exactly one owner. If a task seems to need editing a file outside your table row, don't — message the owner instead (see Communication pathways below). If a new file/directory doesn't fit either row, it defaults to `devops-engineer` as repo steward until reassigned.

## Communication pathways

Don't assume another agent will infer what you need — name them explicitly with `SendMessage` and state the concrete file/change/check you need from them.

| From | To | When | About |
|---|---|---|---|
| `devops-engineer` | `qa-security` | Finishes any Docker/CI/tunnel/deploy change | "This is ready to check: `<what changed>`, verify with `<how to check it>`" |
| `fullstack-dev` | `qa-security` | Finishes any site/content change | "This is ready to check: `<what changed>`, verify with `<how to check it>`" |
| `qa-security` | `devops-engineer` or `fullstack-dev` (whoever owns the broken file) | Finds a failing build, vulnerability, or hardening gap | The exact command run, the exact failure/output, and why it matters |
| `devops-engineer` | `fullstack-dev` | Build needs something only fullstack owns (new npm script, build output path change) | The specific requirement, not a workaround |
| `fullstack-dev` | `devops-engineer` | Site needs something only devops owns (new build arg, Docker stage, CI step) | The specific requirement, not a workaround |
| `qa-security` | lead (you) | All checks pass, ready to sign off — or checks can't be run in this environment | Explicit sign-off statement, or explicit statement of what couldn't be verified |

## Workflow rule

Nothing gets committed to `main`, pushed, or deployed until `qa-security` has explicitly signed off in the same session. `devops-engineer` waits for that sign-off before pushing; `qa-security` waits until it has actually run the relevant checks before giving it.

## Non-negotiables from the infra plan

- The Cloudflare Tunnel is outbound-only — never open an inbound port on the home router, in any config or suggestion.
- No secrets (Cloudflare tunnel token/credentials JSON, GHCR auth, `.env`) get committed, printed, or baked into a Docker image layer.
- The 11ty site must remain a pure static build (`npx @11ty/eleventy` → `_site/`) — no server-side runtime assumptions, since it's served by nginx in the container.
- This blog is about fraud/bot threats — its own infra should not be the thing that gets compromised. Treat security review as a real gate, not a formality.
