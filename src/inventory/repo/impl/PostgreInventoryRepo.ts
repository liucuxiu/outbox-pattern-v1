import { Inventory } from '../../model/Inventory';
import { InventoryRepo } from '../InventoryRepo';
import { PostgreDatabase } from '../../../database/PostgreDatabase';
import { randomUUID } from 'crypto';

export class PostgreInventoryRepo implements InventoryRepo {

  private postgreDatabase: PostgreDatabase;

  constructor() {
    this.postgreDatabase = PostgreDatabase.getInstance();
  }

  async getInventory() {
    return new Inventory('1');
  }

  async updateInventory(inventory: Inventory) {
  }

  async addInventory(inventory: Inventory) {
    //how to insert inventory and event into database in a single transaction?
    const inventoryQuery = this.createInventoryQuery(inventory);
    const eventQuery = this.createEventQuery(inventory);

    const query = `WITH inventory
                            AS (${inventoryQuery} RETURNING inventory_code), inventory_event AS (${eventQuery} RETURNING event_guid)
    SELECT inventory.inventory_code, inventory_event.event_guid
    FROM inventory,
         inventory_event`;

    console.log(query);
    const result = await this.postgreDatabase.query(query, []);

    console.log('result', result);

  }

  private createInventoryQuery(inventory: Inventory): string {
    return `INSERT INTO inventory (inventory_code, quantity, price)
            VALUES ('${inventory.getInventoryCode()}', ${inventory.getQuantity()}, ${inventory.getPrice()})`;
  }

  private createEventQuery(inventory: Inventory): string {
    const payload = {
      inventory: {
        inventoryCode: inventory.getInventoryCode(),
        quantity: inventory.getQuantity(),
        price: inventory.getPrice(),
      }
    };
    const guid = randomUUID().toString();
    const jsonObject = {
      source: 'CreateInventoryCommand',
      guid,
      payload,
      timestamp: new Date().toISOString(),
      action: 'created',
    };

    const payloadBase64 = Buffer.from(JSON.stringify(jsonObject)).toString('base64');

    return `INSERT INTO inventory_event (inventory_code, payload, event_guid)
            VALUES ('${inventory.getInventoryCode()}', '${payloadBase64}', '${guid}')`;

  }
}

