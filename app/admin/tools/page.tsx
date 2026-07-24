import Link from "next/link";

const tools = [
    {
        title: "Content Rebuild Command",
        description: "Framework for rebuilding competitor or reference URLs into original SEO, GEO and AEO optimised regulatory pages in Estabizz voice.",
        href: "/admin/tools/content-rebuild-command",
        tag: "Content Writing",
    },
    {
        title: "Regulatory Email Template",
        description: "Structured format for converting RBI, SEBI, IRDAI and IFSCA circulars into professional compliance update emails.",
        href: "/admin/tools/regulatory-update-email-template",
        tag: "Compliance Communications",
    },
    {
        title: "Service Page Framework",
        description: "Master content structure for building premium licence and registration service pages with SEO, GEO and AEO standards.",
        href: "/admin/tools/service-page-content-framework",
        tag: "Content Standards",
    },
    {
        title: "Proposal Template",
        description: "Reusable client-facing proposal format for regulatory licence registrations covering scope, timelines, commercials and disclaimers.",
        href: "/admin/tools/proposal-template",
        tag: "Client Proposals",
    },
];

export default function AdminToolsPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-[22px] font-black text-[#0a1628]">Internal Tools</h1>
                <p className="mt-1 text-[13.5px] text-[#64748b]">Operational reference materials and templates for the Estabizz content and compliance team. Not visible to the public.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="group block rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm hover:border-[#1677f2]/40 hover:shadow-md transition-all">
                        <span className="mb-3 inline-block rounded-full border border-blue-100 bg-[#f5fbff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0077B6]">{tool.tag}</span>
                        <h2 className="mb-2 text-[16px] font-black text-[#0a1628] group-hover:text-[#1677f2] transition-colors">{tool.title}</h2>
                        <p className="text-[13px] leading-6 text-[#64748b]">{tool.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
