# Sources: Seat Spinning / Denial-of-Inventory Attacks in Ecommerce

Topic: `content-pipeline/topics.md` → "Seat Spinning: The Bot Attack That Empties Your Cart Without Ever Buying"
Slug: `seat-spinning-denial-of-inventory`

Sourcing checklist applied: primary/official sources preferred; secondary sources marked;
sources older than 6 months flagged as potentially stale for current-tactic/data claims, unless
the claim is foundational/mechanism-level rather than about current tactics or current data.
Every entry below includes URL, publication/update date, type, and the specific claim it supports.

---

## 1. Cequence Security — "Airline Seat Spinning: An Illustration of Sophisticated Fraud"

- **URL:** https://www.cequence.ai/blog/bot-management/seat-spinning-fraud/
- **Publication date:** February 24, 2026
- **Type:** Primary (official vendor threat-research blog; Cequence is an API/bot-security vendor)
- **Supports claim:** The core definition of seat spinning — bots repeatedly placing airline seats into a pending-reservation state without completing purchase, letting holds expire, and creating artificial scarcity in booking systems. Also the three-part evasion mechanism this post leans on: (1) it happens pre-login/pre-payment, before CAPTCHA challenges typically trigger; (2) bots rotate across residential proxies and cloud infrastructure, so IP-reputation blocking causes false positives with minimal real impact; (3) WAFs are built for syntactic attacks and can't distinguish a legitimate repeated-browse pattern from repeated seat holds with no purchase intent. Also supports the "markets with long no-cost hold windows, historically common in parts of Asia-Pacific" detail.
- **Staleness flag:** ~6 months old at time of writing — within the freshness window, not stale.
- **Paywall/citability check:** Publicly linkable, no paywall, no login required — safe to cite and link directly.

## 2. DataDome — "Shopping Bots: How to Prevent Denial of Inventory Attacks"

- **URL:** https://datadome.co/learning-center/prevent-shopping-bots-denial-of-inventory-attacks/
- **Publication date:** Originally published September 16, 2022; last updated April 14, 2026.
- **Type:** Primary (official vendor learning-center content; DataDome is a bot/fraud-defense vendor)
- **Supports claim:** The ecommerce-general (not airline-specific) definition of denial-of-inventory: a bot repeatedly adds a product to cart without completing the transaction, tricking the site into registering stock as depleted. Also supports the claim that newer denial-of-inventory bots are behaviorally sophisticated enough to mimic legitimate buyers, and use rotating IPs/proxy infrastructure to mask identity — which is why signature-based, CAPTCHA-only, and basic IP-blocking defenses are insufficient alone.
- **Staleness flag:** Actively maintained (updated within the last 6 months) — not stale. Note: the underlying page dates to 2022; used here only for the mechanism-level definition and evasion pattern, not for any dated statistic, consistent with the evergreen/foundational exception.
- **Paywall/citability check:** Publicly linkable, no paywall, no login required — safe to cite and link directly.

## 3. Thales / Imperva — "2026 Bad Bot Report: Bots in the Agentic Age"

- **URL:** https://www.imperva.com/blog/bad-bot-report-2026-bots-agentic-age/ (see staleness/access note below)
- **Publication date:** April 2026
- **Type:** Primary (official annual vendor threat-intelligence report; Imperva/Thales's Bad Bot Report is the industry's most-cited annual bot-traffic benchmark)
- **Supports claim:** The hard numbers this post leans on: bad bots made up 40% of all internet traffic in 2025 (+3 percentage points year-over-year), with total bot traffic (good + bad) at 53%. Retail specifically saw business-logic abuse — the category seat spinning and denial-of-inventory both fall under — account for 24% of isolated retail incidents, and the report explicitly names "seat spinning and denial-of-inventory" as retail-sector bot tactics that hoard products or block legitimate transactions. Also supports the AI-agent framing: AI-driven bot incidents rose 12.5x year-over-year (from roughly 2 million to 25 million daily blocked AI incidents), split between AI crawlers (85% of AI traffic) and AI fetchers (15%).
- **Staleness flag:** ~4 months old at time of writing — within the freshness window, not stale.
- **Access note (important — flag for verification-agent/user):** The direct Imperva blog URL returned an automated bot-detection interstitial to this research pass's fetch tooling (the bad-bot report blocking bots trying to read it, which is at least thematically fitting). The figures above were cross-verified via two independent secondary summaries — deepstrike.io's "Bot Attack Statistics 2026" (updated July 28, 2026) and softprom.com's report summary — which independently agree on the 40%/53% and 12.5x figures, giving reasonable confidence the numbers are accurate. Recommend verification-agent or the user attempt a direct fetch/PDF download of the original Imperva report before publication if stricter primary-source confirmation is wanted; I could not do so with available tooling.
- **Secondary corroboration used:**
  - deepstrike.io, "Bot Attack Statistics 2026" — https://deepstrike.io/blog/bot-attack-statistics — published July 6, 2026, updated July 28, 2026
  - softprom.com, "Thales (Imperva) Bad Bot Report 2026" — https://softprom.com/thales-imperva-bad-bot-report-2026-en

## 4. HUMAN Security — "What are denial of inventory and scalping attacks?"

- **URL:** https://www.humansecurity.com/learn/topics/what-are-denial-of-inventory-and-scalping-attacks/
- **Publication date:** Not shown on the page (evergreen "learn" topic hub, not a dated blog post).
- **Type:** Secondary (vendor educational content; HUMAN Security, formerly PerimeterX, is a recognized bot/fraud-defense vendor)
- **Supports claim:** The distinction this post draws between denial-of-inventory bots (motive: competitive sabotage / blocking rivals' customers, not profit) and scalping bots (motive: buy low-availability goods to resell at a markup) — these are related but mechanically and motivationally distinct attacks that get conflated. Also supports the general claim that signature-based and WAF defenses fail because "modern bots are quick to morph" and increasingly mimic human behavior.
- **Staleness flag:** No publication date available, so freshness can't be confirmed directly. Used only for mechanism-level/definitional claims (motive distinction, why static defenses fail), not for any statistic or claim about current attack volume — falls under the foundational/mechanism exception. Flagging for verification-agent: confirm no dated statistic from this source made it into the draft.
- **Paywall/citability check:** Publicly linkable, no paywall, no login required — safe to cite and link directly.

## 5. GeeTest — "Inventory Bots Explained: How to Stop Denial of Inventory Attack?"

- **URL:** https://www.geetest.com/en/article/inventory-bots-and-denial-of-inventory-attacks
- **Publication date:** September 23, 2022; last updated September 12, 2025.
- **Type:** Secondary (vendor educational blog; GeeTest is a CAPTCHA/bot-defense vendor)
- **Supports claim:** The mechanical detail that denial-of-inventory bots typically exploit a site's time-to-checkout hold window (the piece cites ~15 minutes as a common policy) to hold items without ever paying, and can be pointed at specific SKUs to deplete them thousands of times over. Also a second, independent source for the "competitive sabotage, not resale" motive distinction (corroborating source 4).
- **Staleness flag:** ~11 months since last update as of this writing — past the 6-month freshness window. The claims drawn from it here are mechanism-level (how checkout hold windows get exploited) rather than about current attack volume or current tactics, so it's used under the foundational/mechanism exception — but flagging explicitly per the checklist since it's borderline (an 11-month-old "last updated" stamp is not as reassuring as source 2's 4-month-old one). Recommend a second, fresher source if this specific mechanism claim needs stronger backing before publication.
- **Paywall/citability check:** Publicly linkable, no paywall, no login required — safe to cite and link directly.

---

## Sources considered but not included (for transparency)

- **Impart Security — "What Your WAF Misses: Denial of Inventory"** (`impart.ai/blog/...`): Directly on-topic (WAF limitations against denial-of-inventory), but the URL is disallowed by the site's `robots.txt` for automated fetching, so I could not verify its content, date, or citability. Not included since I couldn't confirm what it actually says. Worth a manual read if the drafter wants a second WAF-specific citation.
- **Arkose Labs — "'Tis the Season for Denial of Inventory Attacks"** (`arkoselabs.com/blog/...`): On-topic vendor blog, but the fetched content was mostly site navigation/blog-index chrome rather than the article body, so I couldn't extract a specific date or verifiable claim. Not included; would need a direct, cleaner fetch to use.
- **HUMAN Security's own cited stat — sneaker resale market "$30 billion globally by 2030" and "bots account for over 70% of traffic during limited-edition sneaker sales":** Traced the $30B figure back to a 2019 Cowen & Co. estimate reported via Yahoo Finance — a 6-plus-year-old projection, not a current-tactics stat, and outside this checklist's comfort zone even under the foundational exception since it's a market-size forecast rather than a mechanism claim. Deliberately excluded from the draft rather than cited with a stale attribution.
- **STCLab / Imperva travel bad-bot data (originally flagged in `topics.md` as a Jan 23, 2026 candidate):** Superseded by source 3 above (the April 2026 Imperva/Thales report), which is fresher and covers the same publisher's data more directly and with retail-specific figures. Not pursued separately to avoid citing two overlapping vintages of the same vendor's data.
- **Travel Weekly AU coverage (flagged in `topics.md`, date unconfirmed):** Not pursued. Since the draft broadens scope from OTA-only to ecommerce generally (per the user's brief), the Imperva retail figures and Cequence's airline-specific mechanism detail together already cover both the travel and general-retail angles without needing this additional secondary trade-press source.
