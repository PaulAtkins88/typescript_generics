import IResponse from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';
import User from '../model/User';
import { BaseRepository } from './BaseRepository.repository';

export default class UserRepository
  extends BaseRepository<User>
  implements IDataLayerService<User>
{
  // This could be a database connection or a REST API call, but for this demo, we'll just use an array.
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
