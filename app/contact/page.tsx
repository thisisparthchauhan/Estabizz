import type { Metadata } from 'next';
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_CONTACT_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import ContactClient from './ContactClient';

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getContent('seo.contact') as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_CONTACT_DEFAULTS, '/contact');
}

export default function Page() {
    return <ContactClient />;
}
