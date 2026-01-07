import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(data: {
  to: string;
  subject: string;
  text: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email will not be sent.');
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
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
