'use client';

import React from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';
import type { PublicContentPageRenderData } from '@/lib/publicContent/rendering';
import type { PublicContentImage } from '@/lib/publicContent/types';

interface NormalisedSection {
  id: string;
  title: string;
  body: string;
  image: PublicContentImage | null;
}

type SourceReference = PublicContentPageRenderData['sourceReferences'][number];

const BLOCKED_SOURCE_TERMS = [
  'imported source file',
  'source file',
  'migration',
  'importer',
  'debug',
  'qa',
  'qa marker',
  'phase4e',
  'phase4d',
  'phase4j',
];

function slugify(input: string, index: number): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `section-${index + 1}`;
}

function normaliseSections(page: PublicContentPageRenderData): NormalisedSection[] {
  return page.sections
    .map((section, index) => {
      const title = section.title?.trim() || `Section ${index + 1}`;
      const body = section.body?.trim() || '';
      return {
        id: section.id?.trim() || slugify(title, index),
        title,
        body,
        image: section.image ?? null,
      };
    })
    .filter((section) => section.title || section.body);
}

function isPublicSourceReference(source: SourceReference): boolean {
  const title = source.title?.trim() || '';
  const titleLower = title.toLowerCase();
  const url = source.url?.trim() || '';
  const urlLower = url.toLowerCase();

  if (!title) return false;
  if (BLOCKED_SOURCE_TERMS.some((term) => titleLower.includes(term))) return false;
  if (!urlLower.startsWith('https://') && !urlLower.startsWith('http://')) return false;
  if (urlLower.startsWith('app/') || urlLower.startsWith('/users/')) return false;
  if (urlLower.includes('localhost')) return false;
  if (urlLower.includes('.tsx') || urlLower.includes('.ts')) return false;

  return true;
}

function renderTextWithLinks(text: string) {
  const cosmosUrl = 'https://cosmos.rbi.org.in';
  const parts = text.split(cosmosUrl);

  return parts.flatMap((part, index) => {
    const nodes: React.ReactNode[] = [];
    if (part) nodes.push(part);
    if (index < parts.length - 1) {
      nodes.push(
        <a key={`cosmos-${index}`} href={cosmosUrl} target="_blank" rel="noopener noreferrer">
          RBI COSMOS Portal
        </a>
      );
    }
    return nodes;
  });
}

function renderFormattedLine(line: string) {
  const separator = line.includes(' - ') ? ' - ' : line.includes(': ') ? ': ' : null;

  if (!separator) return renderTextWithLinks(line);

  const [label, ...rest] = line.split(separator);
  const value = rest.join(separator);

  return (
    <>
      <span className="field-label">{label}</span>
      {separator}
      {renderTextWithLinks(value)}
    </>
  );
}

function renderBody(body: string, sectionId: string) {
  const blocks = body.split('\n\n').map((block) => block.trim()).filter(Boolean);
  if (!blocks.length) return null;

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const isBulletList = lines.length > 0 && lines.every((line) => line.startsWith('\u2022') || line.startsWith('- '));
    const isNumberedList = lines.length > 0 && lines.every((line) => /^\d+(?:\.\d+)?\s/.test(line));
    const stepMatch = block.match(/^Step\s+(\d+)\s+[\u2013-]\s+(.+)\n([\s\S]+)/);

    if (stepMatch) {
      return (
        <div key={`${sectionId}-step-${blockIndex}`} className="process-card">
          <h3>Step {stepMatch[1]} - {stepMatch[2]}</h3>
          <p>{renderTextWithLinks(stepMatch[3])}</p>
        </div>
      );
    }

    if (isBulletList) {
      return (
        <ul key={`${sectionId}-list-${blockIndex}`} className="clean-list">
          {lines.map((line, itemIndex) => (
            <li key={`${sectionId}-item-${blockIndex}-${itemIndex}`}>
              {renderFormattedLine(line.replace(/^\u2022\s*/, '').replace(/^-\s*/, ''))}
            </li>
          ))}
        </ul>
      );
    }

    if (isNumberedList) {
      return (
        <ol key={`${sectionId}-numbered-${blockIndex}`} className="numbered-list">
          {lines.map((line, itemIndex) => (
            <li key={`${sectionId}-numbered-item-${blockIndex}-${itemIndex}`}>
              {renderFormattedLine(line.replace(/^\d+(?:\.\d+)?\s*/, ''))}
            </li>
          ))}
        </ol>
      );
    }

    const firstBulletIndex = lines.findIndex((line) => line.startsWith('\u2022') || line.startsWith('- '));
    if (firstBulletIndex > 0) {
      const intro = lines.slice(0, firstBulletIndex).join(' ');
      const bullets = lines.slice(firstBulletIndex);

      return (
        <React.Fragment key={`${sectionId}-mixed-${blockIndex}`}>
          <p>{renderTextWithLinks(intro)}</p>
          <ul className="clean-list">
            {bullets.map((line, itemIndex) => (
              <li key={`${sectionId}-mixed-item-${blockIndex}-${itemIndex}`}>
                {renderFormattedLine(line.replace(/^\u2022\s*/, '').replace(/^-\s*/, ''))}
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }

    return <p key={`${sectionId}-p-${blockIndex}`}>{renderTextWithLinks(block)}</p>;
  });
}

export default function PublicContentPageRenderer({ page }: { page: PublicContentPageRenderData }) {
  const sections = normaliseSections(page);
  const tocSections = sections.map(({ id, title }) => ({ id, title }));
  const firstCta = page.ctaCards[0];
  const finalCta = page.ctaCards[1] ?? firstCta;
  const title = page.hero?.title?.trim() || page.title;
  const heroDescription = page.hero?.description?.trim() || page.summary;
  const tags = page.badges.length
    ? page.badges.map((badge) => ({ emoji: badge.emoji ?? '', label: badge.label }))
    : [{ emoji: '', label: page.regulator === 'Other' ? 'Public Page' : page.regulator }];
  const breadcrumb = page.breadcrumbs.length
    ? page.breadcrumbs
    : [
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: title },
      ];
  const quickFacts = page.quickFacts.length ? page.quickFacts : page.snapshotCards;
  const relatedArticles = page.relatedPages.map((related) => ({
    href: related.href,
    title: related.title,
    category: related.category || page.regulator || 'Related',
    description: related.description || '',
  }));
  const publicSourceReferences = page.sourceReferences.filter(isPublicSourceReference);

  return (
    <ServicePageLayout
      tags={tags}
      breadcrumb={breadcrumb}
      title={title}
      heroDescription={heroDescription}
      trustLine={page.hero?.trustLine}
      readTime={page.readingTime || '12 min read'}
      displayYear={page.lastReviewedAt ? new Date(page.lastReviewedAt).getFullYear().toString() : '2026'}
      focusKeyword={page.serviceType || page.category || title}
      sections={tocSections}
      ctaTitle={firstCta?.title || 'Need Expert Support?'}
      ctaDescription={firstCta?.description || page.summary || 'Speak with Estabizz for practical regulatory support.'}
      quickFacts={quickFacts}
      relatedArticles={relatedArticles}
      finalCtaTitle={finalCta?.title || 'Need Expert Support?'}
      finalCtaDescription={finalCta?.description || page.summary || 'Our compliance specialists can help you plan the next step.'}
    >
      {page.heroImage?.url && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#e2eaf2]">
          <img
            src={page.heroImage.url}
            alt={page.heroImage.alt}
            className="h-auto w-full object-cover"
          />
          {page.heroImage.caption && (
            <p className="border-t border-[#e2eaf2] bg-[#f8fafc] px-4 py-2 text-[12px] text-[#64748b]">
              {page.heroImage.caption}
            </p>
          )}
        </div>
      )}

      {sections.length > 0 ? (
        sections.map((section) => (
          <section key={section.id} className="mb-12">
            <h2 id={section.id}>{section.title}</h2>
            {section.image?.url && (
              <div className="mb-5 overflow-hidden rounded-xl border border-[#e2eaf2]">
                <img
                  src={section.image.url}
                  alt={section.image.alt}
                  className="h-auto w-full object-cover"
                />
                {section.image.caption && (
                  <p className="border-t border-[#e2eaf2] bg-[#f8fafc] px-4 py-2 text-[12px] text-[#64748b]">
                    {section.image.caption}
                  </p>
                )}
              </div>
            )}
            <div className="prose max-w-none">
              {renderBody(section.body, section.id)}
            </div>
          </section>
        ))
      ) : (
        <section className="mb-12">
          <h2 id="overview">{title}</h2>
          <div className="prose max-w-none">
            <p>{page.summary || heroDescription || title}</p>
          </div>
        </section>
      )}

      {publicSourceReferences.length > 0 && (
        <section className="mt-16">
          <h2 id="source-references">Source References</h2>
          <ul className="clean-list">
            {publicSourceReferences.map((source, index) => (
              <li key={`${source.title}-${index}`}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ServicePageLayout>
  );
}
