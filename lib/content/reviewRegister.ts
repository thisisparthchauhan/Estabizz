/**
 * Review register for published guidance pages.
 *
 * "Expert Reviewed" was a visual assertion with nothing behind it: a page could
 * display the badge without anyone recording who checked it, when, or against
 * which law. This file is the record, and scripts/reviewRegisterTest.mjs fails
 * the build if a page claims review without an entry here.
 *
 * A page is reviewed when, and only when, somebody adds a row. Nothing in this
 * file should be filled in by anyone who did not actually do the review.
 */

export interface ReviewEntry {
  /** Route the entry covers, e.g. "/solutions/legal/gift-deed-registration". */
  route: string;
  /** Who reviewed it, and in what capacity. */
  reviewer: string;
  /** Their qualification, so the claim can be weighed. */
  qualification: string;
  /** ISO date the review was completed. */
  reviewedOn: string;
  /** Amendments were checked up to this date — the number that actually matters. */
  amendmentsCheckedTo: string;
  /** Statutes and instruments checked during the review. */
  lawsChecked: string[];
  /** When this page should be looked at again. */
  nextReviewDue: string;
}

/**
 * Deliberately empty.
 *
 * Nothing on the site has a recorded review, so nothing may claim one. Populating
 * this with invented reviewers and dates would recreate exactly the problem it
 * exists to solve. Add entries as real reviews are completed; the badge appears
 * on a page the moment its route is listed here.
 */
export const REVIEW_REGISTER: ReviewEntry[] = [];

const BY_ROUTE = new Map(REVIEW_REGISTER.map((entry) => [entry.route, entry]));

export function getReview(route: string): ReviewEntry | undefined {
  return BY_ROUTE.get(route);
}

export function isReviewed(route: string): boolean {
  return BY_ROUTE.has(route);
}
