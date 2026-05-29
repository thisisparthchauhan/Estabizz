"use client";

import { FormEvent, useState } from "react";
import { BLOG_CATEGORIES } from "@/lib/blogUtils";

async function fileToDataUrl(file: File) {
    if (!/^image\/(png|jpe?g|webp|gif)$/i.test(file.type)) {
        throw new Error("Only JPG, PNG, WEBP or GIF images are allowed.");
    }
    if (file.size > 1_200_000) {
        throw new Error("Please upload compressed images below 1.2 MB each.");
    }
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function SubmitBlogForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            const featuredFile = (formData.get("featuredImage") as File | null);
            const supportingFiles = formData.getAll("supportingImages") as File[];
            const featuredImage = featuredFile && featuredFile.size > 0
                ? {
                    url: await fileToDataUrl(featuredFile),
                    alt: String(formData.get("featuredAlt") || formData.get("title") || "Submitted Estabizz blog image"),
                    caption: String(formData.get("featuredCaption") || ""),
                }
                : undefined;
            const inlineImages = await Promise.all(
                supportingFiles
                    .filter((file) => file.size > 0)
                    .slice(0, 5)
                    .map(async (file, index) => ({
                        url: await fileToDataUrl(file),
                        alt: `Supporting image ${index + 1} for ${formData.get("title")}`,
                        caption: "",
                    }))
            );

            const response = await fetch("/api/blogs/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.get("title"),
                    summary: formData.get("summary"),
                    content: String(formData.get("content") || "").replace(/\n/g, "<br />"),
                    category: formData.get("category"),
                    tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
                    featuredImage,
                    inlineImages,
                    declarationAccepted: formData.get("declaration") === "on",
                    submittedBy: {
                        name: formData.get("name"),
                        email: formData.get("email"),
                        phone: formData.get("phone"),
                        linkedIn: formData.get("linkedIn"),
                    },
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Unable to submit blog.");
                return;
            }

            form.reset();
            setMessage(result.message || "Blog submitted for Estabizz review.");
        } catch {
            setError("Unable to submit blog. Please check image size and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-[30px] border border-[#dbe7f3] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
                {[
                    ["name", "Name", "text"],
                    ["email", "Email", "email"],
                    ["phone", "Phone", "tel"],
                    ["linkedIn", "LinkedIn profile", "url"],
                ].map(([name, label, type]) => (
                    <label key={name} className="block">
                        <span className="text-[13px] font-black text-[#071426]">{label}</span>
                        <input name={name} type={type} required={name !== "linkedIn"} className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10" />
                    </label>
                ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[1fr_260px]">
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">Blog title</span>
                    <input name="title" required className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10" />
                </label>
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">Category</span>
                    <select name="category" className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]">
                        {BLOG_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                    </select>
                </label>
            </div>

            <label className="mt-5 block">
                <span className="text-[13px] font-black text-[#071426]">Blog summary</span>
                <textarea name="summary" required rows={3} className="mt-2 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10" />
            </label>

            <label className="mt-5 block">
                <span className="text-[13px] font-black text-[#071426]">Blog content</span>
                <textarea name="content" required rows={12} className="mt-2 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 text-[14px] font-semibold leading-relaxed outline-none focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10" />
            </label>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">Featured image upload</span>
                    <input name="featuredImage" type="file" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 text-[13px] font-semibold" />
                </label>
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">Multiple supporting images</span>
                    <input name="supportingImages" type="file" accept="image/*" multiple className="mt-2 block w-full rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 text-[13px] font-semibold" />
                </label>
                <input name="featuredAlt" placeholder="Featured image alt text" className="h-12 rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]" />
                <input name="featuredCaption" placeholder="Featured image caption" className="h-12 rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]" />
            </div>

            <label className="mt-5 block">
                <span className="text-[13px] font-black text-[#071426]">Tags</span>
                <input name="tags" placeholder="RBI, fintech, compliance" className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]" />
            </label>

            <label className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[13px] font-semibold leading-relaxed text-[#7a5200]">
                <input name="declaration" type="checkbox" required className="mt-1 h-4 w-4 shrink-0" />
                <span>I confirm that the content submitted by me is original, does not infringe any third-party rights, and may be reviewed, edited, approved, rejected or published by Estabizz Fintech Private Limited at its sole discretion.</span>
            </label>

            {message && <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-[14px] font-bold text-emerald-700">{message}</div>}
            {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-[14px] font-bold text-red-700">{error}</div>}

            <button disabled={loading} className="mt-6 rounded-2xl bg-[#071426] px-7 py-4 text-[14px] font-black text-white transition hover:bg-[#10233d] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Blog for Review"}
            </button>
        </form>
    );
}
