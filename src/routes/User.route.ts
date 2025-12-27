import { Router } from 'express';
import UserController from '../controller/User.controller';
import InMemoryUserRepository from '../repository/InMemoryUser.repository';
import PostgresUserRepository from '../repository/PostgresUser.repository';
import UserService from '../service/User.service';

/**
 * User routes configuration.
 * 
 * TEACHING EXAMPLE: Dependency Injection & Wiring
 * This demonstrates the complete flow:
 * 1. Create repository (data access layer)
 * 2. Inject repository into service (business logic layer)
 * 3. Inject service into controller (HTTP layer)
 * 4. Wire controller methods to Express routes
 * 
 * KEY BENEFIT: Easy to swap implementations
 * Want to use Postgres? Just change:
 * const userRepository = new PostgresUserRepository();
 * Everything else stays the same!
 */
const userRouter = Router();

// Data Access Layer: Choose implementation based on environment
// Here is an example how we can easily swap repository implementations using environment variables
// USE_POSTGRES=true and DATABASE_URL set → Postgres; otherwise InMemory
const userRepository =
	process.env.USE_POSTGRES === 'true' && process.env.DATABASE_URL
		? new PostgresUserRepository()
		: new InMemoryUserRepository();

// Business Logic Layer: Inject the repository
const userService = new UserService(userRepository);

// HTTP Layer: Inject the service
const userController = new UserController(userService);

userRouter.get('/', userController.getAllUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));
userRouter.put('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;
