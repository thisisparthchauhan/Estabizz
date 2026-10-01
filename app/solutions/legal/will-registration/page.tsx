import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/will-registration';

export const metadata: Metadata = {
  title: 'Will Registration: Estate Planning and Succession Support',
  description: 'Will drafting and registration support covering asset schedules, beneficiaries, executors, witnesses, Sub-Registrar coordination, nomination and probate review.',
  keywords: 'Will Registration, registered Will, estate planning India, Will drafting, executor appointment, Will witnesses, Sub-Registrar, succession planning',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Will Registration - Estate Planning Support',
    description: 'Asset mapping, beneficiary planning, executor and witness preparation, registration and safe-custody guidance.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
