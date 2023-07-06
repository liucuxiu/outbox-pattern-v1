import { PostgreInventoryRepo } from './src/inventory/repo/impl/PostgreInventoryRepo';
import { CreateInventoryCommand } from './src/inventory/command/CreateInventoryCommand';

const inventoryRepo = new PostgreInventoryRepo();
const createInventoryCommand = new CreateInventoryCommand(inventoryRepo);


createInventoryCommand.execute('inventory-3', 10, 1000).then(r => console.log('done'));

