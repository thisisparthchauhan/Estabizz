import { Node, mergeAttributes, type CommandProps } from "@tiptap/core";

export type BlogImageSize = "small" | "medium" | "large" | "full" | "custom";
export type BlogImageAlignment = "left" | "center" | "right";

export interface BlogImageAttrs {
  src: string;
  publicId?: string;
  alt: string;
  title?: string;
  caption?: string;
  size: BlogImageSize;
  alignment: BlogImageAlignment;
  width?: number;
  linkUrl?: string;
  openInNewTab?: boolean;
  widthOriginal?: number;
  heightOriginal?: number;
}

const SIZES: BlogImageSize[] = ["small", "medium", "large", "full", "custom"];
const ALIGNMENTS: BlogImageAlignment[] = ["left", "center", "right"];

function safeSize(value: unknown): BlogImageSize {
  return SIZES.includes(value as BlogImageSize) ? value as BlogImageSize : "medium";
}

function safeAlignment(value: unknown): BlogImageAlignment {
  return ALIGNMENTS.includes(value as BlogImageAlignment) ? value as BlogImageAlignment : "center";
}

function safeNumber(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n);
}

function safeBool(value: unknown): boolean {
  return value === true || value === "true";
}

function safeLink(value: unknown): string {
  const href = String(value ?? "").trim();
  if (!href) return "";
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    return url.protocol === "https:" ? href : "";
  } catch {
    return "";
  }
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogImage: {
      setBlogImage: (attrs: Partial<BlogImageAttrs> & { src: string }) => ReturnType;
      updateBlogImage: (attrs: Partial<BlogImageAttrs>) => ReturnType;
    };
  }
}

export const BlogImageExtension = Node.create({
  name: "blogImage",

  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: "" },
      publicId: { default: "" },
      alt: { default: "" },
      title: { default: "" },
      caption: { default: "" },
      size: { default: "medium" },
      alignment: { default: "center" },
      width: { default: null },
      linkUrl: { default: "" },
      openInNewTab: { default: false },
      widthOriginal: { default: null },
      heightOriginal: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-blog-image]",
        getAttrs: (node) => {
          if (!(node instanceof HTMLElement)) return false;
          const img = node.querySelector("img");
          if (!img) return false;
          const link = node.querySelector("a[href]");
          return {
            src: img.getAttribute("src") || "",
            publicId: img.getAttribute("data-public-id") || "",
            alt: img.getAttribute("alt") || "",
            title: img.getAttribute("title") || "",
            caption: node.querySelector("figcaption")?.textContent?.trim() || "",
            size: safeSize(node.getAttribute("data-image-size")),
            alignment: safeAlignment(node.getAttribute("data-image-align")),
            width: safeNumber(node.getAttribute("data-image-width")),
            linkUrl: safeLink(link?.getAttribute("href")),
            openInNewTab: safeBool(link?.getAttribute("target") === "_blank" ? "true" : ""),
            widthOriginal: safeNumber(img.getAttribute("data-width-original") || img.getAttribute("width")),
            heightOriginal: safeNumber(img.getAttribute("data-height-original") || img.getAttribute("height")),
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (node) => {
          if (!(node instanceof HTMLImageElement)) return false;
          return {
            src: node.getAttribute("src") || "",
            publicId: node.getAttribute("data-public-id") || "",
            alt: node.getAttribute("alt") || "",
            title: node.getAttribute("title") || "",
            caption: "",
            size: "medium",
            alignment: "center",
            width: safeNumber(node.getAttribute("width")),
            linkUrl: "",
            openInNewTab: false,
            widthOriginal: safeNumber(node.getAttribute("data-width-original") || node.getAttribute("width")),
            heightOriginal: safeNumber(node.getAttribute("data-height-original") || node.getAttribute("height")),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const size = safeSize(HTMLAttributes.size);
    const alignment = safeAlignment(HTMLAttributes.alignment);
    const width = safeNumber(HTMLAttributes.width);
    const linkUrl = safeLink(HTMLAttributes.linkUrl);
    const openInNewTab = safeBool(HTMLAttributes.openInNewTab);
    const widthOriginal = safeNumber(HTMLAttributes.widthOriginal);
    const heightOriginal = safeNumber(HTMLAttributes.heightOriginal);

    const figureAttrs = mergeAttributes({
      "data-blog-image": "true",
      "data-image-size": size,
      "data-image-align": alignment,
      class: `blog-image blog-image--${size} blog-image--${alignment}`,
      ...(size === "custom" && width ? { "data-image-width": String(width) } : {}),
      ...(size === "custom" && width ? { style: `width:${width}px` } : {}),
    });

    const imgAttrs = mergeAttributes({
      src: String(HTMLAttributes.src ?? ""),
      alt: String(HTMLAttributes.alt ?? ""),
      loading: "lazy",
      decoding: "async",
      ...(HTMLAttributes.title ? { title: String(HTMLAttributes.title) } : {}),
      ...(HTMLAttributes.publicId ? { "data-public-id": String(HTMLAttributes.publicId) } : {}),
      ...(widthOriginal ? { width: String(widthOriginal), "data-width-original": String(widthOriginal) } : {}),
      ...(heightOriginal ? { height: String(heightOriginal), "data-height-original": String(heightOriginal) } : {}),
    });

    const imageNode = linkUrl
      ? ["a", {
          href: linkUrl,
          ...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {}),
        }, ["img", imgAttrs]]
      : ["img", imgAttrs];

    const caption = String(HTMLAttributes.caption ?? "").trim();
    return caption
      ? ["figure", figureAttrs, imageNode, ["figcaption", {}, caption]]
      : ["figure", figureAttrs, imageNode];
  },

  addCommands() {
    return {
      setBlogImage:
        (attrs) =>
        ({ commands }: CommandProps) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              size: "medium",
              alignment: "center",
              alt: "",
              ...attrs,
            },
          }),
      updateBlogImage:
        (attrs) =>
        ({ commands }: CommandProps) =>
          commands.updateAttributes(this.name, attrs),
    };
  },
});
