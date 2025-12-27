import { Router } from 'express';
import OrderController from '../controller/Order.controller';
import InMemoryOrderRepository from '../repository/InMemoryOrder.repository';
import PostgresOrderRepository from '../repository/PostgresOrder.repository';
import OrderService from '../service/Order.service';

/**
 * Order routes configuration.
 * 
 * TEACHING EXAMPLE: Same Wiring Pattern
 * Identical structure to User routes, just with different types.
 * This consistency is a hallmark of good architecture.
 */
const orderRouter = Router();

// Repository → Service → Controller
// Here is an example how we can easily swap repository implementations using environment variables
// USE_POSTGRES=true and DATABASE_URL set → Postgres; otherwise InMemory
const orderRepository =
	process.env.USE_POSTGRES === 'true' && process.env.DATABASE_URL
		? new PostgresOrderRepository()
		: new InMemoryOrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

orderRouter.get('/', orderController.getAllOrders.bind(orderController));
orderRouter.get('/:id', orderController.getOrderById.bind(orderController));
orderRouter.post('/', orderController.createOrder.bind(orderController));
orderRouter.put('/:id', orderController.updateOrder.bind(orderController));
orderRouter.delete('/:id', orderController.deleteOrder.bind(orderController));

export default orderRouter;
