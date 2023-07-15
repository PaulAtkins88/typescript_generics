import UserRepository from '../data/UserRepository.repository';

// The user service will have a repository can be used to access the data layer.
// Path: src\service\User.service.ts
export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAll() {
    return await this.userRepository.getAll();
  }
  async getById(id) {
    return await this.userRepository.getById(id);
  }
  async create(data) {
    return await this.userRepository.create(data);
  }
  async update(id, data) {
    return await this.userRepository.update(id, data);
  }
  async delete(id) {
    return await this.userRepository.delete(id);
  }
}
