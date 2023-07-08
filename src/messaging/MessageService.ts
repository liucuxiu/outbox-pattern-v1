export interface MessageService {
  sendMessage(message: string): Promise<void>;
  start(): Promise<void>;
  consumeMessage(callback: (message: string) => void): Promise<void>;
}

