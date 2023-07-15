import IResponse from './IDataLayer';

type IDataLayerService<T> = {
  getAll(): Promise<IResponse<T[]>>;
  getById(id: number): Promise<IResponse<T>>;
  create(data: T): Promise<IResponse<T>>;
  update(id: number, data: T): Promise<IResponse<T>>;
  delete(id: number): Promise<IResponse<T>>;
};
export default IDataLayerService;
