import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/special-leave-petition';

export const metadata: Metadata = {
  title: 'Special Leave Petition: Supreme Court Article 136 Support',
  description: 'Special Leave Petition support under Article 136, including limitation review, questions of law, stay strategy, paper-book preparation and Advocate-on-Record coordination.',
  keywords: 'Special Leave Petition, SLP Supreme Court, Article 136, Supreme Court stay, SLP limitation, Advocate-on-Record, AOR coordination',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Special Leave Petition - Supreme Court SLP Support',
    description: 'Order review, limitation, legal grounds, interim relief, registry readiness and Advocate-on-Record coordination.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
