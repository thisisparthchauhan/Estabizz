"use client";
/**
 * CountryFAQ.tsx
 *
 * Collapsible FAQ accordion for country landing pages.
 * Renders FAQ schema when questions are visible.
 */

import React, { useState } from "react";
import { ChevronDown } from "@/components/globalMarkets/Icons";
import type { GlobalMarketFaq } from "@/lib/globalMarkets/types";

interface Props {
  faqs: GlobalMarketFaq[];
  countryName: string;
}

export default function CountryFAQ({ faqs, countryName: _countryName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-6 divide-y divide-[#e2edf8]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="text-[14px] font-semibold text-[#0a1628] leading-snug">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-4 w-4 flex-shrink-0 text-[#64748b] transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          {openIndex === i && (
            <div className="pb-4">
              <p className="text-[13.5px] leading-relaxed text-[#334155]">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
