# Anthro-pologica UX Agency Website

This is a psychedelic UX agency website with advanced accessibility features and Resend-powered email functionality. The original project is available at https://www.figma.com/design/33JjjugerNR4ZR8zT2GLY9/Psychedelic-UX-Agency-Website.

## Features

- **Accessibility Settings**: Motion reduction, dyslexic-friendly font, and high contrast modes
- **Email Integration**: Powered by Resend for contact forms and newsletter subscriptions
- **Dynamic UI**: Animated sections with motion and visual effects
- **Responsive Design**: Fully responsive across all device sizes

## Setting up Resend

1. **Get a Resend Account**: Visit [resend.com](https://resend.com) and create an account
2. **Get Your API Key**: Copy your API key from the dashboard
3. **Verify Your Domain**: Add and verify your domain (e.g., `anthropologica.design`) in the Resend dashboard
4. **Configure Environment Variables**: Create a `.env` file in the project root:

```env
RESEND_API_KEY=your_actual_resend_api_key_here
EMAIL_FROM=hello@anthropologica.design  # Replace with your verified domain
CONTACT_EMAIL=contact@anthropologica.design  # Where to receive contact form submissions
```

## Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Both Frontend and Backend**:
   ```bash
   # Terminal 1: Run the frontend
   npm run dev
   
   # Terminal 2: Run the backend server
   npm run api
   ```

   Or if you have concurrently installed:
   ```bash
   npm run dev:both
   ```

## API Endpoints

The backend provides these email endpoints:
- Contact Form: `POST /api/send-contact`
- Newsletter Signup: `POST /api/subscribe`

## Development

For detailed development notes and troubleshooting, see [DEVELOPMENT_NOTES.md](./DEVELOPMENT_NOTES.md).

## Running the code

Run `npm run dev` to start the development server after installing dependencies and configuring environment variables.