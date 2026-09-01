import MarkdownContent from '@/components/MarkdownContent';
import LegalPage from '@/components/LegalPage';
import { getLegalPage } from '@/lib/site-settings';
import { LEGAL_PAGE_META } from '@/lib/legal-pages-defaults';

export const dynamic = 'force-dynamic';

const meta = LEGAL_PAGE_META['politica-privacidad'];

export const metadata = {
  title: meta.metaTitle,
  description: meta.metaDescription,
};

export default async function PoliticaPrivacidadPage() {
  const content = await getLegalPage('politica-privacidad');
  return (
    <LegalPage label={meta.label} title={content.title} updated={content.updatedLabel}>
      <MarkdownContent>{content.contentMarkdown}</MarkdownContent>
    </LegalPage>
  );
}
