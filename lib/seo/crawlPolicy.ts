/**
 * Whether this deployment may be crawled and indexed.
 *
 * WHY: staging serves the same pages as production, with `index, follow` and
 * canonicals pointing at the production domain. Today that is harmless only
 * because Vercel Deployment Protection blocks every crawler with an SSO
 * redirect. The moment protection is lifted -- to let colleagues browse
 * staging, say -- staging becomes an indexable duplicate of production that
 * also claims production's canonical URLs.
 *
 * That is a one-switch mistake, and nothing in the code currently prevents it.
 *
 * FAIL-SAFE DIRECTION: this returns false only when the deployment is
 * POSITIVELY identified as non-production. Everything unknown or unset stays
 * crawlable, exactly as before. The opposite default -- crawlable only when
 * production is positively proven -- would deindex the entire marketing site
 * the day someone mistypes an environment variable, which is a far worse
 * failure than an indexable staging site behind SSO.
 *
 * VERCEL_ENV is preferred over APP_ENV because Vercel sets it on every
 * deployment automatically ("production" | "preview" | "development"). It
 * cannot drift, because nobody has to remember to configure it.
 */
export function isIndexableDeployment(env: NodeJS.ProcessEnv = process.env): boolean {
  const vercelEnv = env.VERCEL_ENV?.trim().toLowerCase();

  if (vercelEnv === "preview" || vercelEnv === "development") {
    return false;
  }

  const appEnv = (env.APP_ENV || env.NEXT_PUBLIC_APP_ENV)?.trim().toLowerCase();

  if (appEnv === "staging" || appEnv === "development" || appEnv === "preview") {
    return false;
  }

  return true;
}
