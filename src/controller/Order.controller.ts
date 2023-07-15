import { Request, Response } from 'express';
import IDataLayerService from '../interface/IDataLayerService';
import Order from '../model/Order';
import { BaseController } from './Base.controller';

export default class OrderController extends BaseController<Order> {
  protected dataLayerService: IDataLayerService<Order>;
  constructor(dataLayerService: IDataLayerService<Order>) {
    super();
    this.dataLayerService = dataLayerService;
  }

  getAllOrders(req: Request, res: Response): Promise<void> {
    return this.handleRequest(req, res, this.getAll.bind(this));
  }

  getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.getById.bind(this, Number(id)));
  }

  createOrder(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: Order };
    return this.handleRequest(req, res, this.create.bind(this, body));
  }

  updateOrder(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: Order };
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
