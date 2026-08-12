## Purpose

Defines what the CI pipeline is responsible for: building and publishing the Docker image to GHCR whenever `main` changes, without attempting any direct deployment to the Mac origin.

## ADDED Requirements

### Requirement: Build and push triggered on push to main
The GitHub Actions workflow SHALL build the Docker image and push it to GHCR whenever a commit is pushed to `main`.

#### Scenario: Push to main triggers publish
- **WHEN** a commit is pushed to `main`
- **THEN** the workflow runs, builds the Docker image, and pushes it to `ghcr.io` tagged `latest` (and/or a commit-specific tag)

### Requirement: No direct deployment from CI
The workflow SHALL NOT attempt to connect to, deploy to, or otherwise reach the Mac origin directly, since GitHub Actions cannot reach a machine behind no inbound ports.

#### Scenario: Workflow scope check
- **WHEN** the workflow file is reviewed
- **THEN** it contains only checkout, image build, and registry push steps — no SSH, webhook call, or other step that assumes reachability to the Mac

### Requirement: Uses ephemeral, scoped credentials
The workflow SHALL authenticate to GHCR using the built-in `GITHUB_TOKEN` (or an equivalent scoped, ephemeral credential), not a long-lived personal access token committed to the repo.

#### Scenario: Credential review
- **WHEN** the workflow's authentication step is reviewed
- **THEN** it uses `secrets.GITHUB_TOKEN` (or an org-managed equivalent) with no plaintext credential present in the workflow file or repo
