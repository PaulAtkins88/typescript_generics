import { Request, Response } from 'express';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../dto/User.dto';
import IService from '../interface/IService';
import { BaseController } from './Base.controller';

/**
 * User controller for handling HTTP requests related to User entities.
 * 
 * TEACHING EXAMPLE: Concrete Controller Implementation
 * Extends BaseController<User> to inherit CRUD operations and error handling.
 * HTTP methods (getAllUsers, getUserById, etc.) use the inherited handleRequest()
 * for consistent response formatting and error handling.
 * 
 * ARCHITECTURE: Controller → Service → Repository → Data
 */
export default class UserController extends BaseController<CreateUserRequest | UpdateUserRequest, UserResponse> {
  protected service: IService<CreateUserRequest | UpdateUserRequest, UserResponse>;

  /**
   * @param service - The service implementation handling business logic
   */
  constructor(service: IService<CreateUserRequest | UpdateUserRequest, UserResponse>) {
    super();
    this.service = service;
  }

  getAllUsers(req: Request, res: Response): Promise<void> {
    return this.handleRequest(req, res, this.getAll.bind(this));
  }

  getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    return this.handleRequest(req, res, this.getById.bind(this, Number(id)));
  }

  createUser(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: CreateUserRequest };
    return this.handleRequest(req, res, this.create.bind(this, body));
  }

  updateUser(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: UpdateUserRequest };
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
