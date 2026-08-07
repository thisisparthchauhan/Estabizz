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
  'blog-image',
  'blog-image--small',
  'blog-image--medium',
  'blog-image--large',
  'blog-image--full',
  'blog-image--custom',
  'blog-image--left',
  'blog-image--center',
  'blog-image--right',
];

const BLOG_IMAGE_SIZES = new Set(['small', 'medium', 'large', 'full', 'custom']);
const BLOG_IMAGE_ALIGNMENTS = new Set(['left', 'center', 'right']);

function cleanPositiveNumber(value: string | undefined, max = 10000): string {
  const n = Number(value ?? '');
  if (!Number.isFinite(n) || n <= 0 || n > max) return '';
  return String(Math.round(n));
}

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
    figure: ['class', 'data-blog-image', 'data-image-size', 'data-image-align', 'data-image-width', 'style'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding', 'data-public-id', 'data-width-original', 'data-height-original'],
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
  allowedStyles: {
    figure: {
      width: [/^\d{2,4}px$/],
    },
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
    figure: (tagName, attribs) => {
      if (attribs['data-blog-image'] !== 'true') return { tagName: 'figure', attribs: {} };
      const size = BLOG_IMAGE_SIZES.has(attribs['data-image-size']) ? attribs['data-image-size'] : 'medium';
      const align = BLOG_IMAGE_ALIGNMENTS.has(attribs['data-image-align']) ? attribs['data-image-align'] : 'center';
      const width = cleanPositiveNumber(attribs['data-image-width'], 960);
      return {
        tagName: 'figure',
        attribs: {
          'data-blog-image': 'true',
          'data-image-size': size,
          'data-image-align': align,
          class: `blog-image blog-image--${size} blog-image--${align}`,
          ...(size === 'custom' && width ? { 'data-image-width': width, style: `width:${width}px` } : {}),
        },
      };
    },
    img: (tagName, attribs) => {
      const width = cleanPositiveNumber(attribs.width);
      const height = cleanPositiveNumber(attribs.height);
      const widthOriginal = cleanPositiveNumber(attribs['data-width-original']);
      const heightOriginal = cleanPositiveNumber(attribs['data-height-original']);
      return {
        tagName: 'img',
        attribs: {
          src: attribs.src ?? '',
          alt: (attribs.alt ?? '').slice(0, 180),
          ...(attribs.title ? { title: attribs.title.slice(0, 180) } : {}),
          loading: 'lazy',
          decoding: 'async',
          ...(width ? { width } : {}),
          ...(height ? { height } : {}),
          ...(attribs['data-public-id'] ? { 'data-public-id': attribs['data-public-id'].replace(/[^a-zA-Z0-9_\-/.]/g, '').slice(0, 180) } : {}),
          ...(widthOriginal ? { 'data-width-original': widthOriginal } : {}),
          ...(heightOriginal ? { 'data-height-original': heightOriginal } : {}),
        },
      };
    },
  },
};

export function sanitizeBlogHtml(html: string): string {
  if (!html) return '';
  return sanitizeHtml(html, OPTIONS);
}
