import { InventoryEventStoreRepo } from '../InventoryEventStoreRepo';
import { MongoDatabase } from '../../../../database/MongoDatabase';
import { Collection } from 'mongodb';

export class MongoInventoryEventStoreRepo implements InventoryEventStoreRepo {
  private database: MongoDatabase;
  private collection: Collection;

  constructor() {
    this.database = MongoDatabase.getInstance();
    this.collection = this.database.getCollection('inventory_eventStore');
  }

  async eventGUIDExists(eventGuid: string): Promise<boolean> {
    const result =
      await this.collection.findOne({ guid: eventGuid });

    return result !== null;
  }

  async createInventoryEvent(inventoryEvent: any): Promise<void> {
    await this.collection.insertOne(inventoryEvent);
  }
}
