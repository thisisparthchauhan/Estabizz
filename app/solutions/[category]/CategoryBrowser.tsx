"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { CategoryTopicGroup } from "@/lib/content/services/registry";

// Need-based browser for a /solutions/<category> hub.
//
// Legal carries 58 services. The previous flat two-column card grid made the
// page honest but unusable: every service got equal weight, the only ordering
// was the order of the registry array, and finding "cheque bounce" meant
// scrolling past fifty unrelated cards. A visitor arrives with a situation,
// not a service name -- so the page leads with situations (topic sections),
// and a filter collapses the whole category to whatever they type.
//
// Filtering is client-side over data already in the payload: the full list is
// rendered server-side first, so the page is complete without JavaScript and
// stays fully crawlable. The filter only hides what is already there.

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function CategoryBrowser({
  groups,
  categoryLabel,
  showFilter,
}: {
  groups: CategoryTopicGroup[];
  categoryLabel: string;
  showFilter: boolean;
}) {
  const [query, setQuery] = useState("");

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.entries.length, 0),
    [groups],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        entries: group.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            group.heading.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.entries.length > 0);
  }, [groups, query]);

  const matches = filtered.reduce((n, g) => n + g.entries.length, 0);

  return (
    <div>
      {showFilter && (
        <div className="mb-14">
          <label className="sr-only" htmlFor="category-filter">
            Filter {categoryLabel} services
          </label>
          <div className="relative max-w-[540px]">
            <span
              aria-hidden
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[15px] text-[#94a3b8]"
            >
              ⌕
            </span>
            <input
              id="category-filter"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Describe your situation — divorce, cheque, FIR, property…`}
              className="w-full rounded-2xl border border-blue-100 dark:border-[#27272b] bg-white dark:bg-[#141417] py-3.5 pl-11 pr-5 text-[15px] font-medium text-[#071426] dark:text-[#fafafa] shadow-[0_8px_30px_rgba(0,80,140,0.06)] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#1677f2]"
            />
          </div>
          <p className="mt-3 text-[13px] font-semibold text-[#94a3b8]" aria-live="polite">
            {query.trim()
              ? `${matches} of ${total} services match “${query.trim()}”`
              : `${total} services, grouped by what you are trying to do`}
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-blue-100 dark:border-[#27272b] bg-[#f7fbff] dark:bg-[#1c1c20] px-6 py-14 text-center">
          <p className="text-[18px] font-black text-[#071426] dark:text-[#fafafa]">
            Nothing here matches “{query.trim()}”
          </p>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b] dark:text-[#a1a1aa]">
            Clear the filter to see all {total} {categoryLabel.toLowerCase()} services, or tell us
            the situation and we will point you to the right one.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center justify-center rounded-xl border border-blue-100 dark:border-[#27272b] bg-white dark:bg-[#141417] px-6 py-3 text-[14.5px] font-bold text-[#1677f2] transition-colors hover:border-[#1677f2]/40 dark:text-[#4f9dfb]"
            >
              Clear filter
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3 text-[14.5px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
            >
              Speak with Expert →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-14">
          {filtered.map((group) => (
            <section key={group.heading} id={slugify(group.heading)} className="scroll-mt-[96px]">
              <div className="mb-6 border-b border-blue-100 dark:border-[#27272b] pb-4">
                <h2 className="text-[22px] font-black leading-tight tracking-[-0.03em] text-[#120b45] dark:text-[#fafafa]">
                  {group.heading}
                </h2>
                <p className="mt-2 max-w-[760px] text-[14.5px] font-medium leading-[1.8] text-[#64748b] dark:text-[#a1a1aa]">
                  {group.blurb}
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.entries.map((entry) => (
                  <Link
                    key={entry.href + entry.title}
                    href={entry.href}
                    className="group flex flex-col rounded-[22px] border border-blue-100 dark:border-[#27272b] bg-white dark:bg-[#141417] p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1677f2]/40"
                  >
                    <span className="text-[10.5px] font-black uppercase tracking-[0.18em] text-[#1677f2] dark:text-[#4f9dfb]">
                      {entry.kind === "guide" ? "Full guide" : "Service"}
                    </span>
                    <h3 className="mt-2.5 text-[17px] font-black leading-snug text-[#071426] dark:text-[#fafafa] transition-colors group-hover:text-[#1677f2]">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13.5px] font-medium leading-[1.75] text-[#64748b] dark:text-[#a1a1aa]">
                      {entry.description}
                    </p>
                    <span className="mt-4 flex flex-wrap items-center gap-x-3 text-[12px] font-bold text-[#94a3b8]">
                      {entry.meta && <span>{entry.meta}</span>}
                      <span className="ml-auto text-[#1677f2] dark:text-[#4f9dfb]">Open →</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Closing CTA.
          The no-match state already offered a way out; the populated state did
          not, so a reader who scrolled all 58 services and still was not sure
          which one described their situation reached the end of the page with
          nothing to do. That is the reader most worth talking to. */}
      {!query.trim() && (
        <div className="mt-16 rounded-[28px] border border-blue-100 dark:border-[#27272b] bg-[#f7fbff] dark:bg-[#1c1c20] px-6 py-12 text-center sm:px-12">
          <p className="text-[22px] font-black tracking-[-0.03em] text-[#120b45] dark:text-[#fafafa]">
            Not sure which one is your situation?
          </p>
          <p className="mx-auto mt-3 max-w-[560px] text-[14.5px] font-medium leading-[1.8] text-[#64748b] dark:text-[#a1a1aa]">
            Describe what has happened in your own words. We will tell you which route applies,
            what it costs and what the realistic timeline looks like — before you commit to anything.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?service=${encodeURIComponent(categoryLabel)}`}
              className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
            >
              Speak with Expert →
            </Link>
            <a
              href="https://wa.me/919825600907"
              className="inline-flex items-center justify-center rounded-xl border border-blue-100 dark:border-[#27272b] bg-white dark:bg-[#141417] px-7 py-3.5 text-[15px] font-bold text-[#1677f2] transition-colors hover:border-[#1677f2]/40 dark:text-[#4f9dfb]"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
