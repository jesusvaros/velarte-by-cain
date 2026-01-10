import { NextRequest, NextResponse } from 'next/server';
import { OrderRequestSchema } from '@/lib/validators';
import { sendOrderEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rateLimit';
import { formatPrice } from '@/lib/format';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    
    // Validate request
    const result = OrderRequestSchema.safeParse(body);
    
    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message).join('. ');
      return NextResponse.json(
        { error: `Error de validación: ${errorMessages}` },
        { status: 400 }
      );
    }

    const validatedData = result.data;
    
    // Honeypot check
    if (validatedData.customer.honeypot) {
      return NextResponse.json({ ok: true }); // Silent fail for bots
    }

    const { customer, items, shipping, total } = validatedData;

    // Prepare email content
    const itemsList = items
      .map(
        (item) =>
          `- ${item.name}${item.scentName ? ` [Aroma: ${item.scentName}]` : ''}${item.variantLabel ? ` (${item.variantLabel})` : ''}: ${item.qty} x ${formatPrice(
            item.unitPrice
          )} = ${formatPrice(item.unitPrice * item.qty)}`
      )
      .join('\n');

    const emailText = `
Nueva solicitud de pedido de ${customer.name}

Detalles del cliente:
Nombre: ${customer.name}
Email: ${customer.email}
Teléfono: ${customer.phone || 'No proporcionado'}

${shipping.method !== 'Recogida gratuita en Mairena del Aljarafe (Sevilla)' ? `Dirección de envío:
Calle: ${customer.address}
Ciudad: ${customer.city}
Código Postal: ${customer.postalCode}` : 'Método de envío: Recogida Local'}

Resumen del pedido:
${itemsList}

Método de envío:
${shipping.method} (${formatPrice(shipping.price)})

Total estimado (incluyendo envío):
${formatPrice(total)}

Nota del cliente:
${customer.note || 'Sin notas adicionales.'}
    `.trim();

    // Send email to shop owner
    const ownerEmail = process.env.ORDERS_EMAIL || 'xjesusvr@gmail.com';
    const emailResult = await sendOrderEmail({
      to: ownerEmail,
      subject: `Nueva solicitud de pedido: ${customer.name}`,
      text: emailText,
    });

    if (!emailResult.success) {
      throw new Error('No se pudo enviar el correo electrónico');
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('API Error:', error);
    let message = 'Error interno del servidor';
    if (error instanceof Error) message = error.message;
    
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
