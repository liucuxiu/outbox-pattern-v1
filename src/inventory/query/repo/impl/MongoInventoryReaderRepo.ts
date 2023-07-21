import { InventoryReaderRepo } from '../InventoryReaderRepo';
import { MongoDatabase } from '../../../../database/MongoDatabase';
import { Collection } from 'mongodb';

interface Inventory {
  inventoryCode: string;
  quantity: number;
  price: number;

}

export class MongoInventoryReaderRepo implements InventoryReaderRepo {
  private database: MongoDatabase;
  private collection: Collection;

  constructor() {
    this.database = MongoDatabase.getInstance();
    this.collection = this.database.getCollection('inventory');
  }

  async createInventory(inventory: Inventory): Promise<void> {
    await this.collection.insertOne(inventory);
  }
}
