import { Request, Response } from 'express';
import IResponse from '../interface/IDataLayer';
import IService from '../interface/IService';

/**
 * Generic base controller class for HTTP request handling.
 * 
 * TEACHING CONCEPT: Layered Architecture with Generics
 * Controllers handle HTTP concerns (requests, responses, status codes, error handling).
 * They delegate business logic to services, maintaining separation of concerns.
 * 
 * PATTERN: Template Method Pattern
 * The handleRequest() method provides a reusable template for:
 * 1. Executing a handler function
 * 2. Sending success response (200)
 * 3. Catching and sending error response (500)
 * 
 * @template R - Request DTO (input shape)
 * @template T - Response DTO (output shape)
 * 
 * @example
 * // Concrete controllers specify type and inject service:
 * class UserController extends BaseController<User> {
 *   protected service: IService<User>;
 *   
 *   constructor(service: IService<User>) {
 *     super();
 *     this.service = service;
 *   }
 *   
 *   // HTTP handlers use inherited handleRequest for error handling:
 *   getAllUsers(req: Request, res: Response): Promise<void> {
 *     return this.handleRequest(req, res, this.getAll.bind(this));
 *   }
 * }
 * 
 * ARCHITECTURE FLOW:
 * HTTP Request → Controller → Service → Repository → Data Source
 * HTTP Response ← Controller ← Service ← Repository ← Data Source
 */
export abstract class BaseController<R, T> implements IService<R, T> {
  /**
   * Abstract service property that must be provided by concrete controllers.
   * Controllers depend on IService<T>, not IRepository<T>, maintaining proper layering.
   */
  protected abstract service: IService<R, T>;

  /**
   * Delegates to service's getAll() method.
   * Concrete controllers call this via handleRequest() for error handling.
   */
  async getAll(): Promise<IResponse<T[]>> {
    const response: IResponse<T[]> = await this.service.getAll();
    return response;
  }

  /**
   * Delegates to service's getById() method.
   * Concrete controllers call this via handleRequest() for error handling.
   */
  async getById(id: number): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.service.getById(id);
    return response;
  }

  /**
   * Delegates to service's create() method.
   * Concrete controllers call this via handleRequest() for error handling.
   */
  async create(data: R): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.service.create(data);
    return response;
  }

  /**
   * Delegates to service's update() method.
   * Concrete controllers call this via handleRequest() for error handling.
   */
  async update(id: number, data: R): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.service.update(id, data);
    return response;
  }

  /**
   * Delegates to service's delete() method.
   * Concrete controllers call this via handleRequest() for error handling.
   */
  async delete(id: number): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.service.delete(id);
    return response;
  }

  /**
   * Generic request handler that provides consistent error handling.
   * 
   * PATTERN: Template Method
   * This method encapsulates the common pattern of:
   * - Try to execute handler
   * - Send 200 with data on success
   * - Send 500 with error on failure
   * 
   * @template R - The response data type (can differ from entity type T)
   * @param req - Express request object
   * @param res - Express response object
   * @param handler - Async function that performs the operation
   * 
   * @example
   * // Used in concrete controllers:
   * getUserById(req: Request, res: Response): Promise<void> {
   *   const { id } = req.params;
   *   return this.handleRequest(req, res, this.getById.bind(this, Number(id)));
   * }
   */
  protected async handleRequest<R>(
    req: Request,
    res: Response,
    handler: (req: Request, res: Response) => Promise<IResponse<R>>
  ): Promise<void> {
    try {
      const response = await handler(req, res);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
