import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Jobs at Estabizz — Careers in Regulatory Advisory",
    description: "We're building the team that powers India's regulatory compliance future. Career opportunities at Estabizz Fintech coming soon.",
    robots: { index: false, follow: true },
};

export default function JobsPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pt-[64px]">
            <div className="mx-auto max-w-lg text-center">
                <div className="mb-6 text-[64px]">💼</div>
                <div className="mb-3 inline-block rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                    Careers at Estabizz
                </div>
                <h1 className="mt-4 text-[36px] font-black leading-tight tracking-tight text-[#0a1628]">
                    We're hiring soon.
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-[#64748b]">
                    We're building the team that powers India's regulatory compliance future — fintech advisors, compliance strategists, legal researchers, and operations talent.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#64748b]">
                    Job listings are coming soon. In the meantime, if you'd like to introduce yourself, reach out directly.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="mailto:support@estabizz.com?subject=Career%20Enquiry%20-%20Estabizz"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-6 py-3 text-[14px] font-black text-white transition-all hover:bg-[#1677f2]"
                    >
                        Send Your CV
                    </a>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-black text-[#334155] transition-all hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                    >
                        Back to Home
                    </Link>
                </div>
                <p className="mt-10 text-[12px] text-[#94a3b8]">
                    © 2026 Estabizz Fintech Private Limited · Gandhinagar, Gujarat, India
                </p>
            </div>
        </div>
    );
}
