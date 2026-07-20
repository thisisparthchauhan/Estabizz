/**
 * wordCleanup — browser-side Word HTML sanitizer.
 *
 * Runs entirely in the client using DOMParser. Strips mso- / Office-XML garbage,
 * maps Word paragraph/heading styles to semantic HTML, and returns clean editorial
 * markup ready for TipTap to insert.
 *
 * A second sanitization pass runs server-side (sanitize-html) on every save,
 * so this is defense-in-depth, not the sole XSS barrier.
 */

const UNSAFE_ELEMENTS = [
  "script", "style", "meta", "link", "object", "embed",
  "form", "input", "button", "iframe", "head", "xml",
];

/** True when the clipboard HTML looks like it came from Microsoft Word. */
export function isWordHtml(html: string): boolean {
  return (
    html.includes("mso-") ||
    html.includes("MsoNormal") ||
    html.includes("MsoHeading") ||
    html.includes("urn:schemas-microsoft-com") ||
    html.includes("w:WordDocument") ||
    html.includes("Generator: Microsoft Word")
  );
}

/**
 * Clean Word-pasted HTML into safe editorial markup.
 * Safe to call on any HTML — non-Word content is returned lightly cleaned.
 */
export function cleanWordHtml(raw: string): string {
  if (!raw || typeof window === "undefined") return raw;

  // Strip Office XML prologs, conditional comments, and namespace declarations
  let html = raw
    .replace(/<\?xml[\s\S]*?>/gi, "")
    .replace(/<xml[\s\S]*?<\/xml>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s*xmlns(?::\w+)?="[^"]*"/g, "");

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // 1. Remove unsafe/non-content elements
  UNSAFE_ELEMENTS.forEach((tag) => {
    doc.querySelectorAll(tag).forEach((el) => el.remove());
  });

  // 2. Process every element: strip dangerous attributes and mso- styles
  doc.body.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;

    // Remove all event handlers and Office-specific attributes
    const toRemove: string[] = [];
    for (const attr of Array.from(el.attributes)) {
      if (
        attr.name.startsWith("on") ||
        attr.name.startsWith("mso") ||
        ["lang", "xml:lang", "data-sourcepos", "v:shapes", "o:spid"].includes(attr.name)
      ) {
        toRemove.push(attr.name);
      }
    }
    toRemove.forEach((a) => el.removeAttribute(a));

    // Strip inline styles — remove mso- props, keep nothing to avoid style leakage
    el.removeAttribute("style");
  });

  // 3. Map Word heading paragraph classes → semantic heading elements
  mapWordHeadings(doc.body);

  // 4. Flatten empty / style-only spans
  doc.body.querySelectorAll("span").forEach((span) => {
    if (!span.getAttribute("class") && !span.querySelector("a")) {
      const frag = doc.createDocumentFragment();
      while (span.firstChild) frag.appendChild(span.firstChild);
      span.replaceWith(frag);
    }
  });

  // 5. Remove purely empty block elements (Word adds many blank <p> as spacing)
  doc.body.querySelectorAll("p, div").forEach((el) => {
    const text = (el.textContent ?? "").trim();
    if (text === "" && !el.querySelector("img, table, ul, ol, br, figure")) {
      el.remove();
    }
  });

  // 6. Ensure links are safe (strip javascript: and local paths)
  doc.body.querySelectorAll("a[href]").forEach((a) => {
    const href = (a as HTMLAnchorElement).href ?? "";
    if (/^javascript:/i.test(href) || /^file:/i.test(href)) {
      a.removeAttribute("href");
    }
  });

  // 7. Remove class attributes that aren't our callout classes
  const ALLOWED_CLASSES = new Set([
    "callout", "callout-info", "callout-warning",
    "callout-important", "callout-success",
    "callout-icon", "callout-body", "callout-title", "callout-text",
  ]);
  doc.body.querySelectorAll("[class]").forEach((el) => {
    const classes = (el.getAttribute("class") ?? "")
      .split(/\s+/)
      .filter((c) => ALLOWED_CLASSES.has(c));
    if (classes.length) {
      el.setAttribute("class", classes.join(" "));
    } else {
      el.removeAttribute("class");
    }
  });

  return doc.body.innerHTML;
}

// ── Word heading mapping ───────────────────────────────────────────────────────

const HEADING_PATTERNS: Array<{ pattern: RegExp; tag: "h2" | "h3" | "h4" }> = [
  // Word uses class names like "Heading1", "MsoHeading1", "Heading 1" etc.
  { pattern: /\bHeading\s?1\b|MsoHeading1/i, tag: "h2" }, // Word H1 → blog H2
  { pattern: /\bHeading\s?2\b|MsoHeading2/i, tag: "h2" },
  { pattern: /\bHeading\s?3\b|MsoHeading3/i, tag: "h3" },
  { pattern: /\bHeading\s?4\b|MsoHeading4/i, tag: "h4" },
  { pattern: /\bHeading\s?5\b|MsoHeading5/i, tag: "h4" },
];

function mapWordHeadings(body: HTMLElement): void {
  // Map <p class="Heading1"> → <h2>
  body.querySelectorAll("p, h1, h2, h3, h4, h5, h6").forEach((el) => {
    const cls = el.getAttribute("class") ?? "";
    const tagName = el.tagName.toLowerCase();

    let targetTag: "h2" | "h3" | "h4" | null = null;

    for (const { pattern, tag } of HEADING_PATTERNS) {
      if (pattern.test(cls)) { targetTag = tag; break; }
    }

    // Also clamp native <h1> → <h2> (page title is the H1)
    if (!targetTag && tagName === "h1") targetTag = "h2";

    if (targetTag && tagName !== targetTag) {
      const newEl = el.ownerDocument.createElement(targetTag);
      newEl.innerHTML = el.innerHTML;
      el.replaceWith(newEl);
    }
  });
}
