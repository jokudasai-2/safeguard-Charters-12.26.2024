export * from './emailService';
export * from './emailWorker';

// Initialize and start the worker
import { EmailWorker } from './emailWorker';

const emailWorker = new EmailWorker();

// Start the worker when the app initializes
emailWorker.start();