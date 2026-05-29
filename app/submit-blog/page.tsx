import type { Metadata } from "next";
import Link from "next/link";
import SubmitBlogForm from "@/components/blog/SubmitBlogForm";

export const metadata: Metadata = {
    title: "Submit a Blog | Estabizz Fintech Regulatory Insights",
    description: "Submit original regulatory, fintech, licensing or compliance content for Estabizz editorial review.",
    alternates: { canonical: "/submit-blog" },
};

export default function SubmitBlogPage() {
    return (
        <main className="min-h-screen bg-[#f7fbff] pt-24">
            <section className="border-b border-[#dbe7f3] bg-white px-6 py-14">
                <div className="mx-auto max-w-5xl">
                    <nav className="mb-8 flex items-center gap-2 text-[13px] font-bold text-[#64748b]">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <Link href="/blogs" className="hover:text-[#0096D6]">Blogs</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Submit Blog</span>
                    </nav>
                    <span className="rounded-full bg-[#d9a938] px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#071426]">Contributor Desk</span>
                    <h1 className="mt-5 text-[clamp(38px,5vw,66px)] font-black tracking-tight text-[#071426]">Submit a regulatory blog for Estabizz review</h1>
                    <p className="mt-5 max-w-3xl text-[17px] font-medium leading-relaxed text-[#475569]">
                        Share original insights on RBI, SEBI, IRDAI, IFSCA, MCA, fintech, NBFC, insurance, compliance or global licensing topics. Submitted blogs remain private until reviewed and approved by Estabizz.
                    </p>
                </div>
            </section>
            <section className="mx-auto max-w-5xl px-6 py-12">
                <SubmitBlogForm />
            </section>
        </main>
    );
}
