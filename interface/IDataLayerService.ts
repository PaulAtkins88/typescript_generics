import Response from './IDataLayer';

export default interface IDataLayerService<T> {
  getAll(): Promise<Response<T[]>>;
  getById(id: number): Promise<Response<T>>;
  create(data: T): Promise<Response<T>>;
  update(id: number, data: T): Promise<Response<T>>;
  delete(id: number): Promise<Response<T>>;
}
