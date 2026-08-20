## Purpose

Defines the shared visual token layer, brand logo integration, and reusable UI components that every page on the site is built from, so pages present a single consistent analyst-grade design instead of ad hoc per-page styling.

## ADDED Requirements

### Requirement: Design tokens govern all visual styling
All color, typography, spacing, shape, elevation, and motion values used across the site SHALL be defined as CSS custom properties matching the values in `docs/UIredesign_project/CyberFraudBlog-DESIGN.md`, and page/component styles SHALL reference these tokens rather than hardcoding raw values.

#### Scenario: A page uses the canvas background
- **WHEN** any page renders its base background
- **THEN** it uses `--canvas` (`#f6f7f9`), not a hardcoded hex value or the previous `#ffffff`

#### Scenario: A saturated accent card is styled
- **WHEN** a `FeatureCard` renders with an accent tone (severity/defense/analysis/threat/community)
- **THEN** its fill color comes from the matching `--accent-*` token and its radius/padding come from `--radius-xl` / `--card-padding-accent`

#### Scenario: No seventh accent tone is introduced
- **WHEN** any component or page needs a category color
- **THEN** it selects from the six defined accent tones (severity, defense, analysis, threat, community, neutral) and never introduces a new saturated card color

### Requirement: Brand logo replaces plain-text site title
The site SHALL render the redflag wordmark logo (`_logo.njk`) instead of plain text everywhere a brand mark appears, using the sizing and colorway rules from `docs/UIredesign_project/redflag-logo.md`.

#### Scenario: Nav logo rendering
- **WHEN** the top nav renders on any page
- **THEN** it includes the logo partial at `--rf-logo-size: 38px`, default colorway, linking to `/` (except on the home page, where it is not a self-link)

#### Scenario: Footer logo rendering
- **WHEN** the footer renders
- **THEN** it includes the logo partial with `size="footer"` (26px) in the default crimson+ink colorway, since the footer surface is light

#### Scenario: Mobile nav logo rendering
- **WHEN** the site renders at a mobile viewport
- **THEN** the nav logo renders at approximately 24px alongside a hamburger menu icon

#### Scenario: Logo styling constraints are enforced
- **WHEN** the logo appears anywhere on the site
- **THEN** it is never bold, never uppercase, never letterspaced, and never split across two lines

### Requirement: Shared component library backs all pages
The site SHALL implement a shared, reusable set of UI components — `Button`, `TextLink`, `TextInput`, `BadgePill`, `CategoryTab`, `FeatureCard`, `ProductMockupCard`, `HeroIllustrationCard`, `ExpertCard`, `TopNav`, `Footer` — as Nunjucks includes/macros with variant parameters, rather than one-off per-page markup, per the component inventory in `CyberFraudBlog-DESIGN.md`.

#### Scenario: Button variants
- **WHEN** a page needs a call-to-action control
- **THEN** it uses the shared `Button` component with one of the defined variants (primary/secondary/onColor/textLink) and sizes (md/sm), rather than a bespoke `<button>`/`<a>` styled inline

#### Scenario: FeatureCard reuse across pages
- **WHEN** the home page, archive page, or article "related analysis" band displays a post summary
- **THEN** each uses the shared `FeatureCard` component with the appropriate tone, differing only by its passed-in content (eyebrow, title, body, footer)

#### Scenario: HeroIllustrationCard without real artwork
- **WHEN** a page layout calls for a `HeroIllustrationCard` (e.g. article header diagram) and no real line-art asset exists
- **THEN** it renders a labelled dashed placeholder rather than a stock photo or blank space

#### Scenario: TopNav is non-sticky
- **WHEN** a user scrolls any page
- **THEN** the 64px top nav scrolls with the page content and is never `position: sticky` or `position: fixed`

### Requirement: Content voice and interaction rules are enforced in markup
Components and page copy SHALL follow the content-voice and interaction-state rules in `CyberFraudBlog-DESIGN.md`: no emoji, no exclamation marks, sentence case in UI copy, and defined hover/press/disabled/focus states for interactive elements.

#### Scenario: Button hover state
- **WHEN** a user hovers a primary `Button`
- **THEN** its fill transitions from `--primary` (`#101317`) to `--primary-active` (`#23272d`) using the `--duration-fast` / `--ease-standard` motion tokens, with no scale or shrink

#### Scenario: Input focus state
- **WHEN** a user focuses a `TextInput`
- **THEN** its border thickens to `--border-width-emphasis` (2px) in ink, with no glow or ring effect

#### Scenario: No emoji or growth-marketing verbs in generated UI copy
- **WHEN** any component renders button labels, CTAs, or eyebrow text
- **THEN** the copy contains no emoji, no exclamation marks, and none of the disallowed growth-marketing verbs (e.g. "unlock", "supercharge")
