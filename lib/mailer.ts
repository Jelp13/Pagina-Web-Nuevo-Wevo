import nodemailer from 'nodemailer';
import { formatCOP } from './format';
import type { OrderItem } from './orders-db';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const PAYMENT_LABEL: Record<string, string> = {
  'contra-entrega': 'Contra entrega',
  tarjeta: 'Tarjeta',
  pse: 'PSE',
  nequi: 'Nequi',
  addi: 'ADDI',
  breb: 'BRE-B',
};

export interface ThankYouEmailOrder {
  reference: string;
  nombres: string;
  email: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
}

// Nunca debe tumbar el checkout ni el webhook si falla: se atrapa cualquier
// error y solo se deja constancia en el log del servidor.
export async function sendThankYouEmail(order: ThankYouEmailOrder): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`SMTP no configurado — se omite el correo de agradecimiento para ${order.reference}`);
    return;
  }

  try {
    const itemsRows = order.items
      .map(
        (item) => `
          <tr>
            <td style="padding:8px 0; border-bottom:1px solid #eee;">${item.name} × ${item.quantity}</td>
            <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; white-space:nowrap;">${formatCOP(item.price * item.quantity)}</td>
          </tr>`,
      )
      .join('');

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="font-size: 22px; margin-bottom: 4px;">¡Gracias por tu compra, ${order.nombres}!</h1>
        <p style="color: #555; line-height: 1.5;">
          Recibimos tu pedido <strong>${order.reference}</strong> y ya lo estamos preparando. Tu equipo se entrega
          en <strong>3 a 6 días hábiles</strong>. Te avisaremos por WhatsApp o correo en cuanto haya novedades con
          el envío.
        </p>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          ${itemsRows}
          <tr>
            <td style="padding:10px 0; font-weight:bold;">Total</td>
            <td style="padding:10px 0; font-weight:bold; text-align:right;">${formatCOP(order.total)}</td>
          </tr>
        </table>
        <p style="color: #555; font-size: 14px;">
          Método de pago: ${PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}
        </p>
        <p style="color: #555; font-size: 14px; line-height: 1.5;">
          ¿Alguna duda? Escríbenos por WhatsApp al <strong>316 3713928</strong> o responde directamente a este correo.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          Nuevo Wevo S.A.S. — www.nuevowevo.com
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Nuevo Wevo" <${process.env.SMTP_USER}>`,
      to: order.email,
      subject: `Gracias por tu compra — pedido ${order.reference}`,
      html,
    });
  } catch (err) {
    console.error(`Error enviando correo de agradecimiento para ${order.reference}:`, err);
  }
}
