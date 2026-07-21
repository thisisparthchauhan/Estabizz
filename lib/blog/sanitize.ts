/**
 * sanitizeBlogHtml — server-side HTML sanitizer for blog article bodies.
 *
 * WHY: Article content is rendered with dangerouslySetInnerHTML. Without
 * sanitization, a user-submitted (or compromised) article could embed
 * <script>, event handlers (onclick=…), javascript: URLs, <iframe>, etc.,
 * resulting in stored XSS that runs in every reader's browser.
 *
 * This strips everything except a safe editorial allowlist (the tags the
 * admin editor toolbar can produce: headings, paragraphs, lists, links,
 * tables, blockquotes, figures, code, and the styled callout boxes).
 *
 * SERVER-SIDE ONLY — sanitize-html depends on Node. Call this in API routes
 * and Server Components, never in a "use client" component.
 */

import sanitizeHtml from 'sanitize-html';

// Class names allowed on <div>/<span>/<p> so the callout boxes keep working.
const ALLOWED_CLASSES = [
  'callout',
  'callout-info',
  'callout-warning',
  'callout-important',
  'callout-success',
  'callout-icon',
  'callout-body',
  'callout-title',
  'callout-text',
];

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
    'a',
    'blockquote',
    'figure', 'figcaption',
    'img',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    'code', 'pre',
    'span', 'div',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
    col: ['span'],
    colgroup: ['span'],
    // class + id needed for callout boxes and TOC anchors
    '*': ['class', 'id'],
  },
  // Only http/https/mailto/tel links. Blocks javascript: and data: URIs on images.
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    img: ['https'],
  },
  allowProtocolRelative: false,
  // Drop the entire element (and contents) for anything dangerous.
  disallowedTagsMode: 'discard',
  // Restrict class values to the known callout set (defense in depth).
  allowedClasses: {
    '*': ALLOWED_CLASSES,
  },
  // Force safe rel + open behaviour on external links.
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href ?? '';
      const isExternal = /^https?:\/\//i.test(href);
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {}),
        },
      };
    },
  },
};

export function sanitizeBlogHtml(html: string): string {
  if (!html) return '';
  return sanitizeHtml(html, OPTIONS);
}
