'use client';

import SourceDocumentLegalPage, { type LegalSourcePageData } from '../_components/SourceDocumentLegalPage';
import content from './content.json';

export default function PageClient() {
  return <SourceDocumentLegalPage data={content as LegalSourcePageData} />;
}
