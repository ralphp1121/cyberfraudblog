---
layout: layouts/article.njk
title: "Seat Spinning: The Bot Attack That Empties Your Cart Without Ever Buying"
frame: attack
date: 2026-08-18
tags: posts
permalink: "/posts/seat-spinning-denial-of-inventory/"
---

# Seat Spinning: The Bot Attack That Empties Your Cart Without Ever Buying

Picture a shopper who fills a cart, holds it for fifteen minutes, lets it expire, and does it again. And again. Thousands of times a day, on the same handful of items. They never check out. They never intend to. Nothing about any single one of these sessions looks like fraud — it looks like someone who can't make up their mind. That's the entire point. This is denial-of-inventory abuse, and in the travel industry it goes by a more specific name: seat spinning.

## What seat spinning actually is

Cequence Security's threat-research team describes the mechanism plainly: bots repeatedly place airline seats into a pending-reservation state without ever completing the purchase, then let those holds expire before doing it again — cycling the same inventory in and out of a held state to create artificial scarcity in the booking system (Cequence Security, "Airline Seat Spinning: An Illustration of Sophisticated Fraud," cequence.ai/blog/bot-management/seat-spinning-fraud/). The tactic leans on a specific feature of how airline booking systems work: many carriers, historically concentrated in markets across Asia-Pacific, offer no-cost hold windows that let a traveler reserve a seat before paying. That's a real convenience for real travelers. It's also, unmodified, a tool a bot can abuse at scale.

Retail has its own version of the same idea, and it doesn't need an airline's hold-window feature to work — a shopping cart is enough. DataDome's definition, from its ecommerce-focused threat-defense guidance, is the general-purpose version: an automated "shopping bot" repeatedly adds a product to a cart without ever completing the transaction, which tricks the site's inventory system into registering stock as depleted even though nothing has actually sold (DataDome, "Shopping Bots: How to Prevent Denial of Inventory Attacks," datadome.co/learning-center/prevent-shopping-bots-denial-of-inventory-attacks/). Same shape, different industry: hold something valuable in a pending state, let it expire, repeat, and the site behaves as if it's sold out when it isn't.

It's worth being precise about *why* an attacker does this, because it's easy to lump denial-of-inventory in with scalping and it isn't the same attack. Scalping bots buy real inventory to resell at a markup — the attacker profits directly from acquiring the goods. Denial-of-inventory bots often never buy anything at all. HUMAN Security's framing of the distinction is useful here: the motive is frequently competitive sabotage — locking a rival's customers out of stock, or simply probing how much inventory a competitor is carrying — rather than resale profit (HUMAN Security, "What are denial of inventory and scalping attacks?," humansecurity.com/learn/topics/what-are-denial-of-inventory-and-scalping-attacks/). A retailer investigating a wave of abandoned carts on a hot item might reasonably suspect scalpers. The bot doing it might not want the product at all — it might just want a competitor's customers to see "out of stock."

## Why the standard defenses don't catch it

This is the part that makes seat spinning and denial-of-inventory genuinely hard to stop, and it's not because the bots are unusually stealthy in a technical sense — it's because the attack doesn't look like an attack.

Cequence's research lays out three specific reasons standard bot defenses miss it. CAPTCHA challenges typically fire at login or payment — and seat spinning happens entirely before either of those steps, so the challenge never triggers. IP-reputation blocking runs into the now-familiar problem of residential proxy rotation: bots route requests through real consumer IP addresses and cloud infrastructure, so blocking by IP reputation either misses the bot entirely or generates false positives against real customers sharing that IP space. And web application firewalls, which are built to catch syntactic attacks — malformed requests, injection attempts, protocol abuse — simply aren't designed to evaluate intent. A WAF has no way to distinguish "a customer repeatedly browsing and reserving because they're comparing options" from "a bot repeatedly holding the same seat with zero purchase intent," because both produce syntactically valid requests (Cequence Security, cequence.ai/blog/bot-management/seat-spinning-fraud/).

DataDome's research adds the piece that makes this worse over time rather than better: the bots doing this aren't static scripts running the same pattern forever. Newer denial-of-inventory bots are behaviorally sophisticated enough to mimic legitimate buyer behavior — varying timing, varying navigation paths — specifically to blend into the traffic patterns a defense system has learned to trust (DataDome, datadome.co/learning-center/prevent-shopping-bots-denial-of-inventory-attacks/). GeeTest's research adds a mechanical detail worth knowing: these bots are often built to exploit a site's specific checkout-hold policy — a common pattern is roughly a 15-minute window before an unpaid cart item releases back to inventory — and can be pointed at a single SKU thousands of times to deplete it (GeeTest, "Inventory Bots Explained: How to Stop Denial of Inventory Attack?," geetest.com/en/article/inventory-bots-and-denial-of-inventory-attacks). Know your own hold-window policy, in other words, because a bot operator targeting you probably already does.

## This isn't a niche tactic — it's a named line item in the industry's benchmark report

It would be easy to read seat spinning as a colorful edge case specific to airline booking engines. The data says otherwise. Thales's 2026 Bad Bot Report — the industry's most-cited annual benchmark, produced by Imperva — puts bad bots at 40% of all internet traffic in 2025, up three percentage points year over year, with total bot traffic (good and bad combined) at 53%. Inside retail specifically, the report attributes 24% of isolated retail security incidents to business-logic abuse — the category seat spinning and denial-of-inventory both fall under, as opposed to attacks that exploit a technical vulnerability. And the report doesn't just gesture at "bot abuse" generically: it names seat spinning and denial-of-inventory directly as retail-sector tactics bots use to hoard products or block legitimate customer transactions.

The same report frames where this is heading: AI-driven bot incidents rose 12.5-fold year over year, from roughly 2 million to 25 million daily blocked AI-related incidents, split between AI crawlers (85% of that AI traffic) and AI fetchers (15%). *(Worth flagging: this specific report's own blog page returned an automated bot-detection block to the research tooling used for this piece — a detail that says something about the current state of the arms race in its own right. The figures above are corroborated across two independent secondary summaries of the report that agree with each other, though a direct read of the original report is the stronger citation if you're relying on this for a decision.)*

## What this piece hasn't covered

This post focused on what seat spinning and denial-of-inventory attacks are, why they're motivated differently than scalping, and specifically why CAPTCHA, IP-reputation blocking, and WAFs each miss them individually. It hasn't covered the defensive playbook — behavioral bot-scoring, session-level intent analysis, or hold-window policy changes that reduce the attack surface without hurting real customers — which is a big enough topic to deserve its own piece. It also hasn't gone deep on the residential-proxy infrastructure that lets these bots (and scraping bots generally) blend into legitimate traffic in the first place. That's next.

---

**Sources**

- Cequence Security, "Airline Seat Spinning: An Illustration of Sophisticated Fraud," cequence.ai/blog/bot-management/seat-spinning-fraud/
- DataDome, "Shopping Bots: How to Prevent Denial of Inventory Attacks," datadome.co/learning-center/prevent-shopping-bots-denial-of-inventory-attacks/
- Thales / Imperva, "2026 Bad Bot Report: Bots in the Agentic Age," imperva.com/blog/bad-bot-report-2026-bots-agentic-age/ (figures corroborated via deepstrike.io/blog/bot-attack-statistics and softprom.com/thales-imperva-bad-bot-report-2026-en — see `content-pipeline/research/seat-spinning-denial-of-inventory/sources.md` for the access note)
- HUMAN Security, "What are denial of inventory and scalping attacks?," humansecurity.com/learn/topics/what-are-denial-of-inventory-and-scalping-attacks/
- GeeTest, "Inventory Bots Explained: How to Stop Denial of Inventory Attack?," geetest.com/en/article/inventory-bots-and-denial-of-inventory-attacks
