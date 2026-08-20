function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets (CSS, images, client-side JS)
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Look up a single post from a collection by its fileSlug (e.g. for
  // hand-picked home page sections referencing specific existing posts).
  eleventyConfig.addFilter("byFileSlug", (posts, slug) =>
    posts.find((post) => post.fileSlug === slug)
  );

  // Split a post's rendered HTML content right before its second <h2>, so a
  // template can inject a mid-article element (evidence card, pull-quote)
  // after the first full section rather than before/after the whole body.
  eleventyConfig.addFilter("splitAfterFirstSection", (html) => {
    const matches = [...html.matchAll(/<h2\b/g)];
    if (matches.length < 2) return [html, ""];
    const splitIndex = matches[1].index;
    return [html.slice(0, splitIndex), html.slice(splitIndex)];
  });

  // Strip a leading <h1> from a post's rendered HTML — the article layout
  // renders its own <h1> from frontmatter title, and posts' markdown source
  // repeats the title as a body H1 to read well on GitHub/plain viewers.
  eleventyConfig.addFilter("stripLeadingH1", (html) =>
    html.replace(/^\s*<h1\b[^>]*>.*?<\/h1>\s*/, "")
  );

  // Extract {id, text} for each <h2> in a post's rendered HTML, for an
  // "in this piece" mini table of contents.
  eleventyConfig.addFilter("extractH2Headings", (html) => {
    const headings = [];
    const re = /<h2\s+id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
    let match;
    while ((match = re.exec(html))) {
      headings.push({ id: match[1], text: match[2].replace(/<[^>]+>/g, "") });
    }
    return headings;
  });

  // Give rendered post H2/H3 headings an id, so an "in this piece" TOC card
  // can link to them (stock markdown-it doesn't add heading ids).
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultHeadingOpen =
      mdLib.renderer.rules.heading_open ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
    mdLib.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
      const inlineToken = tokens[idx + 1];
      if (inlineToken && inlineToken.type === "inline") {
        tokens[idx].attrSet("id", slugify(inlineToken.content));
      }
      return defaultHeadingOpen(tokens, idx, options, env, self);
    };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
