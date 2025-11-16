import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, project, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required'
      });
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'hello@anthropologica.design'],
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Interest:</strong> ${project || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        error: 'Failed to send message. Please try again later.'
      });
    }

    console.log('Contact form submitted successfully:', data?.id);
    return res.status(200).json({
      success: true,
      id: data?.id,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Server error in contact form:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}
