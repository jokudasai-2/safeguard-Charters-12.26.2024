import { EmailService } from './emailService';

export class EmailWorker {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly processInterval: number;

  constructor(processIntervalMs: number = 30000) { // Default 30 seconds
    this.processInterval = processIntervalMs;
  }

  start(): void {
    if (this.intervalId) return;

    // Process immediately on start
    EmailService.processEmailQueue();

    // Then process periodically
    this.intervalId = setInterval(() => {
      EmailService.processEmailQueue();
    }, this.processInterval);

    console.log('Email worker started');
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Email worker stopped');
    }
  }
}