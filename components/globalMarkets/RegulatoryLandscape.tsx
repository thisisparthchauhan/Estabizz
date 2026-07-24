"use client";
/**
 * RegulatoryLandscape.tsx
 *
 * Displays a verified list of regulators for a country page.
 * Only renders entries where verified === true.
 * For countries with no verified regulators, renders a placeholder notice.
 *
 * Rule: Never infer regulator names. Never auto-generate legal claims.
 * Rule: Do not show fake logos or unverified regulatory associations.
 */

import React from "react";
import { Scale } from "@/components/globalMarkets/Icons";
import type { GlobalRegulator } from "@/lib/globalMarkets/types";

interface Props {
  countryName: string;
  regulators?: GlobalRegulator[];
}

export default function RegulatoryLandscape({ countryName, regulators }: Props) {
  const verified = (regulators ?? []).filter(r => r.verified);

  return (
    <div>
      {verified.length > 0 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {verified.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-[#e2edf8] bg-[#f8fbff] p-4"
            >
              <div className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1677f2]" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-bold text-[#0a1628]">
                    {r.name}{r.acronym ? ` (${r.acronym})` : ""}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#64748b]">{r.area}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#334155]">
                    {r.whenItMayApply}
                  </p>
                  {r.officialUrl && (
                    <a
                      href={r.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-[11px] text-[#1677f2] hover:underline"
                    >
                      Official website ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-[#e2edf8] bg-[#f8fbff] p-5">
          <p className="text-[13.5px] leading-relaxed text-[#334155]">
            Country-specific regulatory mapping for {countryName} is available as part of
            a formal market-entry assessment. Enquiries are managed through our India-based
            Global Market Desk.
          </p>
        </div>
      )}
      <p className="mt-4 text-[11.5px] leading-relaxed text-[#94a3b8]">
        Regulatory applicability depends on the proposed business model and must be
        confirmed with qualified local professionals. Estabizz does not provide legal
        opinions on foreign law.
      </p>
    </div>
  );
}
