import IResponse from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';
import Order from '../model/Order';
import { BaseRepository } from './BaseRepository.repository';

export default class OrderDataLayerService
  extends BaseRepository<Order>
  implements IDataLayerService<Order>
{
  // This could be a database connection or a REST API call, but for this demo, we'll just use an array.
  private orders: Order[] = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'John Doe'
      }
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Jane Doe'
      }
    }
  ];

  getAll(): Promise<IResponse<Order[]>> {
    return Promise.resolve({
      data: this.orders,
      success: true
    });
  }

  getById(id: number): Promise<IResponse<Order>> {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      return Promise.reject({
        success: false,
        message: 'Order not found'
      });
    }
    return Promise.resolve({
      data: order,
      success: true
    });
  }

  create(data: Order): Promise<IResponse<Order>> {
    this.orders.push(data);
    return Promise.resolve({
      data,
      success: true
    });
  }

  update(id: number, data: Order): Promise<IResponse<Order>> {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      return Promise.reject({
        success: false,
        message: 'Order not found'
      });
    }
    const index = this.orders.indexOf(order);
    this.orders[index] = data;
    return Promise.resolve({
      data,
      success: true
    });
  }

  delete(id: number): Promise<IResponse<Order>> {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      return Promise.reject({
        success: false,
        message: 'Order not found'
      });
    }
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    return Promise.resolve({
      data: order,
      success: true
    });
  }
}
