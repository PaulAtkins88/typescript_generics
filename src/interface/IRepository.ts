import IResponse from './IDataLayer';

/**
 * Generic repository interface for data access operations.
 * 
 * This interface demonstrates the Repository Pattern - it abstracts away the
 * underlying data source (database, file, API, in-memory) from the business logic.
 * 
 * KEY CONCEPT: Repositories are ONLY concerned with data persistence and retrieval.
 * They should NOT contain business logic, validation, or orchestration.
 * 
 * @template T - The entity type this repository manages (User, Order, etc.)
 * 
 * @example
 * // Multiple implementations for the same interface:
 * class InMemoryUserRepository implements IRepository<User> { ... }
 * class PostgresUserRepository implements IRepository<User> { ... }
 * class MongoUserRepository implements IRepository<User> { ... }
 * class FileUserRepository implements IRepository<User> { ... }
 * 
 * // Services can work with any implementation:
 * const service = new UserService(new PostgresUserRepository());
 * // Later, swap to in-memory for testing:
 * const testService = new UserService(new InMemoryUserRepository());
 */
interface IRepository<T> {
  /**
   * Retrieve all entities of type T from the data source.
   * @returns Promise resolving to an array of all entities
   */
  getAll(): Promise<IResponse<T[]>>;

  /**
   * Retrieve a single entity by its unique identifier.
   * @param id - The unique identifier of the entity
   * @returns Promise resolving to the entity if found
   */
  getById(id: number): Promise<IResponse<T>>;

  /**
   * Persist a new entity to the data source.
   * @param data - The entity data to create
   * @returns Promise resolving to the created entity
   */
  create(data: T): Promise<IResponse<T>>;

  /**
   * Update an existing entity in the data source.
   * @param id - The unique identifier of the entity to update
   * @param data - The updated entity data
   * @returns Promise resolving to the updated entity
   */
  update(id: number, data: T): Promise<IResponse<T>>;

  /**
   * Remove an entity from the data source.
   * @param id - The unique identifier of the entity to delete
   * @returns Promise resolving to the deleted entity
   */
  delete(id: number): Promise<IResponse<T>>;
}

export default IRepository;
