import { NextRequest, NextResponse } from 'next/server';
import { OrderRequestSchema } from '@/lib/validators';
import { sendOrderEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rateLimit';
import { formatPrice } from '@/lib/format';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    
    // Validate request
    const validatedData = OrderRequestSchema.parse(body);
    
    // Honeypot check
    if (validatedData.customer.honeypot) {
      return NextResponse.json({ ok: true }); // Silent fail for bots
    }

    const { customer, items, total } = validatedData;

    // Prepare email content
    const itemsList = items
      .map(
        (item) =>
          `- ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ''}: ${item.qty} x ${formatPrice(
            item.unitPrice
          )} = ${formatPrice(item.unitPrice * item.qty)}`
      )
      .join('\n');

    const emailText = `
New Order Request from ${customer.name}

Customer Details:
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone || 'N/A'}

Order Summary:
${itemsList}

Total Estimate: ${formatPrice(total)}

Customer Note:
${customer.note || 'No note provided.'}
    `.trim();

    // Send email to shop owner
    const ownerEmail = process.env.ORDERS_EMAIL || 'pintorcvc@gmail.com';
    const emailResult = await sendOrderEmail({
      to: ownerEmail,
      subject: `New Order Request: ${customer.name}`,
      text: emailText,
    });

    if (!emailResult.success) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
