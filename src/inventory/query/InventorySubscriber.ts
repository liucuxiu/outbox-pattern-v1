import { InventoryEventStoreRepo } from './repo/InventoryEventStoreRepo';
import { InventoryReaderRepo } from './repo/InventoryReaderRepo';
import { MessageService } from '../../messaging/MessageService';

export class InventorySubscriber {

  private inventoryEventRepo: InventoryEventStoreRepo;
  private inventoryReaderRepo: InventoryReaderRepo;
  private messageService: MessageService;

  constructor(messageService: MessageService, inventoryEventRepo: InventoryEventStoreRepo, inventoryReaderRepo: InventoryReaderRepo) {
    this.messageService = messageService;
    this.inventoryEventRepo = inventoryEventRepo;
    this.inventoryReaderRepo = inventoryReaderRepo;
  }

  public async start(): Promise<void> {
    await this.messageService.start();
    await this.messageService.consumeMessage(this.processMessage.bind(this));
  }

  private async processMessage(message: string): Promise<void> {
    const inventoryEvent = JSON.parse(message);
    console.log('inventoryEvent', inventoryEvent);

    const existingEvent = await this.inventoryEventRepo.eventGUIDExists(inventoryEvent.guid);
    if (existingEvent) {
      console.log('event is already processed');
      return;
    }

    await this.inventoryEventRepo.createInventoryEvent(inventoryEvent);

    const payload = JSON.parse(Buffer.from(inventoryEvent.payloadBase64, "base64").toString());
    const inventory = payload.payload.inventory;
    await this.inventoryReaderRepo.createInventory(inventory);
  }


}
