import IResponse from '../interface/IDataLayer';
import IRepository from '../interface/IRepository';
import User from '../model/User';

/**
 * In-memory implementation of User repository.
 * 
 * TEACHING EXAMPLE: Concrete Repository Implementation
 * This demonstrates the Repository Pattern by implementing IRepository<User>
 * using a simple in-memory array as the data source.
 * 
 * KEY CONCEPT: Swappable Data Sources
 * Because this implements IRepository<User>, it can be swapped with:
 * - PostgresUserRepository (database)
 * - FileUserRepository (JSON file)
 * - ApiUserRepository (external API)
 * - MockUserRepository (testing)
 * 
 * The service layer doesn't know or care which implementation is used!
 * 
 * NOTE: In-memory storage is lost when the server restarts.
 * This is useful for demos, testing, and prototyping.
 */
export default class InMemoryUserRepository implements IRepository<User> {
  /**
   * In-memory data store.
   * In a real app, this would be replaced with database queries,
   * file operations, or API calls.
   */
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jane Doe'
    }
  ];

  getAll(): Promise<IResponse<User[]>> {
    return Promise.resolve({
      data: this.users,
      success: true
    });
  }

  getById(id: number): Promise<IResponse<User>> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return Promise.reject({
        success: false,
        message: 'User not found'
      });
    }
    return Promise.resolve({
      data: user,
      success: true
    });
  }

  create(data: User): Promise<IResponse<User>> {
    this.users.push(data);
    return Promise.resolve({
      data,
      success: true
    });
  }

  update(id: number, data: User): Promise<IResponse<User>> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return Promise.reject({
        success: false,
        message: 'User not found'
      });
    }
    const index = this.users.indexOf(user);
    this.users[index] = data;
    return Promise.resolve({
      data,
      success: true
    });
  }

  delete(id: number): Promise<IResponse<User>> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return Promise.reject({
        success: false,
        message: 'User not found'
      });
    }
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return Promise.resolve({
      data: user,
      success: true
    });
  }
}
