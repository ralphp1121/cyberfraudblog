#!/bin/bash
set -euo pipefail

IMAGE="ghcr.io/ralphp1121/cyberfraudblog:latest"
DEPLOY_DIR="/Users/ralph/Documents/Claude/Projects/CyberFraudBlog"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.deploy.yml"
DIGEST_FILE="$DEPLOY_DIR/.last-digest"
LOG_TAG="check-and-deploy"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') [$LOG_TAG] $*"
}

if MANIFEST_OUTPUT=$(docker manifest inspect "$IMAGE" 2>&1); then
  MANIFEST_RC=0
else
  MANIFEST_RC=$?
fi

if [ "$MANIFEST_RC" -ne 0 ]; then
  log "manifest lookup for $IMAGE failed (exit $MANIFEST_RC), skipping this run: $MANIFEST_OUTPUT"
  exit 0
fi

LATEST=$(echo "$MANIFEST_OUTPUT" | shasum -a 256 | awk '{print $1}')

CURRENT=""
if [ -f "$DIGEST_FILE" ]; then
  CURRENT=$(cat "$DIGEST_FILE")
fi

if [ "$LATEST" == "$CURRENT" ]; then
  log "no change (digest $LATEST), skipping deploy"
  exit 0
fi

log "new digest detected (was: ${CURRENT:-none}, now: $LATEST), deploying"

docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d

echo "$LATEST" > "$DIGEST_FILE"
log "deploy complete, digest recorded"
