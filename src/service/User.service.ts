import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../dto/User.dto';
import IRepository from '../interface/IRepository';
import User from '../model/User';
import { BaseService } from './Base.service';

/**
 * User service implementing business logic for User entities.
 * 
 * TEACHING EXAMPLE: Concrete Service Implementation
 * This class demonstrates how to create a specific service by:
 * 1. Extending BaseService<User> - inherits all CRUD methods
 * 2. Accepting IRepository<User> via constructor - dependency injection
 * 3. Type safety throughout - TypeScript ensures User type consistency
 * 
 * REAL-WORLD USAGE:
 * In a real application, you would add business logic methods here:
 * - validateUserEmail()
 * - deactivateInactiveUsers(days: number)
 * - sendWelcomeEmail(user: User)
 * - getUserWithOrders(id: number)
 * - etc.
 */
export default class UserService extends BaseService<CreateUserRequest | UpdateUserRequest, UserResponse, User> {
  protected repository: IRepository<User>;

  /**
   * Constructor accepts any implementation of IRepository<User>.
   * This allows swapping between InMemory, Postgres, MongoDB, etc.
   * without changing this service code.
   * 
   * @param repository - The repository implementation to use for data access
   */
  constructor(repository: IRepository<User>) {
    super();
    this.repository = repository;
  }

  // All CRUD methods (getAll, getById, create, update, delete) are inherited!
  // Add custom business logic methods below:

  /** Map incoming DTOs to domain entity */
  protected toEntity(request: CreateUserRequest | UpdateUserRequest): User {
    return {
      id: request.id,
      name: request.name.trim(),
    };
  }

  /** Map domain entity to response DTO */
  protected toResponse(entity: User): UserResponse {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
