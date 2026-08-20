## Context

See `proposal.md` - Why. Source material: `docs/UIredesign_project/CyberFraudBlog-DESIGN.md` (tokens, components, voice), `Redflag Blog - Selected Designs.md` (page layouts), `Redflag Blog Mockups.dc.html` (reference markup/class structure per component), and the logo handoff (`_logo.njk`, `logo.css`, `favicon.svg`, `redflag-logo.md`). Current build is 11ty (Nunjucks templates, `src/_includes/base.njk`) → static `_site/` → nginx container, per `CLAUDE.md`; this change stays within that pure-static-build constraint. `fullstack-dev` owns all touched files (`src/`, `.eleventy.js`, `package.json`).

## Goals / Non-Goals

**Goals:**
- Establish the token layer and component library as reusable Nunjucks includes/macros, not per-page copy-pasted markup.
- Ship all four page layouts (home, article, archive, about) working against the 3 posts that exist today.
- Keep the mockup's exact visual spec (colors, spacing, type scale, component variants) rather than approximating it.

**Non-Goals:**
- No new content (contributor bios, About copy, interview/residential-proxy/how-we-source posts) — out of scope per user decision; pages render with the content subset available today.
- No icon asset pipeline decision beyond what the design doc specifies (Lucide via `unpkg.com/lucide-static` `<img>` tags) — swapping to a house icon set is a future concern.
- No dark mode, social/OG templates, or chart/data-viz styling — explicitly undefined in the source design doc.
- No changes to `Dockerfile`, CI, or deploy — `devops-engineer` and `qa-security` are not implementation owners here, only `qa-security` gates sign-off.

## Decisions

**Tokens as a dedicated CSS file, imported first.** Create `src/assets/css/tokens.css` holding all `:root` custom properties from `CyberFraudBlog-DESIGN.md` (color, typography, spacing, shape, elevation, motion), imported at the top of `style.css` via `@import "tokens.css";`. Alternative considered: inline all tokens directly in `style.css` — rejected because the token sheet is large (~80 variables) and keeping it separate makes future palette/scale changes a single-file diff, matching how the logo handoff already expects `logo.css` to consume `--ink`/`--crimson`/`--coral`/`--text-on-dark`.

**Components as Nunjucks macros in one `_components.njk`, not one file per component.** 11ty/Nunjucks macros are cheap to define; a single file with `{% macro Button(...) %}` etc. keeps call sites simple (`{% from "_components.njk" import Button %}`) and avoids a proliferation of tiny include files for what are essentially styled HTML snippets with variant params. Layout primitives (`TopNav`, `Footer`) get their own includes (`_nav.njk`, `_footer.njk`) since they're used exactly once per page and are large enough to warrant their own file.

**Page layouts as 11ty layout templates, not JS front-end framework components.** The stack is static Nunjucks/11ty (per `CLAUDE.md`: "pure static build, no server-side runtime assumptions"). Each of the 4 page types becomes an 11ty layout (`layouts/home.njk`, `layouts/article.njk`, `layouts/archive.njk`, `layouts/about.njk`) extending `base.njk`. No client-side JS framework is introduced; the only JS this change needs is a plain mobile-menu toggle.

**Icons via Lucide static SVG-as-`<img>`, per the design doc's own substitution note.** The design doc already flags this as a substitution (no house icon set exists) and specifies the exact mechanism (`<img>`, not CSS mask, explicit ink/onDark color prop). Implement as a small `Icon` macro wrapping `<img src="https://unpkg.com/lucide-static/icons/{{ name }}.svg">` with a CSS filter approach for the ink/onDark colorways, since raw Lucide SVGs are single-color and `<img>` can't use `currentColor`.

**Missing-content pages use conditional rendering, not fabricated data.** Where a layout expects content that doesn't exist (6-post archive, contributor bios, an interview post), the 11ty data layer (`src/content/posts` collection) is the single source of truth — templates loop over whatever exists rather than a hardcoded mock array. Sections with zero real data (e.g., a contributors collection that doesn't exist yet) are omitted from the rendered page rather than stubbed with placeholder names, per the user's "UI/templates only" scope decision.

## Risks / Trade-offs

- **[Risk]** Reconstructing exact pixel-for-pixel layout from the `.dc.html` mockup by hand is error-prone (it's a design-tool export, not source CSS) → **Mitigation**: cross-reference every component's inline `style="..."` attributes in the mockup against the token names in `CyberFraudBlog-DESIGN.md` before writing each component's CSS; qa-security's review should include a visual diff against the mockup for at least the home and article pages.
- **[Risk]** Home/Archive pages look sparse with only 3 posts instead of the mocked 6, particularly the "more this week" mosaic and stat-grid band which assume a fuller content set → **Mitigation**: accepted trade-off per user's explicit scope decision; layouts must degrade gracefully (no broken grid cells) when fewer posts exist, not just work at exactly 6.
- **[Risk]** Google Fonts CDN dependency (Space Grotesk/Inter/IBM Plex Mono) adds an external network call the current site doesn't have → **Mitigation**: matches the logo handoff's own instructions (`redflag-logo.md` already specifies the CDN link and notes self-hosting as a future swap); no action needed now, flagged for `qa-security` awareness only.
- **[Risk]** `.dc.html`'s `x-import component-from-global-scope="...Button"` markup is a design-tool artifact, not real HTML — implementers must not copy it verbatim → **Mitigation**: design.md's component decision above makes explicit that components are reimplemented as Nunjucks macros using the *visual* spec (padding/radius/color/variant) from the surrounding inline styles, not the `x-import` tags themselves.

## Migration Plan

1. Add `tokens.css`, update `style.css` to import it and remove the old ad hoc `:root` block.
2. Copy logo files in (`_logo.njk`, `logo.css`, `favicon.svg`) per `redflag-logo.md` steps 3-5; wire font `<link>` tags into `base.njk`.
3. Build `_components.njk` macros bottom-up: primitives first (`Button`, `TextLink`, `TextInput`, `BadgePill`, `CategoryTab`), then cards (`FeatureCard`, `ProductMockupCard`, `HeroIllustrationCard`, `ExpertCard`), then layout (`TopNav`, `Footer`).
4. Rebuild `base.njk` around `TopNav`/`Footer`.
5. Build page layouts in order: Home (desktop, then mobile responsive pass) → Article → Archive → About.
6. Hand off to `qa-security` for build verification, visual/spec conformance check against the mockup, and content/link checks before anything is committed, per the `CLAUDE.md` workflow rule.

Rollback is trivial and low-risk: this is a static front-end-only change with no data migration, so reverting is a normal git revert with no deploy-state cleanup.

## Open Questions

None — all decisions needed to start implementation are resolved above; remaining detail (e.g. exact Lucide icon color-swap CSS) is an implementation detail for `fullstack-dev`, not a spec- or approach-level unknown.
