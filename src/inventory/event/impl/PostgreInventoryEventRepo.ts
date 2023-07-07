import { InventoryEvent } from '../InventoryEvent';
import { InventoryEventRepo } from '../InventoryEventRepo';
import { PostgreDatabase } from '../../../database/PostgreDatabase';

export class PostgreInventoryEventRepo implements InventoryEventRepo {
  private postgreDatabase: PostgreDatabase;

  constructor() {
    this.postgreDatabase = PostgreDatabase.getInstance();
  }


  async getUnprocessedEvents(): Promise<InventoryEvent[]> {

    const sql = `SELECT * FROM inventory_event WHERE processed = false`;
    const result = await this.postgreDatabase.query(sql, []);
    const listEvents = result.rows;
    const inventoryEvents: InventoryEvent[] = [];

    for (const event of listEvents) {
      const inventoryEvent =
        new InventoryEvent(event.event_id, event.inventory_code, event.event_guid, event.payload);
      inventoryEvents.push(inventoryEvent);
    }
    console.log(inventoryEvents)
    return inventoryEvents;
  }

  async markEventAsProcessed(eventId: string): Promise<void> {
    const sql = `UPDATE inventory_event SET processed = true WHERE event_id = $1`;
    await this.postgreDatabase.query(sql, [eventId]);
  }
}
