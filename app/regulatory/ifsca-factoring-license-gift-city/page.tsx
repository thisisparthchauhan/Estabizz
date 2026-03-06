import type { Metadata } from 'next';
import RegulatoryArticleClient from './RegulatoryArticleClient';

export const metadata: Metadata = {
  title: "IFSCA Factoring License in GIFT City – Complete Regulatory Guide for Finance Companies",
  description: "IFSCA Factoring License in GIFT City allows finance companies in IFSC to undertake receivable financing and trade discounting. Learn eligibility, registration process, capital requirements, documents, and compliance under IFSCA Regulations 2024.",
  keywords: "IFSCA Factoring License in GIFT City",
  alternates: {
    canonical: "/regulatory/ifsca-factoring-license-gift-city"
  }
};

export default function Page() {
  return <RegulatoryArticleClient />;
}
