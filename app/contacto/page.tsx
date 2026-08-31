import ContactoPageClient from '@/components/ContactoPageClient';
import { getContactInfo } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export default async function ContactoPage() {
  const contactInfo = await getContactInfo();
  return <ContactoPageClient contactInfo={contactInfo} />;
}
