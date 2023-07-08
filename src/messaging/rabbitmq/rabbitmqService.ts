import amqp from 'amqplib/callback_api';
import { MessageService } from '../MessageService';

export class RabbitMQService implements MessageService {
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;
  private queue: string;

  constructor() {
    this.connection = null;
    this.channel = null;
    this.queue = 'my_queue';
  }

  public async start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      amqp.connect('amqp://localhost:5672', (error, connection) => {
        if (error) {
          reject(error);
        } else {
          this.connection = connection;

          connection.createChannel((channelError, channel) => {
            if (channelError) {
              reject(channelError);
            } else {
              this.channel = channel;
              resolve();
            }
          });
        }
      });
    });
  }

  public async sendMessage(message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.channel) {
        reject(new Error('RabbitMQ channel not available.'));
        return;
      }

      this.channel.assertQueue(this.queue, { durable: false });
      this.channel.sendToQueue(this.queue, Buffer.from(message));
      resolve();
    });
  }

  public async consumeMessage(callback: (message: string) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.channel) {
        reject(new Error('RabbitMQ channel not available.'));
        return;
      }

      this.channel.assertQueue(this.queue, { durable: false });
      this.channel.consume(this.queue, (message) => {
        if (message) {
          callback(message.content.toString());
          this.channel?.ack(message);
        }
      });
      resolve();
    });
  }
}
