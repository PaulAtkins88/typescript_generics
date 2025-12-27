import IResponse from '../interface/IDataLayer';
import IRepository from '../interface/IRepository';
import Order from '../model/Order';

/**
 * In-memory implementation of Order repository.
 * 
 * TEACHING EXAMPLE: Same Pattern, Different Entity
 * This is nearly identical to InMemoryUserRepository but manages Order entities.
 * The generic IRepository<T> interface means we implement the same methods
 * regardless of entity type.
 * 
 * ALTERNATIVE IMPLEMENTATIONS:
 * - PostgresOrderRepository: SELECT * FROM orders WHERE id = $1
 * - MongoOrderRepository: db.orders.findOne({ id })
 * - RedisOrderRepository: redis.get(`order:${id}`)
 * - FileOrderRepository: JSON.parse(fs.readFileSync('orders.json'))
 */
export default class InMemoryOrderRepository implements IRepository<Order> {
  /**
   * In-memory data store for orders.
   * Notice orders contain nested User objects - repositories handle
   * entity relationships and data structure.
   */
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
