"use client";

import { useEffect, useState } from "react";

/**
 * Sticky section navigator for a long-form service page.
 *
 * These pages run to ~35 headed sections, most of them dense comparison
 * tables. Without a persistent index the reader has no way to tell what the
 * page contains or to get back to a section they passed, so the TOC is load
 * bearing here rather than decoration.
 *
 * Scroll-spy uses IntersectionObserver with a top-biased rootMargin so the
 * highlighted entry is the section actually under the header, not merely the
 * first one touching the viewport. It degrades to a plain anchor list if the
 * observer never fires -- every link is a real href, so navigation works with
 * no JS at all.
 */
export default function ServiceTableOfContents({
  sections,
  faqAnchor,
}: {
  sections: Array<{ id: string; heading: string }>;
  faqAnchor: string;
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = [...sections.map((s) => s.id), faqAnchor];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Top band only: a section counts as "current" once its heading is near
      // the sticky header and until the next one gets there.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections, faqAnchor]);

  return (
    <nav aria-label="On this page" className="text-[13px]">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#94a3b8]">
        On this page
      </p>
      <ol className="max-h-[calc(100vh-190px)] space-y-0.5 overflow-y-auto pr-2">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                  isActive
                    ? "border-[#1677f2] font-bold text-[#1677f2]"
                    : "border-transparent text-[#64748b] hover:border-blue-100 hover:text-[#071426]"
                }`}
              >
                {s.heading}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href={`#${faqAnchor}`}
            aria-current={active === faqAnchor ? "true" : undefined}
            className={`block border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
              active === faqAnchor
                ? "border-[#1677f2] font-bold text-[#1677f2]"
                : "border-transparent text-[#64748b] hover:border-blue-100 hover:text-[#071426]"
            }`}
          >
            FAQs
          </a>
        </li>
      </ol>
    </nav>
  );
}
