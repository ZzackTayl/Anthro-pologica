import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const email = normalizeString(req.body?.email).toLowerCase();

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        error: 'Valid email is required'
      });
    }

    // Send welcome email to subscriber
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [email],
      subject: 'Welcome to Savoirity LLC Newsletter!',
      html: `
        <h2>Welcome to Savoirity LLC!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll receive our monthly insights on UX, neurodivergent design, and AI experimentation.</p>
        <p>Cheers,<br>The Savoirity LLC Team</p>
      `,
    });

    if (error) {
      console.error('Resend error in subscription:', error);
      return res.status(500).json({
        error: 'Failed to subscribe. Please try again later.'
      });
    }

    console.log('New subscription:', data?.id);
    return res.status(200).json({
      success: true,
      id: data?.id,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Server error in subscription:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}
