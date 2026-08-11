## Purpose

Defines the structural and editorial requirements every "explainer"-format post on the blog must satisfy, so the format stays recognizable and consistent across the offense/defense rotation, and captures the specific content requirements for the launch post on behavioral biometrics.

## ADDED Requirements

### Requirement: Explainer posts target general security-curious readers
Explainer posts SHALL be written for a general security-curious audience — readers who follow security news casually but are not fraud/trust-and-safety practitioners. Posts SHALL NOT assume practitioner-level familiarity with specific vendor products, compliance frameworks, or unexplained jargon.

#### Scenario: Technical term introduced
- **WHEN** an explainer post introduces a technical term a general reader would not already know (e.g. "device fingerprinting," "residential proxy," "behavioral biometrics")
- **THEN** the post defines or plainly explains the term at first use, in-line, without requiring the reader to leave the page

### Requirement: Explainer posts are mechanism-first
Explainer posts SHALL lead with how the underlying mechanism actually works before offering a verdict, warning, or takeaway. The "how it works" explanation SHALL be concrete enough that a reader could describe the mechanism to someone else afterward.

#### Scenario: Reader finishes the post
- **WHEN** a reader finishes an explainer post
- **THEN** they can describe, in their own words, the specific technical mechanism the post covered (not just "AI helps stop bots" but how)

### Requirement: Explainer posts carry an explicit offense/defense frame
Each explainer post SHALL be labeled (via front matter or an explicit section) as covering either the AI-offense side (fraud/bots getting more capable) or the AI-defense side (fraud teams/tooling getting more capable), consistent with the blog's content grid.

#### Scenario: Post published
- **WHEN** an explainer post is published
- **THEN** its front matter or metadata identifies it as AI-offense or AI-defense, enabling future cross-linking between paired posts

### Requirement: Explainer posts cite sources for factual and technical claims
Explainer posts SHALL cite or link publicly available sources (vendor engineering blogs, academic papers, journalism, official documentation) for specific technical claims and statistics. Posts SHALL NOT present unverifiable or fabricated claims as fact.

#### Scenario: Post makes a specific technical claim
- **WHEN** an explainer post states a specific fact, statistic, or mechanism detail (e.g. how a specific detection signal works)
- **THEN** the claim is traceable to a cited, publicly accessible source

### Requirement: Launch post explains behavioral biometrics for bot detection
The blog's first published post SHALL explain how behavioral biometrics (signals such as mouse movement patterns, typing cadence, and touch/scroll gestures) are used by AI-driven defense systems to distinguish bots from humans, including that this scoring can happen before any CAPTCHA challenge is presented to the visitor.

#### Scenario: Reader wants to know when bot-detection happens
- **WHEN** a reader reads the launch post
- **THEN** they learn that behavioral signal scoring can occur passively, before or without a CAPTCHA challenge, and understand at least one concrete signal type used to make that determination

### Requirement: Launch post is evergreen
The launch post SHALL NOT depend on a specific news event, incident, or time-sensitive detail for its core explanation to remain accurate and relevant.

#### Scenario: Post read a year after publication
- **WHEN** a reader reads the launch post one year after publication
- **THEN** the core mechanism explanation still holds true and is not framed around an expired news event
