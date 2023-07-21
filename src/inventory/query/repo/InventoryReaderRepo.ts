export interface InventoryReaderRepo {
  createInventory(inventory: any): Promise<void>;
}
