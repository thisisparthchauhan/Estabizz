import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/tenant-eviction-notice';

export const metadata: Metadata = {
  title: 'Tenant Eviction Notice: Lease Termination and Possession',
  description: 'Tenant eviction notice support for rent default, lease expiry, Section 106 termination, arrears, notice service, evidence and lawful possession recovery.',
  keywords: 'Tenant Eviction Notice, Section 106 notice, lease termination, rent default, possession recovery, eviction suit, rent arrears, landlord legal notice',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Tenant Eviction Notice - Lawful Possession Recovery',
    description: 'Lease review, notice periods, arrears, grounds, service evidence and eviction-proceeding readiness.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
