import IResponse from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';

export abstract class BaseRepository<T> implements IDataLayerService<T> {
  abstract getAll(): Promise<IResponse<T[]>>;
  abstract getById(id: number): Promise<IResponse<T>>;
  abstract create(data: T): Promise<IResponse<T>>;
  abstract update(id: number, data: T): Promise<IResponse<T>>;
  abstract delete(id: number): Promise<IResponse<T>>;
}
