import { InventoryRepo } from '../repo/InventoryRepo';
import { Inventory } from '../model/Inventory';

export class CreateInventoryCommand {
  private inventoryRepo: InventoryRepo;

  constructor(inventoryRepo: InventoryRepo) {
    this.inventoryRepo = inventoryRepo;
  }

  public async execute(inventoryCode: string, quantity: number, price: number): Promise<void> {
    const inventory = new Inventory(inventoryCode);
    inventory.setPrice(price);
    inventory.setQuantity(quantity);
    await this.inventoryRepo.addInventory(inventory);
  }
}
