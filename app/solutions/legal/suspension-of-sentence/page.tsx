import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/suspension-of-sentence';

export const metadata: Metadata = {
  title: 'Suspension of Sentence: BNSS Section 430 and Bail Pending Appeal',
  description: 'Suspension of sentence support under BNSS Section 430, including appeal review, post-conviction bail, court documentation, surety readiness and counsel coordination.',
  keywords: 'Suspension of Sentence, BNSS Section 430, bail pending appeal, post-conviction bail, appellate court, sentence suspension application',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Suspension of Sentence - Appeal and Bail Support',
    description: 'Appeal-linked sentence suspension, post-conviction bail, records, surety readiness and court coordination.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
