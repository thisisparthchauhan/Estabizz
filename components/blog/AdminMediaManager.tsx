"use client";

import { FormEvent, useEffect, useState } from "react";

interface MediaItem {
    _id: string;
    url: string;
    alt: string;
    caption?: string;
    createdAt: string;
}

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

export default function AdminMediaManager() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function loadMedia() {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/media");
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to load media");
            setMedia(result.media || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load media");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMedia();
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);
        setError(null);
        const form = event.currentTarget;
        const formData = new FormData(form);
        const file = formData.get("file") as File | null;

        if (!file || file.size === 0) {
            setError("Please select an image.");
            return;
        }

        let result;
        try {
            const url = await fileToDataUrl(file);
            const response = await fetch("/api/admin/media", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url,
                    alt: formData.get("alt"),
                    caption: formData.get("caption"),
                    fileName: file.name,
                    mimeType: file.type,
                }),
            });
            result = await response.json();

            if (!response.ok) {
                setError(result.error || "Unable to upload image.");
                return;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to upload image.");
            return;
        }

        form.reset();
        setMessage("Media saved successfully.");
        await loadMedia();
    }

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Image</span>
                        <input name="file" type="file" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 text-[13px] font-semibold" />
                    </label>
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Alt text</span>
                        <input name="alt" required className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold" />
                    </label>
                    <button className="h-12 rounded-2xl bg-[#071426] px-6 text-[13px] font-black text-white">Save Media</button>
                </div>
                <input name="caption" placeholder="Optional caption" className="mt-4 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold" />
                {message && <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-[13px] font-bold text-emerald-700">{message}</div>}
                {error && <div className="mt-4 rounded-xl bg-red-50 p-3 text-[13px] font-bold text-red-700">{error}</div>}
            </form>

            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
                {loading ? (
                    <div className="font-bold text-[#64748b]">Loading media...</div>
                ) : media.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#dbe7f3] bg-white p-8 text-center font-bold text-[#64748b] md:col-span-3">No media uploaded yet.</div>
                ) : media.map((item) => (
                    <figure key={item._id} className="overflow-hidden rounded-2xl border border-[#dbe7f3] bg-white shadow-sm">
                        <img src={item.url} alt={item.alt} className="h-44 w-full object-cover" />
                        <figcaption className="p-4">
                            <div className="text-[13px] font-black text-[#071426]">{item.alt}</div>
                            {item.caption && <div className="mt-1 text-[12px] font-medium text-[#64748b]">{item.caption}</div>}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
}
