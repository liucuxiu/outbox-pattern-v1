export class InventoryEvent {
  private eventId: string;
  private inventoryCode: string;
  private guid: string
  private payloadBase64: string;

  constructor(eventId: string, inventoryCode: string, guid: string, payloadBase64: string) {
    this.eventId = eventId;
    this.inventoryCode = inventoryCode;
    this.guid = guid;
    this.payloadBase64 = payloadBase64;
  }

  getEventId(): string {
    return this.eventId;
  }

  getInventoryCode(): string {
    return this.inventoryCode;
  }

  getGuid(): string {
    return this.guid;
  }

  getPayloadBase64(): string {
    return this.payloadBase64;
  }
}
