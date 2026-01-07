import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors when API key is missing
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendOrderEmail(data: {
  to: string;
  subject: string;
  text: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email will not be sent.');
    return { success: true, mock: true };
  }

  const client = getResend();
  if (!client) {
    console.warn('Resend client could not be initialized.');
    return { success: true, mock: true };
  }

  try {
    const response = await client.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: data.to,
      subject: data.subject,
      text: data.text,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
