import ContactoPageClient from '@/components/ContactoPageClient';
import { getContactInfo, getPageTitles } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export default async function ContactoPage() {
  const [contactInfo, titles] = await Promise.all([getContactInfo(), getPageTitles()]);
  return <ContactoPageClient contactInfo={contactInfo} hero={titles.contactoHero} />;
}
