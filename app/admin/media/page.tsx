import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Library — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function MediaLibraryPage() {
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">Media Library</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          Upload and manage images and documents for blog articles.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] p-8 text-center">
        <div className="text-5xl mb-4 opacity-20">⊞</div>
        <h2 className="text-[16px] font-black text-[#0a1628] mb-2">Media Library</h2>
        <p className="text-[13px] text-[#64748b] mb-4 max-w-sm mx-auto leading-6">
          Upload blog images, documents and assets. Currently blog images are added via
          URL in the blog editor. Full media library with Cloudinary integration is on
          the development roadmap.
        </p>
        <div className="inline-flex items-center gap-3 rounded-xl border border-[#d9a938]/30 bg-[#d9a938]/8 px-4 py-3 text-[12px] text-[#b8860b] font-medium">
          <span className="text-[#d9a938]">ℹ</span>
          Coming soon — Cloudinary / S3 integration planned
        </div>
      </div>
    </div>
  );
}
