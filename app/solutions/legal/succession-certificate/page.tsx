import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/succession-certificate';

export const metadata: Metadata = {
  title: 'Succession Certificate for Bank Accounts, FDs and Securities',
  description: 'Succession certificate support for bank balances, fixed deposits, shares and securities, including heir mapping, asset schedules, court fees and petition coordination.',
  keywords: 'Succession Certificate, Indian Succession Act, bank account after death, fixed deposit claim, share transmission, legal heirs, debts and securities',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Succession Certificate - Financial Asset Claim Support',
    description: 'Legal-heir mapping, asset schedules, court petition support and post-certificate bank and securities claims.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
