import { InventoryEvent } from './InventoryEvent';

export interface InventoryEventRepo {
  getUnprocessedEvents(): Promise<InventoryEvent[]>;
  markEventAsProcessed(eventId: string): Promise<void>;
}
