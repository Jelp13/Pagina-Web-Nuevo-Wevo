import CheckoutPageClient from '@/components/CheckoutPageClient';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
