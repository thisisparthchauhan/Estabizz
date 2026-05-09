"use client";

import React, { useMemo, useState } from "react";

export type FAQItem = {
    section: string;
    question: string;
    answer: string;
};

export default function FAQAccordion({ faqs, searchable = true }: { faqs: FAQItem[]; searchable?: boolean }) {
    const [query, setQuery] = useState("");
    const filteredFaqs = useMemo(() => {
        const value = query.trim().toLowerCase();
        if (!value) return faqs;
        return faqs.filter((faq) =>
            `${faq.section} ${faq.question} ${faq.answer}`.toLowerCase().includes(value)
        );
    }, [faqs, query]);

    const grouped = useMemo(() => {
        return filteredFaqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
            if (!acc[faq.section]) acc[faq.section] = [];
            acc[faq.section].push(faq);
            return acc;
        }, {});
    }, [filteredFaqs]);

    return (
        <div className="space-y-8">
            {searchable && (
                <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                    <label htmlFor="faq-search" className="sr-only">Search compliance FAQs</label>
                    <input
                        id="faq-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search FAQs by eligibility, documents, fees, timeline or compliance..."
                        className="w-full rounded-xl border border-blue-100 bg-[#f8faff] px-4 py-3 text-[14px] font-medium text-[#0a1628] outline-none focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10"
                    />
                </div>
            )}

            {Object.entries(grouped).map(([section, items]) => (
                <section key={section} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 text-[18px] font-black text-[#0a1628]">{section}</h3>
                    <div className="space-y-3">
                        {items.map((faq) => (
                            <details key={faq.question} className="group rounded-xl border border-gray-100 bg-[#fbfdff] p-4">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[14px] font-bold text-[#0a1628]">
                                    <span>{faq.question}</span>
                                    <span className="mt-0.5 text-[#0096D6] transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-3 text-[13.5px] leading-7 text-[#475569]">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            ))}

            {filteredFaqs.length === 0 && (
                <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center text-[#64748b]">
                    No FAQ matched your search. Try a broader term such as eligibility, net worth, documents or compliance.
                </div>
            )}
        </div>
    );
}
