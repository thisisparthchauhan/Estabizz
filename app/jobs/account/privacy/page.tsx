import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { buildLoginHref } from "@/lib/jobs/candidateIdentity/redirects";
import { requireCandidateAccountSessionForPage } from "@/lib/jobs/candidateIdentity/access";
import DeleteAccountClient from "./DeleteAccountClient";

export const metadata: Metadata = {
  title: "Privacy — Estabizz Jobs",
  description: "Manage your Estabizz Jobs candidate account data.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidatePrivacyPage() {
  const session = await requireCandidateAccountSessionForPage();

  if (!session) {
    redirect(buildLoginHref("/jobs/account/privacy"));
  }

  return <DeleteAccountClient />;
}
