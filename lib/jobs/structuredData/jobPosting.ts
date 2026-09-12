/**
 * schema.org JobPosting markup for public job detail pages.
 *
 * Makes listings eligible for Google Jobs. Everything here is already visible
 * on the rendered page, so this exposes nothing new -- but two things are
 * deliberately withheld anyway:
 *
 *   - the internal job UUID. `identifier` carries the public slug instead.
 *     A primary key is not something to publish for a search crawler's benefit.
 *   - undisclosed salary. `salary_disclosed === false` means the recruiter
 *     chose not to publish a range, and structured data must not leak what the
 *     page itself withholds.
 *
 * INVALID MARKUP IS WORSE THAN NO MARKUP: Google penalises postings that are
 * expired, incomplete or inconsistent with the page. So this returns null
 * rather than emitting a partial object whenever a required field is missing,
 * and drops `validThrough` once it is in the past.
 */
import type { JobEmploymentType, RemotePolicy } from "@prisma/client";

/** The subset of PublicJobDetail this needs. Structural, so the caller is not
 *  forced to import the repository type into a view. */
export interface JobPostingSource {
  title: string;
  slug: string;
  description: string;
  department: string | null;
  location_text: string | null;
  employment_type: JobEmploymentType | null;
  remote_policy: RemotePolicy | null;
  min_years_experience: number | null;
  // salary_* are deliberately absent: see "BASE SALARY IS DELIBERATELY NOT
  // PUBLISHED" below. Callers pass the full job object; the extra fields are
  // simply not consumed.
  closes_at: Date | null;
  published_at: Date | null;
}

/**
 * Our employment types mapped onto Google's closed vocabulary.
 *
 * `consulting` and `contract` both become CONTRACTOR: Google has no separate
 * consulting value, and inventing one would silently invalidate the posting.
 */
const EMPLOYMENT_TYPE_SCHEMA: Record<JobEmploymentType, string> = {
  permanent:  "FULL_TIME",
  contract:   "CONTRACTOR",
  consulting: "CONTRACTOR",
  fixed_term: "TEMPORARY",
};

const ORGANIZATION = {
  "@type": "Organization",
  name: "Estabizz Fintech Private Limited",
  sameAs: "https://www.estabizz.com",
  logo: "https://www.estabizz.com/estabizz-logo.png",
} as const;

export function buildJobPostingJsonLd(
  job: JobPostingSource,
  siteUrl: string,
  now: Date = new Date(),
): Record<string, unknown> | null {
  const title = job.title?.trim();
  const description = job.description?.trim();

  // datePosted is required by Google. An unpublished job has no honest value
  // for it, and back-filling "now" would claim a posting date that never
  // happened.
  if (!title || !description || !job.published_at) {
    return null;
  }

  const posting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted: toIsoDate(job.published_at),
    hiringOrganization: ORGANIZATION,
    // Slug, never the UUID.
    identifier: { "@type": "PropertyValue", name: ORGANIZATION.name, value: job.slug },
    url: `${siteUrl.replace(/\/+$/, "")}/jobs/${job.slug}`,
  };

  // An expired validThrough makes Google drop the posting outright, so a
  // closing date that has already passed is omitted rather than published.
  if (job.closes_at && job.closes_at.getTime() > now.getTime()) {
    posting.validThrough = toIsoDate(job.closes_at);
  }

  if (job.employment_type) {
    posting.employmentType = EMPLOYMENT_TYPE_SCHEMA[job.employment_type];
  }

  if (job.department) {
    posting.occupationalCategory = job.department;
  }

  if (job.remote_policy === "remote") {
    posting.jobLocationType = "TELECOMMUTE";
  }

  // LOCATION IS INTENTIONALLY INCOMPLETE. Google wants a PostalAddress with
  // addressCountry, and the only location we store on a Job is free text
  // ("Mumbai, India", "Remote - APAC"). Guessing a country code from that
  // string would put unverified data into public markup, so addressLocality
  // carries what we actually know and nothing is invented.
  //
  // The fix is data, not code: the JobLocation model already has structured
  // country/state/city columns -- it is simply never populated. Wiring the
  // admin job form to it completes Google Jobs eligibility.
  if (job.location_text) {
    posting.jobLocation = {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location_text },
    };
  }

  // BASE SALARY IS DELIBERATELY NOT PUBLISHED.
  //
  // `salary_min` / `salary_max` are bare numbers with NO UNIT, and the job
  // detail page hard-codes the suffix "LPA" when rendering them. A stored 8
  // means 8 lakh per annum, not 8 rupees -- a factor of 100,000.
  //
  // Confirmed on deployed staging: a real listing stores 8-16 with currency INR
  // and renders "8-16 INR LPA". Emitted as a schema.org MonetaryAmount that
  // became `minValue: 8, currency: "INR", unitText: "YEAR"` -- a public,
  // machine-readable claim that the job pays eight rupees a year.
  //
  // Scaling by 100,000 for INR was rejected: it bakes a presentation assumption
  // into a data layer and is already meaningless for any other currency.
  //
  // A wrong salary in structured data is worse than none -- aggregators read it
  // as fact, and unlike the page it carries no "LPA" label to hint at the unit.
  // `baseSalary` is RECOMMENDED, not required, so omitting it costs no Google
  // Jobs eligibility. Publishing it needs the model to store an unambiguous
  // amount: absolute units, or an explicit unit column beside the figure.

  if (typeof job.min_years_experience === "number" && job.min_years_experience > 0) {
    posting.experienceRequirements = {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.min_years_experience * 12,
    };
  }

  return posting;
}

/**
 * Serialise for embedding in a <script type="application/ld+json"> block.
 *
 * JSON.stringify does NOT escape `<`, so a job description containing the
 * literal text `</script>` would close the block early and let everything after
 * it execute as markup. Job descriptions come from the admin CMS -- database
 * content, not a compile-time constant -- so that is a live injection path, not
 * a theoretical one.
 *
 * Escaping `<` to \u003c is the standard fix: JSON unescapes it back to `<`
 * for any consumer, so the payload is unchanged, but the HTML parser can no
 * longer see a closing tag. `&` and the line separators are escaped for the
 * same class of reason.
 */
export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Google accepts ISO 8601; date-only is correct for closes_at (a @db.Date)
 *  and unambiguous for published_at. */
function toIsoDate(value: Date): string {
  return new Date(value).toISOString().slice(0, 10);
}
