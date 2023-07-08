import cron from 'node-cron';
import { InventoryEventRepo } from './InventoryEventRepo';
import { MessageService } from '../../messaging/MessageService';

export class EventsProcessor {
  private inventoryEventRepo: InventoryEventRepo;

  private messageService: MessageService;

  constructor(messageService: MessageService, inventoryEventRepo: InventoryEventRepo) {
    this.messageService = messageService;
    this.inventoryEventRepo = inventoryEventRepo;
    this.startCronJob();
  }

  private startCronJob() {
    cron.schedule('*/10 * * * * *', async () => {
      console.log('Running cron job');
      await this.messageService.start();

      await this.processListUnsendEvent();
    });
  }

  private async processListUnsendEvent(): Promise<void> {
    const unsendEvents = await this.inventoryEventRepo.getUnprocessedEvents();

    for (const event of unsendEvents) {
      console.log('event', event);

      await this.messageService.sendMessage(JSON.stringify(event));
      await this.inventoryEventRepo.markEventAsProcessed(event.getEventId());
    }
  }
}
