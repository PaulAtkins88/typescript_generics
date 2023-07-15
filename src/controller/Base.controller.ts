import { Request, Response } from 'express';
import IResponse from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';

export abstract class BaseController<T> implements IDataLayerService<T> {
  protected abstract dataLayerService: IDataLayerService<T>;
  async getAll(): Promise<IResponse<T[]>> {
    const response: IResponse<T[]> = await this.dataLayerService.getAll();
    return response;
  }
  async getById(id: number): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.dataLayerService.getById(id);
    return response;
  }
  async create(data: T): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.dataLayerService.create(data);
    return response;
  }
  async update(id: number, data: T): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.dataLayerService.update(id, data);
    return response;
  }
  async delete(id: number): Promise<IResponse<T>> {
    const response: IResponse<T> = await this.dataLayerService.delete(id);
    return response;
  }

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
