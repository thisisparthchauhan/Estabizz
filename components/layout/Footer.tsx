"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_DEFAULTS, type FooterContent } from "@/lib/content/footerDefaults";

// The footer content is managed from Admin → Navigation → Footer. Live values
// arrive via the `content` prop from the (server) root layout; FOOTER_DEFAULTS
// (single source of truth in lib/content/footerDefaults.ts) is the fallback.
export type { FooterContent };

// Columns hidden from the public footer (internal-only or redundant)
const EXCLUDED_COL_TITLES = new Set(['Compliance Portal', 'Company & Network']);
// Individual links hidden from the public footer (internal CMS tools, duplicates)
const EXCLUDED_LINK_LABELS = new Set(['Content Framework', 'Proposal Templates']);

export default function Footer({ content }: { content?: Partial<FooterContent> }) {
    const c: FooterContent = { ...FOOTER_DEFAULTS, ...content };
    if (c.email === 'info@estabizz.com') c.email = 'support@estabizz.com';

    const rawColumns = c.columns?.length ? c.columns : FOOTER_DEFAULTS.columns;
    const contactOwnerTitle = rawColumns.find(col =>
        col.links.some(l => l.href === '/contact' && l.label === 'Contact Us')
    )?.title;

    const columns = rawColumns
        .filter(col => !EXCLUDED_COL_TITLES.has(col.title))
        .map(col => {
            const seen = new Set<string>();
            const links = col.links.filter(link => {
                if (link.href === '/') return false;
                if (EXCLUDED_LINK_LABELS.has(link.label)) return false;
                if (link.href === '/contact' && col.title !== contactOwnerTitle) return false;
                if (seen.has(link.href)) return false;
                seen.add(link.href);
                return true;
            });
            return { ...col, links };
        })
        .filter(col => col.links.length > 0);

    const regulators = c.regulators?.length ? c.regulators : FOOTER_DEFAULTS.regulators;
    const phoneHref = `tel:${c.phone.replace(/[^\d+]/g, "")}`;

    return (
        <footer className="relative overflow-hidden bg-[#070d1a] dark:bg-[#0a1e3a] text-white">

            {/* Subtle ambient glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#1677f2]/10 blur-[80px]" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#1677f2]/8 blur-[80px]" />
            </div>

            {/* Top accent line */}
            <div className="relative h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#1677f2]/55 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[1480px] px-5 2xl:px-6">

                {/* ═══════════════════════════════════════════════════════════
                    Section 1 — Brand + Contact
                ═══════════════════════════════════════════════════════════ */}
                <div className="flex flex-col gap-6 border-b border-white/[0.06] py-6 lg:flex-row lg:items-start lg:justify-between">

                    {/* Left: logo + tagline + socials */}
                    <div className="flex flex-shrink-0 flex-col gap-3 lg:w-[260px]">
                        <Link href="/" className="group inline-flex">
                            <Image
                                src="/estabizz-logo-light.png"
                                alt="Estabizz"
                                width={747}
                                height={314}
                                className="h-12 w-auto opacity-90 transition-opacity group-hover:opacity-100"
                            />
                        </Link>
                        <p className="text-[13px] leading-relaxed text-white/40">
                            Regulatory licensing, compliance and execution support for businesses in India and global markets.
                        </p>
                        <div className="flex gap-2 pt-0.5">
                            <a
                                href={c.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Instagram"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.04] text-white/40 transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white"
                            >
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href={c.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.04] text-white/40 transition-all hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white"
                            >
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right: 2×2 compact contact cards */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:w-[500px] lg:flex-shrink-0">
                        {/* Address */}
                        <div className="col-span-1 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 sm:col-span-2">
                            <div className="mt-0.5 flex-shrink-0 text-[#4f9dfb]/60">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/28">Office</p>
                                <p className="text-[13px] leading-snug text-white/60">{c.address}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <a
                            href={phoneHref}
                            className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-all hover:border-[#1677f2]/30 hover:bg-[#1677f2]/[0.07]"
                        >
                            <div className="mt-0.5 flex-shrink-0 text-[#4f9dfb]/60 transition-colors group-hover:text-[#4f9dfb]">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/28">Phone</p>
                                <p className="text-[14px] font-semibold leading-tight text-white/70 transition-colors group-hover:text-white">{c.phone}</p>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${c.email}`}
                            className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-all hover:border-[#1677f2]/30 hover:bg-[#1677f2]/[0.07]"
                        >
                            <div className="mt-0.5 flex-shrink-0 text-[#4f9dfb]/60 transition-colors group-hover:text-[#4f9dfb]">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/28">Email</p>
                                <p className="text-[14px] font-semibold leading-tight text-white/70 transition-colors group-hover:text-white">{c.email}</p>
                            </div>
                        </a>

                        {/* CIN */}
                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 sm:col-span-0">
                            <div className="mt-0.5 flex-shrink-0 text-[#4f9dfb]/60">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/28">CIN</p>
                                <p className="font-mono text-[13px] leading-tight text-white/55">{c.cin}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    Section 2 — Navigation link columns
                ═══════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-7 border-b border-white/[0.06] py-7 sm:grid-cols-3 xl:grid-cols-5">
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-3 text-[10.5px] font-black uppercase tracking-[0.1em] text-[#4f9dfb]">
                                {col.title}
                            </h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium leading-snug text-white/48 transition-colors hover:text-white"
                                        >
                                            <span className="h-px w-0 flex-shrink-0 rounded-full bg-[#1677f2] transition-all duration-200 group-hover:w-2.5" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    Section 3 — Regulatory trust strip
                ═══════════════════════════════════════════════════════════ */}
                <div className="border-b border-white/[0.06] py-4">
                    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
                        <span className="mr-1.5 flex-shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-white/22">
                            Regulatory domains we support
                        </span>
                        <span className="mr-1.5 h-3 w-px flex-shrink-0 bg-white/10" />
                        {regulators.map((r) => {
                            const initials = r.label.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
                            return (
                                <Link
                                    key={r.label}
                                    href={r.href}
                                    className="group flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 transition-all hover:border-[#1677f2]/30 hover:bg-[#1677f2]/[0.08]"
                                >
                                    <span className="flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-[3px] bg-[#1677f2]/75 text-[7px] font-black leading-none text-white transition-colors group-hover:bg-[#1677f2]">
                                        {initials}
                                    </span>
                                    <span className="text-[12px] font-semibold text-white/42 transition-colors group-hover:text-white/80">
                                        {r.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    Section 4 — Bottom legal strip
                ═══════════════════════════════════════════════════════════ */}
                <div className="flex flex-col justify-between gap-3 py-4 text-[11.5px] leading-relaxed text-white/32 sm:flex-row sm:items-center">
                    <p className="max-w-[660px]">
                        <strong className="font-semibold text-white/48">Disclaimer:</strong>{' '}
                        Estabizz Fintech Private Limited is an independent regulatory advisory and compliance support organisation and does not represent any statutory or regulatory authority. Licence issuance is at the regulator&apos;s sole discretion.{' '}
                        <Link href="/legal/privacy-policy" className="text-white/40 underline underline-offset-2 transition-colors hover:text-white/65">
                            Full disclaimer
                        </Link>
                    </p>
                    <p className="flex-shrink-0 font-medium text-white/30 sm:text-right">{c.copyright}</p>
                </div>

            </div>
        </footer>
    );
}
