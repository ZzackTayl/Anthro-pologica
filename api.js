const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Resend with your API key
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_PROJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Contact form submission endpoint
app.post('/api/send-contact', async (req, res) => {
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
        error: `Name cannot exceed ${MAX_NAME_LENGTH} characters`,
      });
    }

    if (project.length > MAX_PROJECT_LENGTH) {
      return res.status(400).json({
        error: `Project details cannot exceed ${MAX_PROJECT_LENGTH} characters`,
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProject = escapeHtml(project || 'Not specified');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev', // Replace with your verified domain
      to: [process.env.CONTACT_EMAIL || 'hello@human-drivensolutions.com'], // Replace with your business email
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
      // Return a generic error to avoid exposing sensitive information
      return res.status(500).json({ 
        error: 'Failed to send message. Please try again later.' 
      });
    }

    console.log('Contact form submitted successfully:', data.id);
    res.json({ 
      success: true, 
      id: data.id,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Server error in contact form:', error);
    res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
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

    console.log('New subscription:', data.id);
    res.json({ 
      success: true, 
      id: data.id,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Server error in subscription:', error);
    res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

// Error handling middleware for 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Contact endpoint: POST http://localhost:${PORT}/api/send-contact`);
  console.log(`Subscription endpoint: POST http://localhost:${PORT}/api/subscribe`);
});
