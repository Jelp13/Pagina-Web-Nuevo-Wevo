import ConfirmacionPageClient from '@/components/ConfirmacionPageClient';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default function ConfirmationPage() {
  return <ConfirmacionPageClient />;
}
