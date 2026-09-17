import type { ReactNode } from "react";

import CandidateAccountNav from "./CandidateAccountNav";
import { areCandidateApplicationsEnabled } from "@/lib/jobs/launchFlags";
import { CandidateApplicationsGate } from "@/components/jobs/CandidateApplicationsGate";

export const dynamic = "force-dynamic";

export default function CandidateAccountLayout({ children }: { children: ReactNode }) {
  // Single gate for the entire /jobs/account/* tree (dashboard, profile,
  // applications, saved, alerts, privacy): every child page calls
  // requireCandidateAccountSessionForPage() or requireCandidateProfileSessionForPage(),
  // both of which need Postgres, which won't exist until this flag can turn
  // on for real. Gating here means {children} -- and therefore every one of
  // those Postgres calls -- never runs while disabled, rather than adding the
  // same check six times.
  if (!areCandidateApplicationsEnabled()) {
    return <CandidateApplicationsGate heading="Candidate Account Opening Shortly" />;
  }

  return (
    <>
      <CandidateAccountNav />
      {children}
    </>
  );
}
