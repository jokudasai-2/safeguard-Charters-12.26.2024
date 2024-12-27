import { supabase } from '../supabase';
import { sendGridEmail } from './sendgrid';

interface QueuedEmail {
  id: string;
  to_address: string;
  subject: string;
  content: string;
  attempts: number;
  status: 'pending' | 'processing' | 'sent' | 'failed';
}

export class EmailService {
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly BATCH_SIZE = 10;

  static async processEmailQueue(): Promise<void> {
    try {
      const { data: emails, error } = await supabase
        .from('email_queue')
        .select('*')
        .eq('status', 'pending')
        .lt('attempts', this.MAX_ATTEMPTS)
        .order('created_at', { ascending: true })
        .limit(this.BATCH_SIZE);

      if (error) throw error;
      if (!emails?.length) return;

      for (const email of emails) {
        await this.processEmail(email);
      }
    } catch (error) {
      console.error('Error processing email queue:', error);
    }
  }

  private static async processEmail(email: QueuedEmail): Promise<void> {
    try {
      await this.updateEmailStatus(email.id, 'processing');

      // Send via SendGrid
      const success = await sendGridEmail({
        to: email.to_address,
        subject: email.subject,
        html: email.content
      });

      if (!success) {
        throw new Error('Failed to send email via SendGrid');
      }

      await this.updateEmailStatus(email.id, 'sent');
    } catch (error) {
      console.error(`Error processing email ${email.id}:`, error);
      
      const { error: updateError } = await supabase
        .from('email_queue')
        .update({ 
          attempts: email.attempts + 1,
          status: 'pending',
          error: (error as Error).message
        })
        .eq('id', email.id);

      if (updateError) {
        console.error('Error updating email status:', updateError);
      }
    }
  }

  private static async updateEmailStatus(
    emailId: string, 
    status: QueuedEmail['status']
  ): Promise<void> {
    const { error } = await supabase
      .from('email_queue')
      .update({ status })
      .eq('id', emailId);

    if (error) {
      throw error;
    }
  }
}