export const SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY;
export const FROM_EMAIL = process.env.VITE_FROM_EMAIL || 'noreply@yourapp.com';

if (!SENDGRID_API_KEY) {
  console.warn('SendGrid API key not found in environment variables');
}