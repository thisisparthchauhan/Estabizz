import type { ReactNode } from "react";

import CandidateAccountNav from "./CandidateAccountNav";

export const dynamic = "force-dynamic";

export default function CandidateAccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CandidateAccountNav />
      {children}
    </>
  );
}
