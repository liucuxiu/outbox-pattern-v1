import cron from 'node-cron';
import { InventoryEventRepo } from './InventoryEventRepo';

export class EventsProcessor {
  private inventoryEventRepo: InventoryEventRepo;

  constructor(inventoryEventRepo: InventoryEventRepo) {
    this.inventoryEventRepo = inventoryEventRepo;
    this.startCronJob();
  }

  private startCronJob(): void {
    cron.schedule('*/10 * * * * *', async () => {
      // Your task or function to be executed on schedule goes here
      console.log('Cron job running every 5s');
      const result = await this.inventoryEventRepo.getUnprocessedEvents();
      console.log("cronjob result: ", result);
    });
  }
}
