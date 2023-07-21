export interface InventoryEventStoreRepo {
  eventGUIDExists(eventGuid: string): Promise<boolean>;
  createInventoryEvent(inventoryEvent: any): Promise<void>;
}
