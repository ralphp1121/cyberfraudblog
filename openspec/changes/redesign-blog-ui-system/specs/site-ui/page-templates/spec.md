## Purpose

Defines the page-level layouts (home, article, archive, about/contact) that assemble the shared design-system components into the specific structures mocked in `docs/UIredesign_project/Redflag Blog - Selected Designs.md`, using the site's real post content.

## ADDED Requirements

### Requirement: Home page renders the evidence-led layout
The home page SHALL render the "evidence-led" layout (option 1b): a 7/5 hero with a dark `ProductMockupCard`, a lead attack band featuring one large `FeatureCard` plus a stat grid, an asymmetric "more this week" mosaic, a contributors row, and a `CtaBand`, using only posts that currently exist in `src/content/posts`.

#### Scenario: Hero renders with live-signal artifact
- **WHEN** the home page loads
- **THEN** the hero's right column renders a dark `ProductMockupCard` labelled "Live signal · anon-4471" with a hold-cycle trace snippet, not a diagram placeholder

#### Scenario: Lead attack band uses real post data
- **WHEN** the home page renders the lead attack band
- **THEN** the large `FeatureCard` displays the Seat Spinning post's real title, dek, date, and read time sourced from its post frontmatter, not mocked copy

#### Scenario: Mosaic omits posts that don't exist yet
- **WHEN** the home page renders the "more this week" mosaic
- **THEN** it includes only cards for posts present in `src/content/posts` (agentic AI, behavioral biometrics) and does not fabricate cards for the residential-proxy or interview posts referenced in the mockup

#### Scenario: CTA band renders once
- **WHEN** the home page renders
- **THEN** exactly one `CtaBand` appears, with an email `TextInput` and `Button`, paired with a `HeroIllustrationCard` placeholder

### Requirement: Home page adapts to mobile viewport
At mobile viewport widths, the home page SHALL render as a single responsive column (option 1d): 64px nav with hamburger menu, 36px H1, a horizontally-scrolling `CategoryTab` row, stacked full-width `FeatureCard`s, and an in-flow (non-fixed) bottom subscribe bar.

#### Scenario: Mobile H1 sizing
- **WHEN** the viewport is mobile width
- **THEN** the H1 renders at 36px rather than the desktop 56/72px display sizes

#### Scenario: Mobile cards stack full width
- **WHEN** the viewport is mobile width
- **THEN** `FeatureCard`s render as a single stacked column at full width, not in a grid

#### Scenario: Bottom bar is not fixed
- **WHEN** a user scrolls the mobile home page
- **THEN** the "Next brief, weekly" bar scrolls in-flow with the page and does not remain pinned via `position: fixed`

### Requirement: Article page renders the two-column reading layout
Each post SHALL render via the article template (option 1e): a breadcrumb, a 7/5 header with badges/H1/dek/byline and a `HeroIllustrationCard`, a 7/4 body grid with a `--measure-article` (68ch) column including a dark `ProductMockupCard` and a sourced `Sources` list, and a sticky-in-column aside with a subscribe card and mini table of contents.

#### Scenario: Breadcrumb reflects the post's category
- **WHEN** a post page renders
- **THEN** the breadcrumb reads "Home › Articles › {post's category}" using chevron-right icons

#### Scenario: Sources list is populated from post frontmatter
- **WHEN** a post page renders its Sources section
- **THEN** it lists the citations defined in that post's own frontmatter/content, not placeholder links

#### Scenario: Related analysis band excludes the current post
- **WHEN** a post page renders the "Related analysis" band
- **THEN** it shows up to 3 `FeatureCard`s drawn from the other existing posts, excluding the post currently being read

### Requirement: Archive page lists all posts as rows
The archive page SHALL render option 1f: a compact hero, a filter row of `CategoryTab`s plus a search `TextInput`, and one full-width list row per existing post (colored dot, title, dek, category `BadgePill`, date, arrow icon) rather than a card grid.

#### Scenario: One row per existing post
- **WHEN** the archive page renders
- **THEN** it renders exactly one list row per post present in `src/content/posts`, with no placeholder rows for posts that don't exist yet

#### Scenario: Row dot color matches post tone
- **WHEN** an archive row renders
- **THEN** its leading dot color matches the accent tone assigned to that post's category

### Requirement: About page renders masthead and contact form
The about/contact page SHALL render option 1g: a masthead (max 62ch), a two-column band with a numbered "How the desk works" card and a "Get in touch" contact form (Name/Email `TextInput`s, Message `textarea` styled to match `TextInput` tokens, Send `Button`).

#### Scenario: Contact form field styling matches TextInput tokens
- **WHEN** the about page's Message `textarea` renders
- **THEN** its border, radius, and focus treatment match the shared `TextInput` component's tokens

#### Scenario: About page omits contributor action buttons
- **WHEN** the "Who writes here" band renders on the about page
- **THEN** contributor cards show name and specialization only, with no "Read their work" action button (that action is archive-page-only)
