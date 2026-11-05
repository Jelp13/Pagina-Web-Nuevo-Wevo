import ContactoPageClient from '@/components/ContactoPageClient';
import { getContactInfo, getPageTitles } from '@/lib/site-settings';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contacto | Nuevo Wevo',
  description: 'Contáctanos por WhatsApp, llamada o correo. Resolvemos tus dudas sobre torres gamer, portátiles y periféricos.',
  alternates: { canonical: absoluteUrl('/contacto') },
};

export default async function ContactoPage() {
  const [contactInfo, titles] = await Promise.all([getContactInfo(), getPageTitles()]);
  return <ContactoPageClient contactInfo={contactInfo} hero={titles.contactoHero} />;
}
