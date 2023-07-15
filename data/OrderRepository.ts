import Response from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';
import Order from '../model/Order';

export default class OrderDataLayerService implements IDataLayerService<Order> {
  getAll(): Promise<Response<Order[]>> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<Response<Order>> {
    throw new Error('Method not implemented.');
  }
  create(data: Order): Promise<Response<Order>> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: Order): Promise<Response<Order>> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<Response<Order>> {
    throw new Error('Method not implemented.');
  }
}
