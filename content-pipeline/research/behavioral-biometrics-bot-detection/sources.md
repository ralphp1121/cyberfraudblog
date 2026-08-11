# Sources: Behavioral Biometrics for Bot Detection (Launch Post)

Topic: `content-pipeline/topics.md` → "Behavioral biometrics for bot detection (launch post)"
OpenSpec change: `behavioral-biometrics-bot-blog-post`

Sourcing checklist applied: primary/official sources preferred; secondary sources marked;
sources older than 6 months flagged as potentially stale for current-tactic claims (not applicable
to sources used only for foundational/historical claims); evergreen requirement applied — sources
below are selected to support mechanism-level, general claims, not claims tied to a single dated
incident or statistic. Vendor examples are cited as illustrative only, not as the post's sole
factual spine.

---

## 1. Cloudflare — "Introducing Precursor: detecting agentic behavior with continuous client-side signals"

- **URL:** https://blog.cloudflare.com/introducing-precursor/
- **Publication date:** July 13, 2026
- **Type:** Primary (official vendor engineering/product blog)
- **Signal type(s) covered:** Mouse/pointer movement, typing/keyboard rhythm (timing, not keystrokes), scroll/focus/visibility signals
- **Supports claim:** Mechanism of how behavioral signals are collected client-side (lightweight JS event listeners on pointer movement, keyboard activity, focus changes, page visibility) and scored server-side by cross-referencing signal streams for internal consistency (e.g., pointer activity correlating with page visibility, keyboard events firing only when a text field is focused) across an entire session rather than a single checkpoint. Also directly supports the post's "scoring happens before/without a CAPTCHA" claim, since Precursor is explicitly positioned as continuous, passive, pre-challenge detection.
- **Staleness flag:** Published ~1 month ago (within 6-month freshness window) — not stale. Note for evergreen requirement: this is a live product announcement, so use it ONLY to illustrate the general mechanism (continuous passive behavioral scoring, session-level cross-referencing) — do NOT frame the post's core explanation around "Precursor" as a named product, since it could be rebranded/deprecated. Cite Cloudflare as an illustrative example of the broader technique, consistent with design.md's mitigation for this exact risk.
- **Paywall/citability check (Task 1.2):** Publicly linkable, no paywall, no login required, no reproduction of proprietary detection thresholds or scoring weights — safe to cite and link directly.

## 2. Ping Identity — "What Are Behavioral Biometrics? Types and Use Cases"

- **URL:** https://www.pingidentity.com/en/resources/blog/post/behavioral-biometrics.html
- **Publication date:** Originally published May 21, 2024; last updated May 18, 2026
- **Type:** Secondary (vendor educational/blog content, industry-recognized identity security vendor)
- **Signal type(s) covered:** All three — mouse movement, typing/keystroke dynamics, touch/swipe gestures
- **Supports claim:** General, vendor-agnostic mechanism explanation for all three signal types: keystroke dynamics via typing speed/rhythm/dwell time/flight time; mouse dynamics via cursor speed/movement fluidity/click pressure with straight-line/robotic movement as a bot indicator; touch/swipe dynamics via swipe speed/pressure/screen area/gesture pattern, with baseline-deviation as the general detection principle across all three. Good single source for cross-signal framing/definitions (useful for the post's "define term at first use" requirement).
- **Staleness flag:** Last updated within 6 months — not stale. Content is mechanism-level/definitional rather than tied to a dated statistic, so would remain usable even if it aged past 6 months.
- **Paywall/citability check (Task 1.2):** Publicly linkable, no paywall, no gated signup observed — safe to cite and link directly.

## 3. GeeTest — "What is Behavioral Biometrics?"

- **URL:** https://www.geetest.com/en/article/behavioral-biometrics-bot-detection
- **Publication date:** November 27, 2025
- **Type:** Secondary (vendor educational blog; GeeTest is a CAPTCHA/bot-defense vendor)
- **Signal type(s) covered:** All three — keystroke dynamics, mouse movement, touch gestures (mobile)
- **Supports claim:** Corroborating, independently-sourced mechanism description for all three signal types (typing rhythm/pressure, cursor trajectory naturalness/randomness vs. bot straight-line movement, mobile swipe/scroll/tap acceleration and pressure). Useful as a second source to triangulate the "curved/natural vs. straight/mechanical" mouse-movement claim and the general "baseline behavior + real-time deviation scoring" framing so the post isn't relying on a single vendor's description of the mechanism.
- **Staleness flag:** ~8.5 months old at time of writing (Nov 2025 → Aug 2026) — slightly past the 6-month freshness window for a "current tactics" claim. However, the claims cited from this source are mechanism-level/general (how the signal types work conceptually), not a specific dated statistic or current-attack-volume claim, so it falls under the "foundational/historical claim" exception. Flagging here for visibility; recommend verification-agent confirm the specific sentences drawn from it are indeed general-mechanism claims, not framed as "as of today" facts.
- **Paywall/citability check (Task 1.2):** Publicly linkable, no paywall, freely accessible — safe to cite and link directly.

## 4. Killourhy, K.S. & Maxion, R.A. — "Comparing Anomaly-Detection Algorithms for Keystroke Dynamics" (DSN 2009)

- **URL:** https://www.cs.cmu.edu/~maxion/pubs/KillourhyMaxion09.pdf (hosted on author's official Carnegie Mellon faculty page; companion benchmark dataset at https://www.cs.cmu.edu/~keystroke/)
- **Publication date:** 2009 (Proceedings of the 39th IEEE/IFIP International Conference on Dependable Systems & Networks, DSN-2009)
- **Type:** Primary (peer-reviewed academic paper, published by original authors, hosted on official CMU institutional page)
- **Signal type(s) covered:** Typing cadence / keystroke dynamics
- **Supports claim:** Foundational, historical-type claim — that keystroke timing (inter-key timing / "flight time" and "dwell time") has been rigorously studied and benchmarked as a behavioral biometric for over a decade, establishing the academic basis for typing-cadence-based detection that modern vendor tools (DataDome, Ping Identity, GeeTest, Cloudflare) build on operationally. This is exactly the kind of "has existed since X" foundational claim the sourcing checklist exempts from the 6-month staleness rule — used to ground the mechanism's legitimacy/history, not to claim anything about current bot tactics or current detection accuracy.
- **Staleness flag:** Not applicable — used only for the foundational/historical claim exception per the sourcing checklist.
- **Paywall/citability check (Task 1.2):** Publicly linkable PDF hosted directly on the author's institutional (cs.cmu.edu) page, no paywall, no login, and citing it does not require reproducing any proprietary vendor detection logic — safe to cite and link directly.

---

## Sources considered but not included (for transparency)

- **DataDome — "Bot Detection: How to Identify Bot Traffic"** (`datadome.co/guides/bot-protection/...`) and **"Behavioral Bot Classification for Advanced Fraud Detection"** (`datadome.co/anti-detect-tools/behavioral-bot-classification/`, published ~May 27, 2025): Strong mechanism-level content covering mouse movement, typing patterns, and scroll behavior (all three signal types) from a well-known bot-defense vendor. However, automated fetch tooling received an HTTP 403 on the anti-detect-tools page during this research pass, so I could not independently confirm current public accessibility/no-paywall status per the Task 1.2 checklist. Recommend the drafting/editor step manually confirm the page loads without a login wall before citing, or use as a secondary corroborating link only. Not included in the primary source list above to avoid citing something I couldn't personally verify as freely accessible.
- **Akamai — "Building an Effective Bot Management Strategy"** (`akamai.com/blog/security/...`, Jan 4, 2023): Official/primary vendor source, freely accessible, but on review only mentions mouse movement/keystrokes in passing (as an attacker evasion tactic) rather than explaining the defensive mechanism in depth — not detailed enough to support a specific mechanism claim. Also >6 months old. Could still be used as a general "vendors have used behavioral signals for years" supporting link if needed, but not required given sources 1-4 above already cover all three signal types with better depth.
- **BeCAPTCHA (arXiv 2005.13655), Acién et al., 2020** — "BeCAPTCHA: Behavioral Bot Detection using Touchscreen and Mobile Sensors benchmarked on HuMIdb": Peer-reviewed academic paper directly on touch/mobile-sensor bot detection (drag-and-drop + accelerometer data vs. synthetic bot samples). Good alternate/backup academic anchor for the touch/scroll signal type if the drafter wants a second academic citation alongside Killourhy & Maxion. Freely available on arXiv, no paywall. Not included as one of the core 4 only because Ping Identity + GeeTest already give solid, cross-corroborated touch/scroll coverage and the post only needs 2-4 sources per spec — but this is a strong bench source if verification-agent wants an academic citation specifically for touch/scroll to mirror the keystroke academic citation.
