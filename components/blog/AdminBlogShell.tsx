import Link from "next/link";

const navItems = [
    ["Dashboard", "/admin/blogs"],
    ["New Blog", "/admin/blogs/new"],
    ["Pending Review", "/admin/blogs/pending"],
    ["Categories", "/admin/blogs/categories"],
    ["Media", "/admin/media"],
];

export default function AdminBlogShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-[#f7fbff] pt-24">
            <section className="border-b border-[#dbe7f3] bg-white px-6 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="rounded-full bg-[#d9a938] px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#071426]">Admin Blog Panel</span>
                            <h1 className="mt-5 text-[clamp(32px,4vw,54px)] font-black tracking-tight text-[#071426]">{title}</h1>
                            <p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-[#64748b]">{subtitle}</p>
                        </div>
                        <Link href="/blogs" className="rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-5 py-3 text-[13px] font-black text-[#0077B6]">
                            View Public Blogs
                        </Link>
                    </div>
                    <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                        {navItems.map(([label, href]) => (
                            <Link key={href} href={href} className="shrink-0 rounded-full border border-[#dbe7f3] bg-white px-4 py-2 text-[13px] font-black text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6]">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>
        </main>
    );
}
