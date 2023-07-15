import { Router } from 'express';
import OrderController from '../controller/Order.controller';
import OrderDataLayerService from '../data/OrderRepository.repository';

const orderRouter = Router();
const orderDataLayerService = new OrderDataLayerService();
const orderController = new OrderController(orderDataLayerService);

orderRouter.get('/', orderController.getAllOrders.bind(orderController));
orderRouter.get('/:id', orderController.getOrderById.bind(orderController));
orderRouter.post('/', orderController.createOrder.bind(orderController));
orderRouter.put('/:id', orderController.updateOrder.bind(orderController));
orderRouter.delete('/:id', orderController.deleteOrder.bind(orderController));

export default orderRouter;
