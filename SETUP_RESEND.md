# Setting up Resend for Anthro-pologica

This guide explains how to set up Resend to handle email functionality in the Anthro-pologica website.

## 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Navigate to the dashboard and create an API key
3. Keep the API key secure and don't share it publicly

## 2. Configure Your Domain

1. In your Resend dashboard, add and verify your domain (e.g., `anthropologica.design`)
2. Follow the DNS verification steps provided by Resend
3. Once verified, you can use that domain as your sender

## 3. Update Environment Variables

Create or update the `.env` file in the project root:

```env
RESEND_API_KEY=your_actual_resend_api_key_here
EMAIL_FROM=hello@anthropologica.design  # Replace with your verified domain
CONTACT_EMAIL=contact@anthropologica.design  # Where to send contact form submissions
```

## 4. Install Dependencies

```bash
npm install resend express cors body-parser dotenv
npm install --save-dev concurrently
```

## 5. Run the Application

The application has two parts that need to run simultaneously:

### Frontend (in one terminal):
```bash
npm run dev
```

### Backend API Server (in another terminal):
```bash
npm run api
```

Or run both with:
```bash
npm run dev:both
```

## 6. Endpoints Available

- Contact form: `POST /api/send-contact`
  - Expects: `{ name: string, email: string, project: string, message: string }`
  - Returns: Success or error response

- Newsletter subscription: `POST /api/subscribe`
  - Expects: `{ email: string }`
  - Returns: Success or error response

## 7. Important Notes

- The contact form sends emails to your specified contact email address
- The newsletter subscription sends a welcome email to the subscriber
- Both endpoints validate email formats before sending
- All sensitive credentials are kept in environment variables
- Remember to replace placeholder email addresses with your actual domain
- Make sure your domain is properly verified in Resend to avoid delivery issues

## 8. Testing

To test locally, you can temporarily use Resend's test domain:
```env
EMAIL_FROM=onboarding@resend.dev
```

But for production, make sure to verify and use your own domain.