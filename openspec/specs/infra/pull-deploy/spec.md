## Purpose

Defines the pull-based deployment contract on the Mac origin: a scheduled poll for new images and an idempotent redeploy, since GitHub cannot push to the Mac directly.

## Requirements

### Requirement: Scheduled polling for new image
A scheduled job (LaunchAgent) SHALL periodically check GHCR for a new image digest, on an interval of 5–10 minutes.

#### Scenario: LaunchAgent runs on schedule
- **WHEN** the LaunchAgent is loaded via `launchctl`
- **THEN** it invokes the poll script at the configured interval without requiring manual intervention

### Requirement: Redeploy only on digest change
The poll script SHALL compare the latest GHCR image digest against the last-deployed digest and only pull and recreate the container when they differ.

#### Scenario: No-op when unchanged
- **WHEN** the poll script runs and the latest digest matches the stored last-deployed digest
- **THEN** it makes no changes to the running container

#### Scenario: Redeploy on new digest
- **WHEN** the poll script runs and the latest digest differs from the stored last-deployed digest
- **THEN** it pulls the new image, recreates the container via `docker compose up -d`, and updates the stored digest

### Requirement: Deploy state persists across polls
The last-deployed digest SHALL be persisted to disk between poll runs so state survives script restarts and Mac reboots.

#### Scenario: State survives restart
- **WHEN** the Mac reboots and the LaunchAgent reloads
- **THEN** the poll script reads the previously stored digest rather than treating every image as new
