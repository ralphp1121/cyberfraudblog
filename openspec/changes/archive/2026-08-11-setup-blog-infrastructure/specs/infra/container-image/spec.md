## Purpose

Defines the contract for the Docker image that packages the built static site for deployment: a multi-stage build that keeps the runtime image minimal and never bakes secrets into any layer.

## ADDED Requirements

### Requirement: Multi-stage build separates build and runtime
The Dockerfile SHALL use a multi-stage build: a Node-based stage that installs dependencies and runs the 11ty build, and a separate nginx-based runtime stage that only contains the built static output.

#### Scenario: Image builds successfully
- **WHEN** `docker build .` is run against the repo
- **THEN** it completes successfully and produces a runnable image

#### Scenario: Runtime stage excludes build tooling
- **WHEN** the final image is inspected
- **THEN** it does not contain Node.js, npm, source markdown/content files, or the 11ty toolchain — only the compiled `_site/` output served by nginx

### Requirement: No secrets in image layers
No secret (Cloudflare tunnel token or credentials JSON, GHCR auth, `.env` contents, or any other credential) SHALL be present in any layer of the built image.

#### Scenario: Secret scan on built image
- **WHEN** the built image's layers are scanned for known secret patterns
- **THEN** no tunnel credentials, registry auth tokens, or `.env` values are found

### Requirement: Container serves site on expected port
The runtime container SHALL serve the built site over HTTP on a documented port (matching what `docker-compose.yml` and the Cloudflare Tunnel ingress config expect).

#### Scenario: Container responds after start
- **WHEN** the container is started via `docker compose up -d`
- **THEN** an HTTP request to the container's published port returns the site's homepage with a 200 status
