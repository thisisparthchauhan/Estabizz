"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CANDIDATE_ACCOUNT_NAV_ITEMS } from "@/lib/jobs/candidateAccount/navigation";

export default function CandidateAccountNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-blue-100 bg-white pt-[76px] shadow-[0_8px_24px_rgba(0,80,140,0.04)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
            Candidate Account
          </p>
          <h1 className="mt-1 text-xl font-black text-[#120b45]">Estabizz Jobs</h1>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Candidate account navigation">
          {CANDIDATE_ACCOUNT_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-black transition ${
                  active
                    ? "bg-[#1677f2] text-white"
                    : "border border-blue-100 bg-white text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
