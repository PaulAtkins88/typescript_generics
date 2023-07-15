import { Request, Response } from 'express';
import IDataLayerService from '../interface/IDataLayerService';
import User from '../model/User';
import { BaseController } from './Base.controller';

export default class UserController extends BaseController<User> {
  protected dataLayerService: IDataLayerService<User>;
  constructor(dataLayerService: IDataLayerService<User>) {
    super();
    this.dataLayerService = dataLayerService;
  }

  getAllUsers(req: Request, res: Response): Promise<void> {
    return this.handleRequest(req, res, this.getAll.bind(this));
  }

  getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.getById.bind(this, Number(id)));
  }

  createUser(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: User };
    return this.handleRequest(req, res, this.create.bind(this, body));
  }

  updateUser(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: User };
    const { id } = req.params;
    return this.handleRequest(
      req,
      res,
      this.update.bind(this, Number(id), body)
    );
  }

  deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.delete.bind(this, Number(id)));
  }
}
