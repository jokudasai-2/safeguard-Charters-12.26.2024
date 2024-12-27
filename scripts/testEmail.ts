import { supabase } from '../src/lib/supabase';
import { EmailService } from '../src/lib/email/emailService';

async function testEmail() {
  try {
    // Queue a test email
    const { data, error } = await supabase
      .from('email_queue')
      .insert([{
        to_address: 'test@example.com', // Replace with your email
        subject: 'Test Email',
        content: `
          <h1>Test Email</h1>
          <p>This is a test email from the Charters app.</p>
          <p>Time sent: ${new Date().toISOString()}</p>
        `,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    console.log('Email queued:', data);

    // Process the email
    await EmailService.processEmailQueue();
    console.log('Email queue processed');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    process.exit(0);
  }
}

testEmail();