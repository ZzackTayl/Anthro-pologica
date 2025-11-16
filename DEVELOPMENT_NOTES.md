# Development Setup for Anthro-pologica with Resend

This document explains how to set up the Anthro-pologica website with Resend email functionality for development and production.

## Prerequisites

1. Node.js 18+ installed
2. A Resend account and API key
3. A verified domain in Resend (for production)

## Setting Up Resend API

1. **Get your Resend API key**:
   - Visit [resend.com](https://resend.com)
   - Sign up and navigate to the dashboard
   - Create and copy your API key

2. **Configure your domain** (required for production):
   - In your Resend dashboard, add and verify your domain (e.g., `anthropologica.design`)
   - Follow DNS verification steps provided by Resend
   - Once verified, you can send emails from that domain

## Environment Configuration

1. Create a `.env` file in the project root (already created as `.env.example`):

   ```env
   RESEND_API_KEY=your_resend_api_key_here
   EMAIL_FROM=hello@anthropologica.design  # Replace with your verified domain
   CONTACT_EMAIL=contact@anthropologica.design  # Replace with your business email
   ```

## Running the Application

This project requires running both the frontend and backend:

### Method 1: Separate terminals
Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend API server):
```bash
npm run api
```

### Method 2: Simultaneous (if concurrently is installed)
```bash
npm run dev:both
```

This runs both the frontend (`npm run dev`) and the backend API server (`npm run api`) simultaneously.

## API Endpoints

The backend server provides the following email endpoints:

### Contact Form: `POST /api/send-contact`
- Expects: `{ name: string, email: string, project?: string, message: string }`
- Sends an email notification to your business email
- Validates all required fields and email format

### Newsletter Subscription: `POST /api/subscribe`
- Expects: `{ email: string }`
- Sends a welcome email to the subscriber
- Validates email format

## Frontend Integration

Both the contact form in `ContactSection.tsx` and the newsletter signup in `Footer.tsx` are already configured to send requests to these endpoints.

## Testing Locally

For local testing, you can use Resend's test domain:
```env
EMAIL_FROM=onboarding@resend.dev
```

Then change to your verified domain in production.

## Deployment Notes

When deploying to production:

1. Make sure your domain is verified in Resend
2. Update the `EMAIL_FROM` and `CONTACT_EMAIL` to use your verified domain
3. Ensure your server is properly configured to handle POST requests to the API endpoints
4. The frontend will automatically send requests to the same origin's `/api` endpoints

## Troubleshooting

1. **Emails not sending**: Check your API key and domain verification in Resend
2. **CORS errors**: The server includes proper CORS headers, but if hosting separately you may need to adjust them
3. **Environment variables not loading**: Make sure your `.env` file is in the project root and server.js can access it

## Security Note

- Never commit your `.env` file with actual API keys
- Use appropriate authentication on production endpoints
- Validate inputs on both frontend and backend