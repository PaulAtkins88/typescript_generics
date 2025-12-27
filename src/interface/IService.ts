import IResponse from './IDataLayer';

/**
 * Generic service interface for business logic operations.
 * 
 * This interface demonstrates the Service Layer Pattern - it encapsulates business
 * logic, validation, and orchestration between multiple repositories or external services.
 * 
 * KEY CONCEPT: Services contain business rules and workflows. They coordinate between
 * repositories, apply validation, transform data, and implement complex operations.
 * 
 * WHY SEPARATE FROM REPOSITORY?
 * - Services are about "what" (business rules)
 * - Repositories are about "how" (data access)
 * - Services can use multiple repositories
 * - Business logic stays testable and independent of data storage
 * 
 * @template T - The entity type this service manages (User, Order, etc.)
 * 
 * @example
 * // Simple CRUD (looks like repository, but can grow):
 * class UserService implements IService<User> {
 *   constructor(private repository: IRepository<User>) {}
 *   
 *   async create(user: User) {
 *     // Business logic: validate, transform, etc.
 *     if (!user.email) throw new Error('Email required');
 *     return await this.repository.create(user);
 *   }
 * }
 * 
 * @example
 * // Complex operations (where service layer shines):
 * class OrderService implements IService<Order> {
 *   async create(order: Order) {
 *     // Business logic spanning multiple repositories:
 *     await this.userRepo.getById(order.userId); // validate user exists
 *     await this.inventoryRepo.reserve(order.items); // check stock
 *     const result = await this.orderRepo.create(order); // persist
 *     await this.emailService.sendConfirmation(order); // notify
 *     return result;
 *   }
 * }
 * 
 * NOTE: In this teaching example, services are simple pass-throughs. In real apps,
 * this is where you'd add validation, business rules, and multi-step workflows.
 */
interface IService<T> {
  /**
   * Retrieve all entities with optional business logic applied.
   * (e.g., filtering, sorting, authorization checks)
   * @returns Promise resolving to an array of all entities
   */
  getAll(): Promise<IResponse<T[]>>;

  /**
   * Retrieve a single entity with business logic applied.
   * (e.g., authorization, data enrichment, validation)
   * @param id - The unique identifier of the entity
   * @returns Promise resolving to the entity if found and authorized
   */
  getById(id: number): Promise<IResponse<T>>;

  /**
   * Create a new entity with business logic applied.
   * (e.g., validation, defaults, related entity creation, notifications)
   * @param data - The entity data to create
   * @returns Promise resolving to the created entity
   */
  create(data: T): Promise<IResponse<T>>;

  /**
   * Update an existing entity with business logic applied.
   * (e.g., validation, authorization, audit logging, cascade updates)
   * @param id - The unique identifier of the entity to update
   * @param data - The updated entity data
   * @returns Promise resolving to the updated entity
   */
  update(id: number, data: T): Promise<IResponse<T>>;

  /**
   * Delete an entity with business logic applied.
   * (e.g., authorization, cascade deletes, soft delete, cleanup)
   * @param id - The unique identifier of the entity to delete
   * @returns Promise resolving to the deleted entity
   */
  delete(id: number): Promise<IResponse<T>>;
}

export default IService;
