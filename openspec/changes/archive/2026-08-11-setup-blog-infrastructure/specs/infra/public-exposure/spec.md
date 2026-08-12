## Purpose

Defines how the blog is exposed to the public internet: exclusively via an outbound-only Cloudflare Tunnel, with no inbound port ever opened on the home router, and a persistent connection that survives reboots.

## ADDED Requirements

### Requirement: Outbound-only exposure
The site SHALL be reachable from the public internet only via an outbound Cloudflare Tunnel connection. No inbound port SHALL be opened on the home router or firewall, in any configuration.

#### Scenario: No inbound port configured
- **WHEN** the router/firewall configuration is reviewed
- **THEN** no port forwarding rule exists for the container's port or any other service related to the blog

#### Scenario: Tunnel is the only path in
- **WHEN** the Cloudflare Tunnel ingress config is reviewed
- **THEN** it routes the configured hostname to `http://localhost:<container-port>` and falls through to `http_status:404` for anything else

### Requirement: Domain confirmed with user before tunnel creation
The tunnel setup process SHALL prompt the user for the real domain name to use before creating the tunnel or writing `cloudflared/config.yml`. No placeholder hostname SHALL be committed as if it were the real domain.

#### Scenario: Domain requested interactively
- **WHEN** the tunnel creation step is reached
- **THEN** the user is asked to confirm the domain name (already on Cloudflare DNS) before `cloudflared tunnel create` is run

### Requirement: Tunnel runs as a persistent service
`cloudflared` SHALL run as a persistent launchd service, not as a foreground process, so it survives reboots and terminal closure. `cloudflared service install` is the default mechanism; a separately-labeled, independent LaunchAgent is an acceptable substitute when the shared system service slot is already claimed by an unrelated tunnel on the same machine, provided the substitute does not modify or interfere with that existing service.

#### Scenario: Tunnel survives reboot
- **WHEN** the Mac reboots
- **THEN** the blog's `cloudflared` launchd job starts automatically and re-establishes the tunnel connection without manual intervention

#### Scenario: Coexistence with an unrelated existing tunnel
- **WHEN** the Mac already runs a different Cloudflare Tunnel as a system-wide `cloudflared` LaunchDaemon for an unrelated project
- **THEN** the blog's tunnel runs as a separate, independently-labeled launchd job that does not modify, replace, or depend on the existing service, and both tunnels operate independently

### Requirement: No tunnel secrets committed
The tunnel credentials file and tunnel token SHALL NOT be committed to the repository, printed in logs, or baked into any Docker image layer.

#### Scenario: Secret scan on repo and image
- **WHEN** the repository history and built Docker image are scanned for the tunnel credentials file or token
- **THEN** neither is found in either location

### Requirement: Mac sleep prevention documented and applied
A sleep-prevention approach (`caffeinate -s` or an equivalent system setting) SHALL be applied to the Mac while the tunnel needs to stay up, since sleep breaks both the tunnel and the container.

#### Scenario: Mac does not sleep during tunnel uptime
- **WHEN** the Mac is left idle with the tunnel and container running
- **THEN** it does not enter sleep, and the site remains reachable
