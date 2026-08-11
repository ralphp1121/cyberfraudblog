## Why

The blog has an infra pipeline but no published content yet, and no defined standard for what a post in the "explainer" format must contain. This change both launches the blog's first post and establishes the reusable requirements for the explainer format, so later explainer posts (offense or defense side) have a concrete bar to meet.

## What Changes

- Add the blog's launch post: an explainer on how behavioral biometrics (mouse movement, typing cadence, touch/scroll patterns) let AI-driven defense systems distinguish bots from humans before a CAPTCHA challenge ever loads.
- Establish the `content/explainer-posts` capability: the requirements every explainer-format post (this one and future ones) must satisfy — mechanism-first structure, general-security-curious reading level, source citation standard, and AI offense/defense framing.
- This post fills the AI-Defense × Explainer quadrant of the content grid, pairing narratively with a future AI-Offense × Explainer post on bot CAPTCHA-solving (cross-link opportunity, not built in this change).

## Capabilities

### New Capabilities
- `content/explainer-posts`: Requirements for explainer-format blog posts — audience level, structure (mechanism before verdict), sourcing/citation standard, and this specific post's content requirements (behavioral biometrics topic, defense framing, evergreen/non-news-dependent).

### Modified Capabilities
(none — no existing capabilities)

## Impact

- New content file(s) under `src/` (owned by `fullstack-dev` per `CLAUDE.md`): the post itself as markdown/11ty content, plus any front matter or tags needed to mark it as the launch post.
- No infra, Docker, CI, or tunnel changes.
- No dependency or API changes.
