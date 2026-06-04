import type { Metadata } from "next";
import { getAllBlogsForAdmin } from "@/lib/blog/repository";

export const metadata: Metadata = {
  title: "Authors — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default async function AuthorsPage() {
  const blogs = await getAllBlogsForAdmin();

  // Derive unique authors from blog data
  const authorsMap = new Map<string, {
    name: string;
    designation: string;
    count: number;
  }>();

  for (const blog of blogs) {
    const key = `${blog.author.firstName} ${blog.author.lastName}`;
    const prev = authorsMap.get(key);
    if (prev) {
      authorsMap.set(key, { ...prev, count: prev.count + 1 });
    } else {
      authorsMap.set(key, {
        name: key,
        designation: blog.author.designation,
        count: 1,
      });
    }
  }

  const authors = Array.from(authorsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">Authors</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          {authors.length} contributing author{authors.length !== 1 ? "s" : ""} across all blog entries.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
        <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
            Contributing Authors
          </span>
        </div>

        {authors.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-3xl mb-3 opacity-20">◉</div>
            <p className="text-[13px] text-[#94a3b8]">No authors found.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f8fafc]">
            {authors.map((author) => (
              <div
                key={author.name}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] text-[13px] font-black text-white">
                    {author.name[0]}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#0a1628]">{author.name}</div>
                    <div className="text-[11px] text-[#94a3b8]">{author.designation}</div>
                  </div>
                </div>
                <span className="rounded-full border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 text-[11px] font-bold text-[#1677f2]">
                  {author.count} article{author.count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-[#f0f4f8] bg-[#fffbf0] px-6 py-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#1677f2]/30 bg-[#1677f2]/8 px-4 py-3">
            <span className="text-[#1677f2] text-lg">ℹ</span>
            <p className="text-[12px] text-[#b8860b] font-medium">
              Author profiles are currently derived from blog data. A dedicated author
              management panel (add bio, avatar, social links) is planned for a future release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
