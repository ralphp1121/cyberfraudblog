# Research Notes: Behavioral Biometrics for Bot Detection (Launch Post)

For `editor-agent` / whoever drafts this post. Not a draft — just supporting notes from sourcing.

## Coverage check against design.md's signal breakdown

The post structure calls for 2-3 concrete signal types with how each is machine-scored:

1. **Mouse movement / jitter patterns** — covered by all 4 sources. Common mechanism thread across
   sources: humans produce curved trajectories with micro-corrections, variable velocity/acceleration,
   and small involuntary tremor ("jitter"); bots historically produced straight-line or overly-smooth
   mathematically-interpolated paths. Cloudflare's post frames this nicely in plain language: human
   movement follows physical constraints (arc patterns from wrist pivots, hand tremor, cognitive delay
   before clicking) that are hard to fake convincingly over a full session.
2. **Typing cadence** — covered by Ping Identity, GeeTest (vendor/mechanism level) and Killourhy &
   Maxion (academic/foundational level — "dwell time" = how long a key is held, "flight time" = gap
   between keystrokes). Cloudflare's Precursor also captures keyboard *timing/rhythm* without logging
   actual keystrokes, which is a nice detail for the post's privacy-consciousness (readers may wonder
   "wait, is the site logging what I type?" — answer per Cloudflare: no, just rhythm).
3. **Touch/scroll gestures** — covered by Ping Identity and GeeTest at the mechanism level (swipe
   speed, pressure, screen area, scroll acceleration/deceleration vs. uniform/scripted scroll jumps).
   BeCAPTCHA (arXiv, noted in sources.md as a backup) is available if the drafter wants an academic
   citation specifically for touch, mirroring the Killourhy & Maxion academic citation for typing.

All three signal types required by the spec (`specs/content/explainer-posts/spec.md`, "Launch post
explains behavioral biometrics for bot detection") are covered by at least 2 independent sources each.

## Pre-CAPTCHA / passive scoring claim

The spec explicitly requires the post to convey that "scoring can occur passively, before or without
a CAPTCHA challenge." The Cloudflare Precursor source is the strongest direct support for this: it's
explicitly positioned as continuous background scoring across a full session, contrasted with static
CAPTCHA checkpoints, and is described as an *optional complement* to Cloudflare's own CAPTCHA-like
product (Turnstile) — i.e., a real-world example of a system explicitly designed to let a session pass
without ever showing a challenge if behavioral confidence is high enough. Good concrete anchor for
that claim without over-relying on Cloudflare as the post's only source (the general mechanism —
continuous behavioral scoring feeding a risk score that determines whether a challenge is even shown —
is also implicit in how DataDome/GeeTest describe combining behavioral scores into an overall bot
probability before deciding on a challenge/block/allow action).

## Evergreen-requirement watch-outs for the drafter

- Don't center the post's explanation on "Cloudflare Precursor" as a product name/feature — it launched
  ~1 month before this research (July 2026) and could be renamed or folded into another product. Use
  it as one illustrative example ("for instance, Cloudflare's behavioral detection product...") while
  keeping the core mechanism explanation vendor-neutral, per design.md's own risk mitigation.
- Avoid citing any specific bot-attack statistic, breach, or incident as the reason behavioral
  biometrics matters — the "why this matters" framing should stay general (e.g., "as bots got better at
  passing device fingerprinting and solving CAPTCHAs, defenders needed a signal harder to fake" —
  general trend, not a dated event).
- The Killourhy & Maxion 2009 paper is intentionally old — that's the point. It's cited only to show
  typing-cadence biometrics is a mature, well-studied technique, not a claim about current bot tactics.
  Frame it that way in-text if cited directly (e.g., "researchers have studied typing rhythm as an
  identity signal since at least the late 2000s") rather than implying it describes today's systems.

## Open item flagged during sourcing (informational, not blocking)

DataDome's `datadome.co/anti-detect-tools/behavioral-bot-classification/` page has strong, relevant
mechanism content covering all three signal types but returned an HTTP 403 to automated fetch tooling
during this research pass — could be a bot-protection measure on their own site (a little ironic, but
plausible) or a transient block. If the drafter wants to use DataDome as a named illustrative example
alongside Cloudflare, manually check the page loads in a normal browser first. Not used as a primary
citation in sources.md because I could not personally confirm free public accessibility.
