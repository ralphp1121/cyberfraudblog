## Why

The current site (`base.njk` + `style.css`) is a bare scaffold: system fonts, an off-brand accent color (`#b3261e`), no logo, and a single post-list template with no article, archive, or about pages. A full editorial design system now exists (`docs/UIredesign_project/CyberFraudBlog-DESIGN.md`) with real tokens, a component inventory, and five mocked page layouts (`Redflag Blog - Selected Designs.md` / `Redflag Blog Mockups.dc.html`), plus a working typographic logo (`_logo.njk`/`logo.css`/`favicon.svg`). The blog needs to actually look like the analyst-grade product it's describing, and the design work to get there is done — it just hasn't been built.

## What Changes

- Introduce a token layer (color, typography, spacing, shape, elevation, motion) sourced from `CyberFraudBlog-DESIGN.md`, replacing the current ad hoc `:root` variables in `style.css`.
- Wire in the real redflag wordmark logo (`_logo.njk`, `logo.css`, `favicon.svg`) in place of the plain-text site title, per the sizing/placement rules in `redflag-logo.md`.
- Build the shared component set needed by the mocked pages: `Button`, `TextLink`, `TextInput`, `BadgePill`, `CategoryTab`, `FeatureCard`, `ProductMockupCard`, `HeroIllustrationCard` (dashed placeholder per the design doc — no real line-art exists), `ExpertCard`, plus layout primitives `TopNav` and `Footer`.
- Rebuild `base.njk` around the new `TopNav`/`Footer` and load Space Grotesk/Inter/IBM Plex Mono per the design doc.
- Implement the four page layouts from the selected-designs spec against the site's existing 3 posts: Home ("evidence-led" layout, desktop + mobile), Article, Archive, About/Contact. Pages needing content that doesn't exist yet (a 6-post archive, contributor bios, interview/residential-proxy/how-we-source posts) render with the subset of real content available today rather than invented copy.
- **BREAKING**: current `style.css` selectors (`.site-header`, `.site-title`, `.post-list`, etc.) are replaced; any content relying on the old class names must be updated.

## Capabilities

### New Capabilities
- `site-ui/design-system`: the token layer (color/type/space/shape/elevation/motion), logo integration, and the shared component inventory (Button, TextLink, TextInput, BadgePill, CategoryTab, FeatureCard, ProductMockupCard, HeroIllustrationCard, ExpertCard, TopNav, Footer) that every page is built from.
- `site-ui/page-templates`: the page-level layouts (home desktop, home mobile, article, archive, about/contact) that consume the design-system components and existing post content.

### Modified Capabilities
(none — no existing `openspec/specs/` capability covers front-end UI today; this is net-new)

## Impact

- **Affected code**: `src/_includes/base.njk`, `src/assets/css/style.css` (rewritten), new files under `src/_includes/` (components, layouts) and `src/assets/css/` (tokens, component styles), plus `src/favicon.svg` and font `<link>` tags. Owned entirely by `fullstack-dev` per `CLAUDE.md`.
- **Content**: no new markdown posts required this round; Home/Archive render only the 3 existing posts (Seat Spinning, Agentic AI/OTA scraping, Behavioral Biometrics) instead of the mocked 6.
- **No Docker/CI/tunnel/deploy impact** — pure static build output, no new build args or stages needed.
- **Gate**: per `CLAUDE.md` workflow rule, nothing merges/deploys until `qa-security` signs off in-session.
