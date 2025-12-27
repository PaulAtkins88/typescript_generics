import { Request, Response } from 'express';
import { CreateOrderRequest, OrderResponse, UpdateOrderRequest } from '../dto/Order.dto';
import IService from '../interface/IService';
import { BaseController } from './Base.controller';

/**
 * Order controller for handling HTTP requests related to Order entities.
 * 
 * TEACHING EXAMPLE: Same Pattern for Different Entity
 * Identical structure to UserController but for Order entities.
 * This demonstrates the code reuse power of generic base classes.
 */
export default class OrderController extends BaseController<CreateOrderRequest | UpdateOrderRequest, OrderResponse> {
  protected service: IService<CreateOrderRequest | UpdateOrderRequest, OrderResponse>;

  /**
   * @param service - The service implementation handling business logic
   */
  constructor(service: IService<CreateOrderRequest | UpdateOrderRequest, OrderResponse>) {
    super();
    this.service = service;
  }

  getAllOrders(req: Request, res: Response): Promise<void> {
    return this.handleRequest(req, res, this.getAll.bind(this));
  }

  getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.getById.bind(this, Number(id)));
  }

  createOrder(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: CreateOrderRequest };
    return this.handleRequest(req, res, this.create.bind(this, body));
  }

  updateOrder(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: UpdateOrderRequest };
    const { id } = req.params;
    return this.handleRequest(
      req,
      res,
      this.update.bind(this, Number(id), body)
    );
  }

  deleteOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.delete.bind(this, Number(id)));
  }
}
