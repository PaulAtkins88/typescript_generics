import IResponse from '../interface/IDataLayer';
import IRepository from '../interface/IRepository';
import IService from '../interface/IService';

/**
 * Generic base service class implementing the Service Layer Pattern.
 * 
 * TEACHING CONCEPT: Generic Base Classes
 * This abstract class demonstrates how TypeScript generics eliminate code duplication.
 * Instead of writing the same CRUD methods for UserService, OrderService, ProductService, etc.,
 * we write them ONCE with a type parameter <T>.
 * 
 * PATTERN: Dependency Injection
 * The service depends on IRepository<T> (abstraction), not a concrete implementation.
 * This follows the Dependency Inversion Principle (SOLID).
 * 
 * @template R - Request DTO (input shape)
 * @template T - Response DTO (output shape)
 * @template E - Domain entity used by the repository (defaults to T)
 * 
 * @example
 * // Concrete services just specify the type and inject the repository:
 * class UserService extends BaseService<User> {
 *   protected repository: IRepository<User>;
 *   
 *   constructor(repository: IRepository<User>) {
 *     super();
 *     this.repository = repository;
 *   }
 *   
 *   // Inherits all CRUD methods from BaseService!
 *   // Add custom business logic methods here:
 *   async deactivateInactiveUsers(days: number) { ... }
 * }
 * 
 * @example
 * // Swappable implementations (same service, different data source):
 * const prodService = new UserService(new PostgresUserRepository());
 * const testService = new UserService(new InMemoryUserRepository());
 * const cacheService = new UserService(new CachedUserRepository());
 */
export abstract class BaseService<R, T, E = T> implements IService<R, T> {
  /**
   * Abstract repository property that must be provided by concrete services.
   * This enforces that every service has a repository while keeping the base class
   * flexible about which implementation to use.
   */
  protected abstract repository: IRepository<E>;

  /** Map request DTO -> domain entity */
  protected abstract toEntity(request: R): E;

  /** Map domain entity -> response DTO */
  protected abstract toResponse(entity: E): T;

  /**
   * Delegates to repository's getAll() method.
   * Override in concrete services to add business logic (filtering, sorting, auth, etc.)
   */
  async getAll(): Promise<IResponse<T[]>> {
    const result = await this.repository.getAll();
    return { ...result, data: result.data.map((item) => this.toResponse(item)) };
  }

  /**
   * Delegates to repository's getById() method.
   * Override in concrete services to add business logic (auth checks, data enrichment, etc.)
   */
  async getById(id: number): Promise<IResponse<T>> {
    const result = await this.repository.getById(id);
    return { ...result, data: this.toResponse(result.data) };
  }

  /**
   * Delegates to repository's create() method.
   * Override in concrete services to add business logic (validation, defaults, notifications, etc.)
   */
  async create(data: R): Promise<IResponse<T>> {
    const entity = this.toEntity(data);
    const result = await this.repository.create(entity);
    return { ...result, data: this.toResponse(result.data) };
  }

  /**
   * Delegates to repository's update() method.
   * Override in concrete services to add business logic (validation, auth, audit logs, etc.)
   */
  async update(id: number, data: R): Promise<IResponse<T>> {
    const entity = this.toEntity(data);
    const result = await this.repository.update(id, entity);
    return { ...result, data: this.toResponse(result.data) };
  }

  /**
   * Delegates to repository's delete() method.
   * Override in concrete services to add business logic (auth, cascade deletes, cleanup, etc.)
   */
  async delete(id: number): Promise<IResponse<T>> {
    const result = await this.repository.delete(id);
    return { ...result, data: this.toResponse(result.data) };
  }
}
