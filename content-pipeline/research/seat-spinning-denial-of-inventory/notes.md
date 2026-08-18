# Notes: Seat Spinning / Denial-of-Inventory (self-verification pass)

This topic was researched and drafted in a single Cowork session (no separate research-agent /
verification-agent / editor-agent instances were run — one session did all three roles in
sequence, applying each role's checklist explicitly). Recording that here for transparency, and
doing the verification-agent-equivalent check explicitly below rather than skipping it.

## Source-stage check (verification-agent's checklist, applied to `sources.md`)

- **Source ranking:** 3 of 5 sources are primary vendor material (Cequence, DataDome, Imperva/Thales); 2 are secondary vendor educational content (HUMAN Security, GeeTest). No unranked sources. Meets the "primary preferred, secondary marked" bar.
- **Freshness:** 3 of 5 sources are within the 6-month window (Cequence, DataDome, Imperva). 1 (GeeTest) is ~11 months since last update and is flagged and restricted to mechanism-only use. 1 (HUMAN Security) has no visible date and is also restricted to mechanism-only use. Both flags are explicit in `sources.md`, not buried.
- **Completeness:** Every entry has URL, date (or explicit "no date available" note), and a specific claim it supports. Meets the bar.
- **Accuracy spot-check:** For each source, I compared the extracted claim against the actual fetched page content (not just confirming the URL resolves) before writing it into `sources.md`. The one exception is source 3 (Imperva), where the primary URL blocked automated fetching — I cross-checked its figures against two independent secondary summaries that agree with each other, but did **not** verify against the original PDF/report directly. This is the one open gap in this research pass; flagged both here and in `sources.md` and in the `topics.md` entry.

## Draft-stage check (verification-agent's checklist, applied to `drafts/seat-spinning-denial-of-inventory.md`)

- **Traceability:** Every factual claim and statistic in the draft traces to one of the 5 numbered sources above. I did not introduce any claim, statistic, or named company that isn't backed by `sources.md`.
- **No dated stats drawn from the two flagged/undated sources:** Confirmed HUMAN Security (source 4) and GeeTest (source 5) are used in the draft only for mechanism/motive-distinction claims, not for any statistic or "current state" claim.
- **The excluded sneaker-market stat did not make it into the draft:** Confirmed — the $30B/70% figures from the "sources considered but not included" section are not referenced anywhere in the draft text.

## Open items for the user / a fresh verification pass to decide

1. Whether the Imperva/Thales 2026 figures need a stricter primary-source confirmation (direct PDF read) before publication, given the access issue noted in `sources.md` source 3.
2. Whether to swap the GeeTest mechanism claim (checkout hold-window exploitation) for a fresher source if one turns up, since it's the most borderline-stale citation in the set.
3. This draft broadens the topic from the original "OTA-only" framing (as proposed in `topics.md`) to ecommerce generally, per the user's original brief ("persistent and sophisticated scraping techniques targeting ecommerce websites"). Confirm that broader framing is what's wanted before treating this as final — it was not re-confirmed with the user after the initial topic pick.
