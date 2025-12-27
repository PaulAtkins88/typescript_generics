import { CreateOrderRequest, OrderResponse, UpdateOrderRequest } from '../dto/Order.dto';
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
export default class OrderService extends BaseService<CreateOrderRequest | UpdateOrderRequest, OrderResponse, Order> {
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

  protected toEntity(request: CreateOrderRequest | UpdateOrderRequest): Order {
    return {
      id: request.id,
      user: {
        id: request.userId,
        name: '', // name will be hydrated by repository on reads; placeholder for create/update
      },
    };
  }

  protected toResponse(entity: Order): OrderResponse {
    return {
      id: entity.id,
      user: {
        id: entity.user.id,
        name: entity.user.name,
      },
    };
  }
}
