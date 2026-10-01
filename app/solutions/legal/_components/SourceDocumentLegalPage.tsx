'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';
const standaloneLeads = new Set([
  'In simple terms…',
  'From a compliance perspective…',
]);

type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

type TableBlock = {
  type: 'table';
  headers: string[];
  rows: string[][];
};

type GuideBlock = ParagraphBlock | TableBlock;

export interface LegalSourcePageData {
  title: string;
  focusKeyword: string;
  tags: string[];
  breadcrumbLabel: string;
  readTime: string;
  trustLine: string;
  reviewPending: boolean;
  heroParagraphs: string[];
  quickFacts: { label: string; value: string }[];
  relatedArticles: {
    title: string;
    href: string;
    category: string;
    description: string;
  }[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  sections: {
    id: string;
    title: string;
    blocks: GuideBlock[];
  }[];
  faqs: { q: string; a: string }[];
  expertQuote: { quote: string; attribution: string } | null;
  disclaimer: string;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id} className="visible">{title}</h2>{children}</section>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-blue-100">
      <table className="data-table my-0 min-w-[640px]">
        <thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'table') {
      return <DataTable headers={block.headers} rows={block.rows} key={`table-${index}`} />;
    }

    if (standaloneLeads.has(block.text)) return null;

    const previous = blocks[index - 1];
    if (previous?.type === 'paragraph' && standaloneLeads.has(previous.text)) {
      return <p key={`paragraph-${index}`}><strong>{previous.text}</strong> {block.text}</p>;
    }

    const riskLead = 'From a risk perspective,';
    if (block.text.startsWith(riskLead)) {
      return <p key={`paragraph-${index}`}><strong>{riskLead}</strong> {block.text.slice(riskLead.length).trimStart()}</p>;
    }

    return <p key={`paragraph-${index}`}>{block.text}</p>;
  });
}

function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return <div className="faq-accordion">{items.map((faq, index) => (
    <details className="faq-item" key={faq.q} id={`faq-${index + 1}`}>
      <summary>{index + 1}. {faq.q}</summary>
      <div className="faq-answer"><p>{faq.a}</p></div>
    </details>
  ))}</div>;
}

export default function SourceDocumentLegalPage({ data }: { data: LegalSourcePageData }) {
  const sections = [
    ...data.sections.map(({ id, title }) => ({ id, title })),
    { id: 'faqs', title: 'FAQs' },
    { id: 'expert-insight', title: 'Expert Insight' },
    { id: 'disclaimer', title: 'Disclaimer' },
  ];

  return (
    <ServicePageLayout
      tags={data.tags.map((label) => ({ emoji: '', label }))}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Legal', href: '/solutions/legal' },
        { label: data.breadcrumbLabel },
      ]}
      title={data.title}
      readTime={data.readTime}
      trustLine={data.trustLine}
      reviewPending={data.reviewPending}
      focusKeyword={data.focusKeyword}
      sections={sections}
      ctaTitle="Speak With a Legal Expert"
      ctaDescription="Get the facts, documents, applicable route and next steps reviewed before you file or sign."
      quickFacts={data.quickFacts}
      relatedArticles={data.relatedArticles}
      finalCtaTitle={data.finalCtaTitle}
      finalCtaDescription={data.finalCtaDescription}
      heroDescription={<>{data.heroParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</>}
      heroActions={<>
        <Link href="/contact" className="rounded-lg bg-[#1677f2] px-6 py-3 font-bold text-white hover:bg-[#0866d9]">Speak With an Expert</Link>
        <a href={whatsappUrl} className="rounded-lg border border-blue-200 bg-white px-6 py-3 font-bold text-[#1677f2] hover:bg-blue-50">WhatsApp Estabizz</a>
      </>}
    >
      {data.sections.map((section) => (
        <Section id={section.id} title={section.title} key={section.id}>
          <GuideBlocks blocks={section.blocks} />
        </Section>
      ))}

      <Section id="faqs" title="FAQs">
        <FaqList items={data.faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        {data.expertQuote && (
          <p>“{data.expertQuote.quote}”<br />— <strong>{data.expertQuote.attribution}</strong></p>
        )}
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>{data.disclaimer}</p>
      </Section>
    </ServicePageLayout>
  );
}
