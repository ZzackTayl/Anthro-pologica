import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_PROJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const name = normalizeString(req.body?.name);
    const email = normalizeString(req.body?.email).toLowerCase();
    const project = normalizeString(req.body?.project);
    const message = normalizeString(req.body?.message);

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required'
      });
    }

    // Verify email format
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    if (name.length > MAX_NAME_LENGTH) {
      return res.status(400).json({
        error: `Name cannot exceed ${MAX_NAME_LENGTH} characters`
      });
    }

    if (project.length > MAX_PROJECT_LENGTH) {
      return res.status(400).json({
        error: `Project details cannot exceed ${MAX_PROJECT_LENGTH} characters`
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProject = escapeHtml(project || 'Not specified');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'hello@human-drivensolutions.com'],
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Project Interest:</strong> ${safeProject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
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
