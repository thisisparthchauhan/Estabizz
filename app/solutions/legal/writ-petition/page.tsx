import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/writ-petition';

export const metadata: Metadata = {
  title: 'Writ Petition: Article 32 and Article 226 Legal Support',
  description: 'Writ petition support for constitutional and public-law remedies, including maintainability, jurisdiction, representations, interim relief and counsel coordination.',
  keywords: 'Writ Petition, Article 32, Article 226, Article 227, mandamus, habeas corpus, certiorari, prohibition, quo warranto, High Court writ',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Writ Petition - Constitutional Remedy Support',
    description: 'Maintainability, forum, public-law grounds, documentary records and urgent interim-relief strategy.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
