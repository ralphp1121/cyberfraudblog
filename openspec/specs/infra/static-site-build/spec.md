## Purpose

Defines the build contract for the blog's static site: a pure 11ty build with no server-side runtime assumptions, producing output that can be served by a plain static web server (nginx) and that includes the approved launch post.

## Requirements

### Requirement: Pure static build output
The site SHALL build via `npx @11ty/eleventy` into a `_site/` directory containing only static assets (HTML, CSS, images, and any client-side JS) with no server-side runtime dependency at serve time.

#### Scenario: Clean build from source
- **WHEN** `npx @11ty/eleventy` is run against the repo's 11ty config and content
- **THEN** it exits successfully and produces a `_site/` directory containing static HTML output

#### Scenario: Output requires no runtime
- **WHEN** `_site/` is served by a plain static file server (e.g. nginx) with no Node.js process running
- **THEN** all pages render correctly with no runtime errors or missing server-rendered content

### Requirement: Launch post included in build
The build SHALL include the approved behavioral biometrics launch post as a rendered page reachable from the site's content listing.

#### Scenario: Launch post renders
- **WHEN** the 11ty build completes
- **THEN** `_site/` contains a rendered HTML page for the behavioral biometrics post with its title, body content, and sources section intact

### Requirement: Base layout applied to posts
All posts SHALL render through a shared base layout providing consistent site chrome (e.g. header/navigation, footer) rather than being standalone unstyled documents.

#### Scenario: Post uses shared layout
- **WHEN** the launch post is rendered
- **THEN** its output HTML includes the shared layout's structural elements, not just the raw post content
