import { PostgreInventoryRepo } from './src/inventory/repo/impl/PostgreInventoryRepo';
import { CreateInventoryCommand } from './src/inventory/command/CreateInventoryCommand';

const inventoryRepo = new PostgreInventoryRepo();

const createInventoryCommand = new CreateInventoryCommand(inventoryRepo);

createInventoryCommand.execute('inventory_32', 10, 100);
createInventoryCommand.execute('inventory_33', 20, 200);



