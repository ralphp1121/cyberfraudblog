## Context

No posts exist yet (`src/` is not yet scaffolded). This is the first content to land once `fullstack-dev` sets up the 11ty project structure, and the first real use of the explainer-post requirements defined in `specs/content/explainer-posts/spec.md`. See `proposal.md` - Why for motivation.

## Goals / Non-Goals

**Goals:**
- Define the concrete structure and front matter this post (and the explainer format generally) will use, so `fullstack-dev` can draft against a clear shape.
- Decide the offense/defense metadata mechanism referenced by the spec, since nothing like it exists yet.

**Non-Goals:**
- Scaffolding `src/`, `.eleventy.js`, layouts, or any 11ty build config — that is `fullstack-dev` infrastructure work tracked separately, not part of this content change.
- Writing the second (paired, AI-offense) post on CAPTCHA-solving bots — only referenced here as a future cross-link target.
- Defining the full 10-topic backlog as specced capabilities — this change scopes only the launch post and the reusable explainer-post requirements it establishes.

## Decisions

**Front matter carries the offense/defense tag as a simple enum field.**
A `frame: offense | defense` (or similarly named) front-matter field on each post, rather than a separate taxonomy/tag system, satisfies the spec's labeling requirement with the least structure. Alternative considered: a full tag/category taxonomy — rejected as premature for a single-post launch; revisit once enough posts exist to need filtering/browsing by quadrant.

**Post structure: hook → mechanism → defense-signal breakdown → takeaway.**
Concretely: (1) open with the surprising claim that scoring happens before CAPTCHA, (2) explain behavioral biometrics as a category, (3) walk through 2-3 concrete signal types (mouse movement/jitter, typing cadence, touch/scroll patterns) with how each is machine-scored, (4) close with what this means for the reader (e.g. why some sites never show you a CAPTCHA at all). This satisfies the mechanism-first requirement and gives future explainer posts a repeatable shape without over-templating.

**Sourcing: public vendor engineering blogs and academic/industry research only.**
No sourcing-risk tradeoff here (unlike offense-side teardowns) — behavioral biometrics is a well-documented defense technique with ample public vendor and research material. Cite 2-4 sources inline per the spec's citation requirement.

**Cross-link to the future CAPTCHA-solving post is a forward TODO, not a blocking dependency.**
The paired offense post doesn't exist yet. Structure this post so a cross-link can be added later (e.g. a closing line gesturing at "the other side of this," which fullstack-dev can turn into a link once the paired post exists) without requiring a structural rewrite.

## Risks / Trade-offs

- [Risk] Evergreen requirement could conflict with citing specific vendor products that may rebrand or discontinue features → Mitigation: cite the mechanism/technique generally, use specific vendors only as illustrative examples, not as the claim's sole support.
- [Risk] "Mechanism-first" framing could get too technical for the general-audience requirement → Mitigation: draft with plain-language definitions at first use of each term, per the spec's terminology requirement; qa-security or a fresh-eyes read-through before publishing can catch drift.
