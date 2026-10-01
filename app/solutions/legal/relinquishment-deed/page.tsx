import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/relinquishment-deed';

export const metadata: Metadata = {
  title: 'Relinquishment Deed: Property Share Release and Registration',
  description: 'Relinquishment Deed legal support in India for inherited property, legal-heir share release, stamp duty, registration, NRI execution and mutation.',
  keywords: 'Relinquishment Deed, property share release, release deed registration, inherited property legal heirs, relinquishment stamp duty, NRI relinquishment deed, mutation after relinquishment',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Relinquishment Deed — Property Share Release and Registration',
    description: 'Legal-heir mapping, deed drafting, stamp duty, registration and record updates for inherited and jointly owned property.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
