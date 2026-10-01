import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/sexual-harassment-at-workplace-compliance';

export const metadata: Metadata = {
  title: 'Sexual Harassment at Workplace and POSH Compliance',
  description: 'POSH compliance support for workplace policy, Internal Committee formation, employee training, complaint procedures, annual reporting and confidential documentation.',
  keywords: 'Sexual Harassment at Workplace, POSH compliance, POSH Act 2013, Internal Committee, workplace harassment policy, POSH training, annual report',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Sexual Harassment at Workplace - POSH Compliance',
    description: 'Policy, Internal Committee, training, reporting and confidential workplace complaint-process support.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
