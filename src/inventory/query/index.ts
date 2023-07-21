import { InventorySubscriber } from './InventorySubscriber';
import { MongoInventoryReaderRepo } from './repo/impl/MongoInventoryReaderRepo';
import { RabbitMQService } from '../../messaging/rabbitmq/rabbitmqService';
import { MongoInventoryEventStoreRepo } from './repo/impl/MongoInventoryEventStoreRepo';

const inventoryReaderRepo = new MongoInventoryReaderRepo();
const inventoryEventRepo = new MongoInventoryEventStoreRepo();
const rabbitMqMessageService = new RabbitMQService();

const inventorySubscriber = new InventorySubscriber(
  rabbitMqMessageService, inventoryEventRepo, inventoryReaderRepo);

inventorySubscriber.start();
