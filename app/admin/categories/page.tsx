import type { Metadata } from "next";
import { getAllCategories } from "@/lib/blog/repository";

export const metadata: Metadata = {
  title: "Categories — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">Categories</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          {categories.length} blog categories — full CRUD management coming soon.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
        <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
            Existing Categories
          </span>
        </div>
        <div className="divide-y divide-[#f8fafc]">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-[#f8fafc] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <div className="text-[13px] font-bold text-[#0a1628]">{cat.name}</div>
                  <div className="text-[11px] text-[#94a3b8]">/{cat.slug}</div>
                </div>
              </div>
              <span className="text-[11px] text-[#94a3b8]">{cat.description}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#f0f4f8] bg-[#fffbf0] px-6 py-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#d9a938]/30 bg-[#d9a938]/8 px-4 py-3">
            <span className="text-[#d9a938] text-lg">ℹ</span>
            <p className="text-[12px] text-[#b8860b] font-medium">
              Full category management (add, edit, delete, reorder) is in the development roadmap.
              Categories are currently defined in{" "}
              <code className="rounded bg-[#d9a938]/15 px-1 py-0.5 font-mono text-[11px]">
                lib/blog/categories.ts
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
