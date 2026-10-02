"use client";

import { useState } from "react";

/**
 * Newsletter signup. Posts to /api/subscribe, which writes to the `subscribers`
 * collection in MongoDB and (once RESEND_API_KEY is set) emails the team.
 *
 * Styled for the dark footer band, in the brand blue. The reference design this
 * was taken from used a purple-to-blue gradient; AGENTS.md section 8 reserves the
 * palette to one blue, so the gradient runs #1677f2 -> #0866d9 instead.
 */
export default function NewsletterSignup({ source = "footer" }: { source?: string }) {
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(""); // honeypot
    const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
    const [error, setError] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state === "sending") return;

        const trimmed = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setState("error");
            setError("Please enter a valid email address.");
            return;
        }

        setState("sending");
        setError("");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: trimmed,
                    source,
                    website,
                    pageUrl: typeof window !== "undefined" ? window.location.href : "",
                }),
            });
            const data = await res.json().catch(() => ({ ok: false }));
            if (res.ok && data.ok) {
                setState("done");
                setEmail("");
            } else {
                setState("error");
                setError(data.error || "Could not subscribe right now. Please try again.");
            }
        } catch {
            setState("error");
            setError("Network error. Please try again.");
        }
    };

    return (
        <div className="w-full lg:w-[300px] lg:flex-shrink-0">
            <h4 className="mb-2 text-[10.5px] font-black uppercase tracking-[0.1em] text-[#4f9dfb]">
                Stay Updated
            </h4>

            <p className="mb-3 text-[12.5px] leading-[1.6] text-white/40">
                Regulatory updates and filing deadlines, straight to your inbox.
            </p>

            {state === "done" ? (
                <p
                    role="status"
                    className="rounded-lg border border-[#1677f2]/40 bg-[#1677f2]/10 px-3.5 py-2.5 text-[12.5px] font-semibold text-[#8fc3fd]"
                >
                    You&rsquo;re subscribed. Watch your inbox.
                </p>
            ) : (
                <form onSubmit={submit} noValidate>
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (state === "error") setState("idle");
                        }}
                        placeholder="Enter your email"
                        aria-invalid={state === "error"}
                        aria-describedby={state === "error" ? "newsletter-error" : undefined}
                        className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 text-[13px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#1677f2] focus:bg-white/[0.07]"
                    />

                    {/* Honeypot — hidden from people, irresistible to bots. */}
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    <button
                        type="submit"
                        disabled={state === "sending"}
                        className="mt-2 h-10 w-full rounded-lg bg-gradient-to-r from-[#1677f2] to-[#0866d9] text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(22,119,242,0.25)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {state === "sending" ? "Subscribing…" : "Subscribe"}
                    </button>

                    {state === "error" && (
                        <p id="newsletter-error" role="alert" className="mt-2 text-[12px] font-semibold text-[#fca5a5]">
                            {error}
                        </p>
                    )}

                </form>
            )}
        </div>
    );
}
