import app from './server';

/**
 * Application entry point.
 * 
 * TEACHING EXAMPLE: Complete TypeScript Generics Demo
 * This codebase demonstrates:
 * 
 * 1. Generic Interfaces (IRepository<T>, IService<T>)
 * 2. Generic Base Classes (BaseService<T>, BaseController<T>)
 * 3. Type Safety across layers
 * 4. Repository Pattern (swappable data sources)
 * 5. Service Layer Pattern (business logic separation)
 * 6. Dependency Injection (loose coupling)
 * 
 * ARCHITECTURE:
 * HTTP Request → Controller<T> → Service<T> → Repository<T> → Data Source
 * 
 * API Endpoints:
 * - GET    /api/users      - Get all users
 * - GET    /api/users/:id  - Get user by ID
 * - POST   /api/users      - Create user
 * - PUT    /api/users/:id  - Update user
 * - DELETE /api/users/:id  - Delete user
 * 
 * - GET    /api/orders      - Get all orders
 * - GET    /api/orders/:id  - Get order by ID
 * - POST   /api/orders      - Create order
 * - PUT    /api/orders/:id  - Update order
 * - DELETE /api/orders/:id  - Delete order
 */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  Users:  http://localhost:${PORT}/api/users`);
  console.log(`  Orders: http://localhost:${PORT}/api/orders`);
});
