import { Router } from 'express';
import UserController from '../controller/User.controller';
import UserDataLayerService from '../data/UserRepository.repository';

const userRouter = Router();
const userDataLayerService = new UserDataLayerService();
const userController = new UserController(userDataLayerService);

userRouter.get('/', userController.getAllUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));
userRouter.put('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;
