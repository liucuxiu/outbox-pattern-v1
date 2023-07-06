import { Inventory } from '../model/Inventory';

export interface InventoryRepo {
  getInventory(): Promise<Inventory>;
  updateInventory(inventory: Inventory): Promise<void>;
  addInventory(inventory: Inventory): Promise<void>;
}
