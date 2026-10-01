import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/revival-of-struck-off-companies';

export const metadata: Metadata = {
  title: 'Revival of Struck-Off Companies: Section 252 NCLT Restoration',
  description: 'Revival of struck-off companies in India under Section 252, including NCLT restoration, STK-7 review, evidence, pending ROC filings and post-revival compliance.',
  keywords: 'Revival of Struck-Off Companies, Section 252 Companies Act, NCLT company restoration, STK-7, NCLT-9, ROC restoration, struck off company revival',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Revival of Struck-Off Companies — NCLT and ROC Support',
    description: 'Section 252 routes, evidence, limitation, restoration orders and post-revival compliance for struck-off companies.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
