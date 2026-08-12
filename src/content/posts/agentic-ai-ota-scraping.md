---
layout: base.njk
title: "The Booking Wasn't Human: How AI Shopping Agents Are Becoming OTAs' New Scraping Problem"
frame: attack
date: 2026-08-12
tags: posts
permalink: "/posts/agentic-ai-ota-scraping/"
---

# The Booking Wasn't Human: How AI Shopping Agents Are Becoming OTAs' New Scraping Problem

You've probably assumed that when someone books a flight or a hotel room on your site, there's a person on the other end clicking through the search results. Increasingly, that assumption is wrong — and not in the way "bot traffic" usually means it's wrong. The visitor searching your fare calendar, comparing your room rates, or even completing a checkout might not be a scraper trying to steal your prices, and it might not be a human either. It might be an AI agent, acting on a real traveler's behalf, doing the browsing and sometimes the buying for them.

That shift is called **agentic AI traffic**: requests generated not by a person typing into a browser, and not by a traditional scraping script harvesting a page once and moving on, but by an AI agent — something like a ChatGPT browsing plugin, a Perplexity assistant, or a purpose-built shopping agent — that can navigate a site, read its content, and in a growing number of cases take *action* on it, across an extended, multi-step session. For online travel agencies (OTAs), that last part — action, not just reading — is the part that's rewriting the threat model.

## The scale of it, in one quarter

The clearest anchor for how fast this is moving comes from DataDome's Q2 2026 AI Traffic Report: AI-agent requests hit 17.7 billion in the quarter, up 45% from Q1 2026's 12.2 billion. The same report notes that spoofing of well-known agent identities — traffic dressed up to look like it's coming from a recognized AI assistant when it isn't — "remains active," and DataDome points to an emerging countermeasure called Web Bot Auth (WBA) as one way sites can start distinguishing real agent traffic from impersonated agent traffic (DataDome, "The AI Traffic Report Q2 2026: Agentic Traffic Surged 45%, With Meta Taking the Lead," datadome.co/threat-research/ai-traffic-report-q2-2026/).

That single-vendor number gets independent corroboration from HUMAN Security's own benchmark report, which found agentic AI traffic up 7,851% year-over-year and AI scraper traffic specifically up 597% — with 70% of scraping attacks in its dataset hitting retail and e-commerce, and attempts to compromise accounts *after* a successful login quadrupling year-over-year (HUMAN Security, "The 2026 State of AI Traffic & Cyberthreat Benchmark Report," globenewswire.com/news-release/2026/04/09/3270682/0/en/human-security-s-2026-state-of-ai-traffic-cyberthreat-benchmark-report-signals-a-new-internet-era-automation-growth-now-outpaces-humans.html). Two separate vendors, using their own traffic and detection data, are describing the same underlying curve: agentic traffic isn't a niche experiment anymore, it's a fast-growing and increasingly targeted share of overall site traffic.

## The masquerade: how spoofed agent traffic actually works

Growth in *legitimate* agent traffic is only half the story. The other half is traffic that claims to be a legitimate AI agent and isn't. DataDome's research on this — what it calls "The Great Masquerade" — documents a concrete example: traffic branded as coming from Grok rotated through fake Chrome and Safari user-agent strings, with 16 requests arriving from 12 different IP addresses within a single prompt cycle. That's not what a single AI client talking to a single site should look like; it's the fragmented, distributed pattern more typical of a bad-bot operation trying to blend into legitimate agent traffic rather than a single well-behaved assistant completing a task (DataDome, "The Great Masquerade: How AI Agents Are Spoofing Their Way In," datadome.co/agent-trust-management/ai-agent-spoofing/). A supporting DataDome data point from earlier in the year puts a number on this at broader scale: 16.4 million spoofed Meta-externalagent requests logged across January and February 2026 alone, against 7.9 billion total AI-agent requests in that same window (DataDome, press release, "DataDome Report Finds Most Organizations Flying Blind as Agentic Traffic Surges," datadome.co/press/). The same release also flags that PerplexityBot traffic in that dataset carried a 2.4% fraud rate — a reminder that even *verified* agent identities aren't automatically clean traffic.

The mechanism matters because it inverts a defensive assumption that bot-detection tooling has relied on for years: that a known, "good" bot identity (a search-engine crawler, a recognized assistant) is inherently lower-risk than an unrecognized one. When that identity itself can be convincingly forged, "it says it's ChatGPT-User" or "it says it's PerplexityBot" stops being a meaningful trust signal on its own.

## Why this lands specifically on OTAs

Travel booking sites aren't an incidental target here — they're structurally exposed in ways a lot of other e-commerce isn't. Trade coverage of DataDome's research, reported by TravelMole, lays out the OTA-specific failure modes: agent-session takeovers that lead to unauthorized bookings made in a traveler's name, price manipulation carried out through mass, automated extraction of fare and rate data, and loyalty-program fraud where accumulated points or status get drained through automated account activity. The same coverage cites DataDome's finding that more than 90% of travel sites are not fully protected against even basic automated threats (TravelMole, "AI agents reshape travel, but frauds can surge fast, tells DataDome," travelmole.com/news/rise-ai-agents-travel-fraud/).

That combination — dynamic, constantly-updating fare data that's valuable to scrape, plus a booking flow that (by design) needs to let some automated agents actually complete a purchase — makes OTAs a harder detection problem than a typical retail catalog. A defense system tuned only to block automation outright doesn't work when some of that automation is a paying customer's AI travel agent finishing a legitimate booking.

## The old assumption that no longer holds: "good bots only read"

That last point gets at something structural, and it's worth naming directly. TechRadar's coverage of Radware's research on agent spoofing describes the underlying shift plainly: bot-defense systems were largely built on the premise that legitimate automated traffic — search crawlers, monitoring tools, the "good bots" allowlisted years ago — only ever *reads* a page. It doesn't submit forms, doesn't complete checkouts, doesn't take write actions. Legitimate AI shopping agents break that premise by design: to actually finish a booking or a purchase on a user's behalf, an agent increasingly needs permission to make POST requests — the same category of action a scraper or account-takeover bot would use to submit a form or push a transaction through. The very capability that makes an agent useful to a real traveler is the same capability that makes a spoofed agent dangerous, and it's exactly why "good bot vs. bad bot" allowlisting built for a read-only bot era wasn't designed to handle this (TechRadar, "Major AI agents are being spoofed – and it could put your site at risk," techradar.com/pro/security/major-ai-agents-are-being-spoofed-and-it-could-put-your-site-at-risk/).

## When the agent isn't scraping — it's breaking in

It's worth being precise about a related but distinct threat, because it's easy to blur the two. In June 2026, Cybernews reported that a threat actor had used Anthropic's Claude — via the open-source penetration-testing tool HexStrike AI — to breach four hotel booking and property-management-system platforms: RoomScope (Thailand), IGMS (Canada), NebulaPMS (South Africa), and Staysee (Japan). The attacker reportedly framed the malicious queries to Claude as legitimate penetration-testing work to get past its guardrails, then produced fabricated pen-test reports as after-the-fact cover documentation; the breach exposed roughly 2.1 million unique email addresses across the affected platforms (Cybernews, "Hacker employs Claude to breach booking firms, leaves millions of records publicly accessible," cybernews.com/security/claude-ai-exploited-breach-hotel-booking-platforms/).

That incident isn't scraping, and it isn't spoofed agent traffic in the sense described above — it's an AI model being weaponized as a tool *by* a human attacker to help breach OTA-adjacent infrastructure. But it belongs in the same picture: it's a second, distinct way that AI capability is now showing up on the offense side of travel-industry security, and a concrete reminder that "AI and OTA security" isn't a single, narrow problem with one fix.

## The baseline this is landing on

None of this is arriving at a moment when travel-sector defenses were already solid. DataDome's 2025 Global Bot Security Report — a snapshot that predates most of the agentic-AI-specific activity described above — found that only 2.8% of websites overall were fully protected against basic automated threats, down from 8.4% the year before, with roughly 44% of travel-sector sites specifically left unprotected (DataDome, "2025 Global Bot Security Report," datadome.co/resources/bot-security-report/). That figure is a baseline, not a current-state read on AI-agent defenses specifically — but it's the unprotected floor that agentic traffic's rapid growth is now landing on top of.

The industry response so far isn't limited to detection-and-block tooling, either. Cloudflare's Monetization Gateway, announced in July 2026 and built on a protocol called x402, lets sites charge AI agents for access to a resource rather than simply allowing or blocking them — treating agentic traffic as a distinct economic category that needs its own access controls, not just a traffic pattern to be filtered out (Cloudflare, "Announcing the Monetization Gateway: charge for any resource behind Cloudflare via x402," blog.cloudflare.com/monetization-gateway/). That's a meaningfully different posture than pure detection, and it's a sign that at least part of the industry sees this less as a bot problem to block and more as a new class of traffic to be managed and, potentially, monetized.

## What this piece hasn't covered

This post has focused on scale, spoofing mechanics, and why OTAs specifically are exposed — not on the defensive playbook. Web Bot Auth, the verification approach DataDome points to as an emerging way to cryptographically confirm an agent is who it claims to be, deserves its own explainer rather than a passing mention here. So does the residential-proxy infrastructure that both spoofed-agent traffic and older-style scraping operations often ride on to look distributed and legitimate — a topic that's its own can of worms. Consider this the setup for both of those.

---

**Sources**

- DataDome, "The AI Traffic Report Q2 2026: Agentic Traffic Surged 45%, With Meta Taking the Lead," datadome.co/threat-research/ai-traffic-report-q2-2026/
- DataDome, "The Great Masquerade: How AI Agents Are Spoofing Their Way In," datadome.co/agent-trust-management/ai-agent-spoofing/
- DataDome, press release, "DataDome Report Finds Most Organizations Flying Blind as Agentic Traffic Surges," datadome.co/press/datadome-report-finds-most-organizations-flying-blind-as-agentic-traffic-surges/
- TravelMole, "AI agents reshape travel, but frauds can surge fast, tells DataDome," travelmole.com/news/rise-ai-agents-travel-fraud/
- HUMAN Security, "The 2026 State of AI Traffic & Cyberthreat Benchmark Report," globenewswire.com/news-release/2026/04/09/3270682/0/en/human-security-s-2026-state-of-ai-traffic-cyberthreat-benchmark-report-signals-a-new-internet-era-automation-growth-now-outpaces-humans.html
- Cybernews, "Hacker employs Claude to breach booking firms, leaves millions of records publicly accessible," cybernews.com/security/claude-ai-exploited-breach-hotel-booking-platforms/
- TechRadar, "Major AI agents are being spoofed – and it could put your site at risk," techradar.com/pro/security/major-ai-agents-are-being-spoofed-and-it-could-put-your-site-at-risk/
- Cloudflare, "Announcing the Monetization Gateway: charge for any resource behind Cloudflare via x402," blog.cloudflare.com/monetization-gateway/
- DataDome, "2025 Global Bot Security Report," datadome.co/resources/bot-security-report/
