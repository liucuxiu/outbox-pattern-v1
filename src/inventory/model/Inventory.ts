export class Inventory {
  private readonly inventoryCode: string;
  private quantity: number = 0;
  private price: number = 0;

  constructor(inventoryCode: string) {
    this.inventoryCode = inventoryCode;
  }

  public getInventoryCode(): string {
    return this.inventoryCode;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }
}
