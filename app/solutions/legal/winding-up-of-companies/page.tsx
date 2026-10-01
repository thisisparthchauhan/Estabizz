import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/winding-up-of-companies';

export const metadata: Metadata = {
  title: 'Winding Up of Companies: NCLT and Liquidation Support',
  description: 'Company winding-up and closure-route support covering Section 271, voluntary liquidation, strike-off assessment, creditors, liquidator coordination and dissolution.',
  keywords: 'Winding Up of Companies, Companies Act Section 271, NCLT winding up, company liquidation, IBC Section 59, voluntary liquidation, company closure',
  alternates: { canonical: FULL_PATH },
  openGraph: {
    title: 'Winding Up of Companies - Closure and Liquidation Support',
    description: 'Closure-route assessment, Tribunal process, voluntary liquidation, strike-off comparison and dissolution tracking.',
    url: FULL_PATH,
    type: 'article',
  },
};

export default function Page() {
  return <PageClient />;
}
