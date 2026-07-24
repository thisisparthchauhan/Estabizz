"use client";

import { useState } from "react";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";

const inputCls =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all";

export default function GetStartedForm({ services }: { services: string[] }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "", website: "" });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, source: "get-started" }),
            });
            const data = await res.json();
            if (res.ok && data.ok) setSubmitted(true);
            else setError(data.error || "Something went wrong. Please call +91 98256 00907.");
        } catch {
            setError("Network error. Please try again or call +91 98256 00907.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1677f2]/10">
                    <svg className="h-7 w-7 text-[#1677f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-[20px] font-black text-[#120b45]">Enquiry received</h3>
                <p className="mt-2 text-[14px] text-[#64748b]">Thank you. Our advisory team will reach out within 24 hours. For anything urgent, call +91 98256 00907.</p>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={submit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Full Name <span className="text-red-500">*</span></span>
                    <input type="text" name="name" value={form.name} onChange={change} required className={inputCls} />
                </label>
                <label className="block">
                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Email Address <span className="text-red-500">*</span></span>
                    <input type="email" name="email" value={form.email} onChange={change} required className={inputCls} />
                </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Mobile Number</span>
                    <input type="tel" name="phone" value={form.phone} onChange={change} className={inputCls} />
                </label>
                <label className="block">
                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Company Name</span>
                    <input type="text" name="company" value={form.company} onChange={change} className={inputCls} />
                </label>
            </div>
            <div className="block">
                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Service Required</span>
                <EstabizzSelect
                    name="service"
                    variant="public"
                    value={form.service}
                    onValueChange={(v) => setForm({ ...form, service: v })}
                    placeholder="Select a service..."
                    options={services.map((s) => ({ value: s, label: s }))}
                />
            </div>
            <label className="block">
                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Message</span>
                <textarea name="message" value={form.message} onChange={change} rows={5} className={`${inputCls} resize-none`} />
            </label>

            {/* Honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={change} />

            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Submitting…" : "Submit Enquiry"}
            </button>
        </form>
    );
}
