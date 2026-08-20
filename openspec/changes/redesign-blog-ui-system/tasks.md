## 1. Tokens

- [x] 1.1 Create `src/assets/css/tokens.css` with all color tokens (neutrals, brand accents, semantic hues, action, text, surface, line, accent-card, status) from `CyberFraudBlog-DESIGN.md`
- [x] 1.2 Add typography tokens (font-family stacks, full display/title/body/caption/button/nav-link scale) to `tokens.css`, and add the Google Fonts `@import` for Space Grotesk/Inter/IBM Plex Mono
- [x] 1.3 Add spacing tokens (4px scale through `--space-section`, container/gutter, card padding, band padding, control/nav height) to `tokens.css`
- [x] 1.4 Add shape tokens (radius scale, border widths) and elevation tokens (shadow-none/hover/overlay) to `tokens.css`
- [x] 1.5 Add motion tokens (durations, easing) to `tokens.css`
- [x] 1.6 Update `src/assets/css/style.css` to `@import "tokens.css";` first and remove the old ad hoc `:root` block (`--fg`, `--bg`, `--accent: #b3261e`, `--muted`)

## 2. Logo integration

- [x] 2.1 Copy `docs/UIredesign_project/_logo.njk` to `src/_includes/_logo.njk`
- [x] 2.2 Copy `docs/UIredesign_project/logo.css` to `src/assets/css/logo.css` and `@import` it from `style.css`
- [x] 2.3 Copy `docs/UIredesign_project/favicon.svg` to `src/favicon.svg` and add it as a passthrough copy in `.eleventy.js`
- [x] 2.4 Add the font `<link>` preconnect/stylesheet tags to `base.njk` `<head>`, above the stylesheet link, per `redflag-logo.md`
- [x] 2.5 Add favicon and `theme-color` `<link>`/`<meta>` tags to `base.njk` `<head>`

## 3. Shared components

- [x] 3.1 Create `src/_includes/_components.njk` with `Button` macro (variant: primary/secondary/onColor/textLink; size: md/sm; disabled; iconLeft/iconRight)
- [x] 3.2 Add `TextLink` macro (tone: ink/muted/onDark) to `_components.njk`
- [x] 3.3 Add `TextInput` macro (state: default/focused/error) to `_components.njk`
- [x] 3.4 Add `BadgePill` macro (tone: neutral/severity/defense/analysis/threat/community/telemetry/outline; uppercase) to `_components.njk`
- [x] 3.5 Add `CategoryTab` macro (active state) to `_components.njk`
- [x] 3.6 Add `Icon` macro (Lucide static SVG via `<img>`, ink/onDark color prop) to `_components.njk`
- [x] 3.7 Add `FeatureCard` macro (tone: crimson/teal/violet/amber/gold/cream; eyebrow/title/body/figure/footer slots) to `_components.njk`
- [x] 3.8 Add `ProductMockupCard` macro (dark shell, mono evidence artifact content) to `_components.njk`
- [x] 3.9 Add `HeroIllustrationCard` macro (dashed placeholder well, aspect-ratio param) to `_components.njk`
- [x] 3.10 Add `ExpertCard` macro (avatar monogram, name, specialization, optional action button) to `_components.njk`

## 4. Layout primitives

- [x] 4.1 Create `src/_includes/_nav.njk` (`TopNav`): logo + Home/Articles/Topics/About links + search icon + Subscribe button, 64px, non-sticky, 1280px container
- [x] 4.2 Add mobile nav variant to `_nav.njk`: logo (~24px) + hamburger icon, and the full-height menu overlay (nav list + email input + Subscribe button)
- [x] 4.3 Create `src/_includes/_footer.njk` (`Footer`): 4-column grid (logo+tagline, Reading, Research, About links), hairline rule, legal line
- [x] 4.4 Rebuild `src/_includes/base.njk` to use `_nav.njk` and `_footer.njk` in place of the current inline header/footer markup

## 5. Home page

- [x] 5.1 Create `src/_includes/layouts/home.njk` extending `base.njk`
- [x] 5.2 Build hero: eyebrow + H1 (56px) + subhead + Subscribe/Read-the-latest buttons (left), dark `ProductMockupCard` "Live signal · anon-4471" (right), 7/5 split
- [x] 5.3 Build lead attack band: large crimson `FeatureCard` sourced from the Seat Spinning post's real frontmatter + 2×2 stat grid (bordered content cells)
- [x] 5.4 Build "more this week" mosaic using only posts present in `src/content/posts` (agentic AI spans 2 cols, behavioral biometrics spans 1); verify the grid degrades cleanly with fewer than 4 posts
- [x] 5.5 Contributors row — omitted entirely, no contributor data source exists yet (per design.md's "conditional rendering, not fabricated data" decision); no names invented
- [x] 5.6 Build `CtaBand` ("Stop guessing, start detecting") with email `TextInput` + Subscribe `Button` + `HeroIllustrationCard` placeholder
- [x] 5.7 Add mobile responsive styles: 64px nav+hamburger, 36px H1, horizontally-scrolling `CategoryTab` row, single-column stacked full-width `FeatureCard`s, in-flow (not fixed) bottom subscribe bar

## 6. Article page

- [x] 6.1 Create `src/_includes/layouts/article.njk` extending `base.njk`
- [x] 6.2 Build breadcrumb (Home › Articles › category) with chevron-right icons, sourced from post frontmatter
- [x] 6.3 Build header: badges (severity/category + read time) + H1 (56px) + dek (18px/500) + byline (32px avatar monogram + name + date), `HeroIllustrationCard` (4:3) on the right
- [x] 6.4 Build body column (`--measure-article` = 68ch): lead paragraph, "What it actually is" section, dark `ProductMockupCard` trace, bordered blockquote, "What this piece hasn't covered" section, Sources list from post frontmatter
- [x] 6.5 Build sticky-in-column aside: teal "Weekly brief" subscribe `FeatureCard` + "In this piece" mini-TOC card
- [x] 6.6 Build "Related analysis" band: up to 3 `FeatureCard`s from other existing posts, excluding the current post
- [x] 6.7 Wire `article.njk` as the layout for all files in `src/content/posts`

## 7. Archive page

- [x] 7.1 Create `src/_includes/layouts/archive.njk` (or page template) extending `base.njk`
- [x] 7.2 Build compact hero (eyebrow "Archive", H1, subhead, no figure)
- [x] 7.3 Build filter row: `CategoryTab`s (All + topics actually present in posts) + search `TextInput`, hairline rule below
- [x] 7.4 Build list rows: one per post in `src/content/posts` (colored dot by tone, title, dek, category `BadgePill`, date, arrow-up-right icon), hairline-soft dividers
- [x] 7.5 Contributors band — omitted entirely, no contributor data source exists yet (same as home page's 5.5); no names invented

## 8. About / contact page

- [x] 8.1 Create `src/_includes/layouts/about.njk` (or page) extending `base.njk`
- [x] 8.2 Build masthead (max 62ch): eyebrow "About", H1, mission paragraph
- [x] 8.3 Build "How the desk works" card: 4 numbered steps (BadgePill digit + label + description)
- [x] 8.4 Build "Get in touch" contact form: Name/Email `TextInput`s, Message `textarea` styled to `TextInput` tokens, Send `Button`
- [x] 8.5 "Who writes here" band — omitted entirely, no contributor data source exists yet (same as 5.5/7.5); no names invented

## 9. Verification handoff

- [x] 9.1 Run the 11ty build locally and confirm it produces a pure static `_site/` output with no errors — verified clean rebuild from a deleted `_site/`: 6 pages (home, archive, about, 3 articles) + all CSS/JS/favicon assets, no build errors
- [x] 9.2 Message `qa-security`: build verification, visual/spec conformance check against `Redflag Blog Mockups.dc.html` for home and article pages, content/link checks, and confirmation that no secrets or non-static assumptions were introduced
- [x] 9.3 Address any issues `qa-security` reports back before requesting commit/push from `devops-engineer` — fixed 3 dead footer links (`/feed.xml`, `/about/#sources`, `/about/#corrections`), verified clean rebuild, sent back for re-check
