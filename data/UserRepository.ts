import Response from '../interface/IDataLayer';
import IDataLayerService from '../interface/IDataLayerService';
import User from '../model/User';

export default class UserDataLayerService implements IDataLayerService<User> {
  getAll(): Promise<Response<User[]>> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<Response<User>> {
    throw new Error('Method not implemented.');
  }
  create(data: User): Promise<Response<User>> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: User): Promise<Response<User>> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<Response<User>> {
    throw new Error('Method not implemented.');
  }
}
