import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  loadCandidateProfileReviewState,
  requireCandidateProfileSessionForPage,
} from "@/lib/jobs/profileReview/candidateAccess";
import ProfileReviewClient from "./ProfileReviewClient";

export const metadata: Metadata = {
  title: "Review Profile — Estabizz Jobs",
  description: "Review and confirm your Estabizz Jobs candidate profile.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidateProfileReviewPage() {
  const session = await requireCandidateProfileSessionForPage();

  if (!session) {
    redirect("/login");
  }

  const state = await loadCandidateProfileReviewState(session);

  return <ProfileReviewClient initialState={state} />;
}
