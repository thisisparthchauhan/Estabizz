import sanitizeHtml from "sanitize-html";
import type { BlogImage } from "@/lib/models/Blog";

export const MAX_BLOG_IMAGE_CHARS = 1_600_000;

const allowedImageDataUrl = /^data:image\/(png|jpe?g|webp|gif);base64,/i;

export function sanitizeBlogHtml(html: string) {
    return sanitizeHtml(html || "", {
        allowedTags: [
            "h2",
            "h3",
            "h4",
            "p",
            "br",
            "strong",
            "b",
            "em",
            "i",
            "u",
            "ul",
            "ol",
            "li",
            "blockquote",
            "a",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "img",
            "figure",
            "figcaption",
            "div",
            "span",
        ],
        allowedAttributes: {
            a: ["href", "name", "target", "rel"],
            img: ["src", "alt", "title"],
            h2: ["id"],
            h3: ["id"],
            h4: ["id"],
            table: ["class"],
            th: ["colspan", "rowspan"],
            td: ["colspan", "rowspan"],
            div: ["class"],
            span: ["class"],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedSchemesByTag: {
            img: ["http", "https", "data"],
        },
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
        },
    });
}

export function isSafeImageUrl(url: string) {
    const value = String(url || "").trim();
    if (!value) return false;
    if (value.length > MAX_BLOG_IMAGE_CHARS) return false;
    if (value.startsWith("https://") || value.startsWith("http://")) return true;
    return allowedImageDataUrl.test(value);
}

export function validateBlogImages(images: Array<BlogImage | undefined>) {
    for (const image of images.filter(Boolean)) {
        const url = String(image?.url || "");
        if (!isSafeImageUrl(url)) {
            return "One or more images are invalid or too large. Please upload compressed JPG, PNG, WEBP or GIF images.";
        }
        if (!String(image?.alt || "").trim()) {
            return "Every uploaded image must include alt text.";
        }
    }

    return null;
}
