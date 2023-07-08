import { EventsProcessor } from './EventsProcessor';
import { PostgreInventoryEventRepo } from './impl/PostgreInventoryEventRepo';
import { RabbitMQService } from '../../messaging/rabbitmq/rabbitmqService';


const inventoryEventRepo = new PostgreInventoryEventRepo();

const rabbitMqMessageService = new RabbitMQService();

const eventProcessor = new EventsProcessor(rabbitMqMessageService, inventoryEventRepo);
