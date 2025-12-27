import IRepository from '../interface/IRepository';
import Order from '../model/Order';
import { BaseService } from './Base.service';

/**
 * Order service implementing business logic for Order entities.
 * 
 * TEACHING EXAMPLE: Multiple Services Using Same Pattern
 * Notice how this is nearly identical to UserService - that's the power of generics!
 * We just change the type parameter from <User> to <Order>.
 * 
 * REAL-WORLD USAGE:
 * In a real application, this is where you'd add order-specific logic:
 * - validateOrderItems()
 * - calculateOrderTotal()
 * - processPayment(order: Order)
 * - sendOrderConfirmation(order: Order)
 * - checkInventoryAvailability(items: Item[])
 * - etc.
 */
export default class OrderService extends BaseService<Order> {
  protected repository: IRepository<Order>;

  /**
   * Constructor accepts any implementation of IRepository<Order>.
   * 
   * @param repository - The repository implementation to use for data access
   */
  constructor(repository: IRepository<Order>) {
    super();
    this.repository = repository;
  }

  // All CRUD methods inherited from BaseService<Order>
  // Add custom business logic methods here
}
