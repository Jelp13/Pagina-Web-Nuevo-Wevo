import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Tipos de entrada
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutBody {
  form: {
    nombres: string;
    apellidos: string;
    email: string;
    documento: string;
    direccion: string;
    ciudad: string;
    telefono: string;
  };
  paymentMethod: 'contra-entrega' | 'tarjeta' | 'pse' | 'nequi' | 'addi';
  items: CartItem[];
  total: number;
}

// Validación server-side (defensa en profundidad)
function validateBody(body: CheckoutBody): string | null {
  const { form, items, total } = body;
  if (!form?.nombres?.trim()) return 'Nombres requerido';
  if (!form?.apellidos?.trim()) return 'Apellidos requerido';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email inválido';
  if (!/^\d{6,12}$/.test(form.documento)) return 'Documento inválido';
  if (!form.direccion?.trim() || form.direccion.length < 8) return 'Dirección inválida';
  if (!form.ciudad?.trim()) return 'Ciudad requerida';
  if (!/^[3]\d{9}$/.test(form.telefono)) return 'Teléfono inválido';
  if (!Array.isArray(items) || items.length === 0) return 'Carrito vacío';

  // Verificar que el total coincide con los ítems (anti-tampering)
  const calculatedTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  if (Math.abs(calculatedTotal - total) > 1) return 'Total manipulado';

  // Límite mínimo de compra
  if (total < 10000) return 'Monto mínimo de compra: $10.000 COP';

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    // Validación
    const error = validateBody(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { form, paymentMethod, items, total } = body;
    const reference = `WEVO-${Date.now()}-${randomUUID().split('-')[0].toUpperCase()}`;

    // Contra entrega: guardar pedido y notificar por WhatsApp/email
    if (paymentMethod === 'contra-entrega') {
      // En producción: guardar en DB + enviar email
      // await saveOrder({ reference, form, items, total, paymentMethod });
      // await sendConfirmationEmail(form.email, reference);

      return NextResponse.json({
        reference,
        method: 'contra-entrega',
        message: 'Pedido creado. Te contactaremos por WhatsApp.',
      });
    }

    // Wompi: tarjeta, PSE, Nequi
    if (['tarjeta', 'pse', 'nequi'].includes(paymentMethod)) {
      const wompiKey = process.env.WOMPI_PRIVATE_KEY;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

      // Si no hay key de Wompi configurada, devolver URL de sandbox para testing
      if (!wompiKey) {
        return NextResponse.json({
          reference,
          wompiUrl: `https://checkout.wompi.co/p/?public-key=pub_test_xxxx&currency=COP&amount-in-cents=${total * 100}&reference=${reference}&redirect-url=${siteUrl}/checkout/confirmacion`,
          message: 'Configure WOMPI_PRIVATE_KEY en .env para pagos reales',
        });
      }

      // Crear link de pago en Wompi
      const wompiRes = await fetch('https://production.wompi.co/v1/payment_links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${wompiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Pedido Nuevo Wevo ${reference}`,
          description: items.map((i) => `${i.name} x${i.quantity}`).join(', '),
          single_use: true,
          collect_shipping: false,
          currency: 'COP',
          amount_in_cents: total * 100,
          redirect_url: `${siteUrl}/checkout/confirmacion?ref=${reference}`,
          customer_data: {
            customer_is_logged_in: false,
            prefilled_data: {
              customer_email: form.email,
              customer_full_name: `${form.nombres} ${form.apellidos}`,
            },
          },
        }),
      });

      if (!wompiRes.ok) {
        const wompiError = await wompiRes.text();
        console.error('Wompi error:', wompiError);
        return NextResponse.json({ error: 'Error al conectar con pasarela de pago' }, { status: 502 });
      }

      const wompiData = await wompiRes.json();
      return NextResponse.json({
        reference,
        wompiUrl: wompiData.data?.url ?? wompiData.url,
      });
    }

    // ADDI
    if (paymentMethod === 'addi') {
      const addiKey = process.env.ADDI_PUBLIC_KEY;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

      if (!addiKey) {
        return NextResponse.json({
          reference,
          addiUrl: `https://checkout.addi.com?amount=${total}&orderId=${reference}&currency=COP`,
          message: 'Configure ADDI_PUBLIC_KEY en .env para pagos reales',
        });
      }

      return NextResponse.json({
        reference,
        addiUrl: `https://checkout.addi.com?publicKey=${addiKey}&amount=${total}&orderId=${reference}&currency=COP&callbackUrl=${siteUrl}/checkout/confirmacion`,
      });
    }

    return NextResponse.json({ error: 'Método de pago no soportado' }, { status: 400 });

  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Solo permitir POST
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
