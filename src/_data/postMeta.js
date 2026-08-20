// Per-post category/tone/dek/read-time metadata, keyed by fileSlug.
//
// `frame` in each post's frontmatter (attack/defense) doesn't map 1:1 onto
// the design system's content categories — the agentic-AI post is
// frame:attack but reads as an AI-analysis piece by its actual content
// (traffic classification, spoofing detection), so it's mapped to the
// analysis/violet tone rather than frame:attack's default severity/crimson.
// Deks are trimmed from each post's own lede, not invented copy. Read times
// are computed from each post's real word count at ~215 wpm.
module.exports = {
  "seat-spinning-denial-of-inventory": {
    category: "Attack pattern",
    tone: "crimson",
    dek: "Bots hold the same inventory in a pending state, let it expire, and repeat — creating scarcity without ever buying anything.",
    readTime: 6,
    // Verbatim sentence pulled from the post body, not invented.
    pullQuote: "A WAF has no way to distinguish a customer repeatedly browsing and reserving because they're comparing options from a bot repeatedly holding the same seat with zero purchase intent, because both produce syntactically valid requests.",
    traceLabel: "Hold-cycle trace · anon-4471",
    traceContent: "POST /cart/hold      200  ua=Chrome/126  score=0.12\nPOST /cart/hold      200  ua=Chrome/126  score=0.11\nGET  /seat/avail      200  ua=Chrome/126  score=0.14\nPOST /cart/hold      200  ua=Chrome/126  score=0.13\nDELETE /cart/hold     204  ua=Chrome/126  score=0.12"
  },
  "agentic-ai-ota-scraping": {
    category: "AI analysis",
    tone: "violet",
    dek: "The visitor comparing your fares might not be a scraper, and it might not be a human either — it might be an AI agent acting on a traveler's behalf.",
    readTime: 8,
    pullQuote: "The very capability that makes an agent useful to a real traveler is the same capability that makes a spoofed agent dangerous.",
    traceLabel: "Agent request trace · sample session",
    traceContent: "GET  /fares/search    200  agent=PerplexityBot  verified=false\nGET  /rooms/avail     200  agent=ChatGPT-User   verified=true\nPOST /booking/hold    200  agent=PerplexityBot  verified=false\nGET  /fares/search    200  agent=Meta-external  verified=false"
  },
  "behavioral-biometrics-bot-detection": {
    category: "Defense",
    tone: "teal",
    dek: "Many bot-detection systems score whether you're human from mouse movement and typing rhythm, before any CAPTCHA ever loads.",
    readTime: 8,
    pullQuote: "If that confidence score stays comfortably in human territory throughout the session, many systems are designed to simply never trigger a challenge — the visitor never even knows a bot check was happening.",
    traceLabel: "Session behavior score · sample visit",
    traceContent: "t+0.0s  pointer_jitter=0.41   confidence=human\nt+2.4s  keystroke_dwell=0.38  confidence=human\nt+6.1s  scroll_curve=0.36     confidence=human\nt+9.8s  session_score=0.91    verdict=pass (no challenge shown)"
  }
};
