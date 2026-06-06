import type { Metadata } from "next";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Internal Resources | Estabizz Admin",
    robots: { index: false, follow: false },
};

const internalResources = [
    {
        title: "Content Rebuild Command",
        description: "Internal editorial framework for rebuilding reference content into original SEO, GEO and AEO-ready regulatory pages.",
    },
    {
        title: "Service Page Content Framework",
        description: "Internal service-page standard covering licence overview, eligibility, documents, fees, compliance, FAQs, reviewer block and CTA flow.",
    },
    {
        title: "Proposal Framework",
        description: "Internal client proposal structure for scope, timelines, commercials, assumptions and regulatory support notes.",
    },
    {
        title: "Regulatory Update Email Template",
        description: "Internal format for converting circulars into client-ready compliance emails, board notes and action checklists.",
    },
];

export default async function AdminResourcesPage() {
    await requireAdminPage();

    return (
        <AdminBlogShell title="Internal Resources" subtitle="Editorial and proposal frameworks for Estabizz admin users. These resources are intentionally not shown on the public website.">
            <div className="grid gap-5 md:grid-cols-3">
                {internalResources.map((resource) => (
                    <div key={resource.title} className="rounded-[24px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071426] text-sm font-black text-white">E</div>
                        <h2 className="text-[20px] font-black text-[#071426]">{resource.title}</h2>
                        <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#64748b]">{resource.description}</p>
                    </div>
                ))}
            </div>
        </AdminBlogShell>
    );
}
