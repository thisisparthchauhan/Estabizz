import type { Metadata } from "next";
import Link from "next/link";

// Custom 404.
//
// Next's built-in not-found page is unstyled: it renders near-black text with
// no background of its own. Under `color-scheme: dark` the browser paints the
// page dark, so the default 404 is black-on-black and genuinely unreadable --
// the one page a lost visitor is guaranteed to hit.
//
// This one uses the site's own tokens in both themes and, rather than being a
// dead end, points at the places people actually arrive looking for.

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { href: "/solutions/legal", label: "Legal services", hint: "58 services grouped by situation" },
  { href: "/regulatory", label: "Regulatory licensing", hint: "RBI, SEBI, IRDAI, IFSCA and FEMA" },
  { href: "/solutions", label: "All solutions", hint: "IPR, compliance calendar and CFO support" },
  { href: "/blogs", label: "Insights", hint: "Circulars and regulatory explainers" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-white px-6 pt-[64px] dark:bg-[#09090b]">
      <div className="mx-auto w-full max-w-[720px] py-20">
        <p className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2] dark:text-[#4f9dfb]">
          404
        </p>
        <h1 className="mt-4 text-[clamp(30px,4vw,46px)] font-black leading-[1.08] tracking-[-0.04em] text-[#071426] dark:text-[#fafafa]">
          We could not find that page
        </h1>
        <p className="mt-5 max-w-[560px] text-[16px] font-medium leading-[1.9] text-[#475569] dark:text-[#a1a1aa]">
          The link may be out of date, or the page may have moved. Here is where most people are
          heading.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-[20px] border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 dark:border-[#27272b] dark:bg-[#141417] dark:shadow-none"
            >
              <p className="text-[15.5px] font-black text-[#071426] transition-colors group-hover:text-[#1677f2] dark:text-[#fafafa] dark:group-hover:text-[#4f9dfb]">
                {d.label}
              </p>
              <p className="mt-1.5 text-[13.5px] font-medium leading-[1.7] text-[#64748b] dark:text-[#a1a1aa]">
                {d.hint}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-7 py-3.5 text-[15px] font-bold text-[#1677f2] transition-colors hover:border-[#1677f2]/40 dark:border-[#27272b] dark:bg-[#141417] dark:text-[#4f9dfb]"
          >
            Talk to an expert
          </Link>
        </div>
      </div>
    </main>
  );
}
