import CartPageClient from '@/components/CartPageClient';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default function CartPage() {
  return <CartPageClient />;
}
