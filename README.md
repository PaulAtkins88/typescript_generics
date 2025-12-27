# TypeScript Generics — DTO-Aware Layered API (branch variant)

A small Express API demonstrating how to use TypeScript generics to build a clean, layered architecture:

Controller (HTTP) → Service (Business Logic) → Repository (Data Access) → Data Source

This repo shows how generics remove duplication across entities (e.g., `User`, `Order`) by sharing type-safe base interfaces and classes, and how DTO-aware services (`IService<R, T>`) keep wire contracts separate from domain models.

## Key Concepts

- Generic interfaces: `IRepository<T>`, `IService<R, T>`, `IResponse<T>`
- Generic base classes: `BaseService<R, T, E>`, `BaseController<R, T>`
- Repository Pattern: swap data sources without changing services/controllers
- Service Layer Pattern: centralize business logic and orchestration
- Dependency Injection: pass repository implementations into services
- Separation of concerns: HTTP, business logic, data access kept distinct
- DTO boundary: request DTO (R) and response DTO (T) mapped to domain entities (E) inside services

## Project Structure

```
src/
  dto/
    Order.dto.ts
    User.dto.ts
  controller/
    Base.controller.ts
    Order.controller.ts
    User.controller.ts
  interface/
    IDataLayer.ts            # IResponse<T>
    IRepository.ts           # data access abstraction
    IService.ts              # business logic abstraction (request/response DTO aware)
  model/
    Order.ts
    User.ts
  repository/
    InMemoryOrder.repository.ts
    InMemoryUser.repository.ts
    PostgresOrder.repository.ts
    PostgresUser.repository.ts
  routes/
    index.ts
    Order.route.ts
    User.route.ts
  service/
    Base.service.ts          # generic DTO-aware service
    Order.service.ts
    User.service.ts
index.ts                     # app entry point
server.ts                    # express app setup
package.json
```

## Architecture

```
HTTP Request
   │
   ▼
Controller<R, T>
  - parses request
  - handles HTTP errors
  - delegates to Service
   │
   ▼
Service<R, T, E>
  - business logic
  - validation & orchestration
  - maps Request DTO (R) → Entity (E) → Response DTO (T)
  - depends on IRepository<E>
   │
   ▼
Repository<T>
   - data access abstraction
   - implementations: InMemory, Postgres, File, API
   │
   ▼
Data Source
```
## UML Diagrams

### Class Diagram — Generics and Layering

```mermaid
classDiagram
direction LR

class IResponse~T~ {
  +data: T
  +success: boolean
}

class IRepository~T~ {
  +getAll() IResponse~T[]~
  +getById(id) IResponse~T~
  +create(data) IResponse~T~
  +update(id, data) IResponse~T~
  +delete(id) IResponse~T~
}

class IService~T~ {
  +getAll() IResponse~T[]~
  +getById(id) IResponse~T~
  +create(data) IResponse~T~
  +update(id, data) IResponse~T~
  +delete(id) IResponse~T~
}

class BaseService~T~
IService~T~ <|.. BaseService~T~
BaseService~T~ o--> IRepository~T~ : depends on

class BaseController~T~ {
  +handleRequest~R~()
}
IService~T~ <|.. BaseController~T~
BaseController~T~ o--> IService~T~ : depends on

class User { +id: number; +name: string }
class Order { +id: number; +user: User }

class UserRequestDto { +id: number; +name: string }
class UserResponseDto { +id: number; +name: string }
class OrderRequestDto { +id: number; +userId: number }
class OrderResponseDto { +id: number; +user: UserResponseDto }

class UserService
UserService --|> BaseService~UserRequestDto, UserResponseDto, User~

class OrderService
OrderService --|> BaseService~OrderRequestDto, OrderResponseDto, Order~

class InMemoryUserRepository { +users: User[] }
InMemoryUserRepository ..|> IRepository~User~

class InMemoryOrderRepository { +orders: Order[] }
InMemoryOrderRepository ..|> IRepository~Order~

class UserController
UserController --|> BaseController~UserRequestDto, UserResponseDto~

class OrderController
OrderController --|> BaseController~OrderRequestDto, OrderResponseDto~
```

### Sequence Diagram — Request Flow

```mermaid
sequenceDiagram
participant Client
participant UserController
participant UserService
participant UserRepository as IRepository<User>
participant DataSource

Client->>UserController: POST /api/users (UserRequestDto)
UserController->>UserService: create(dto)
UserService->>UserRepository: create(entity from dto)
UserRepository->>DataSource: Persist user
DataSource-->>UserRepository: User
UserRepository-->>UserService: User
UserService-->>UserController: UserResponseDto
UserController-->>Client: 201 Created + JSON
```

### Wiring & Swappable Repositories

```mermaid
graph TD
  A[User.route.ts] --> B[UserService]
  B --> C[IRepository<User>]
  C --> D[InMemoryUserRepository]
  C --> E[PostgresUserRepository]
  C --> F[FileUserRepository]

  G[Order.route.ts] --> H[OrderService]
  H --> I[IRepository<Order>]
  I --> J[InMemoryOrderRepository]
  I --> K[PostgresOrderRepository]
  I --> L[FileOrderRepository]
```

---
## Quick Start

```bash
# using pnpm (recommended)
pnpm install
pnpm run dev   # tsx watch

# or with npm
npm install
npm run dev
```

You’ll see endpoint hints in the console when the server starts.

## API Endpoints

- Users
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/users`
  - `PUT /api/users/:id`
  - `DELETE /api/users/:id`
- Orders
  - `GET /api/orders`
  - `GET /api/orders/:id`
  - `POST /api/orders`
  - `PUT /api/orders/:id`
  - `DELETE /api/orders/:id`

### Try It (curl)

```bash
# list users
curl http://localhost:3000/api/users

# get user by id
curl http://localhost:3000/api/users/1

# create user
curl -X POST http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{"id":3,"name":"Alice"}'

# update user
curl -X PUT http://localhost:3000/api/users/3 \
  -H 'Content-Type: application/json' \
  -d '{"id":3,"name":"Alice Updated"}'

# delete user
curl -X DELETE http://localhost:3000/api/users/3
```

## Teaching Highlights

- DTO-aware services: `IService<R, T>` separates request (R) and response (T) DTOs from domain entities. Services map `R -> entity -> T`, enabling validation, transformations, and versioned contracts without leaking persistence models.
- `IRepository<T>` remains focused on data access; services orchestrate business rules.
- Generic base classes prevent duplication:
  - `BaseService<R, T, E>` implements CRUD once and maps DTOs ↔ domain entities.
  - `BaseController<R, T>` standardizes HTTP flow and error handling.

  ### DTO Mapping Example (IService<R, T>)

  ```ts
  // Request DTO (input) and Response DTO (output)
  type CreateUserRequest = { id: number; name: string };
  type UserResponse = { id: number; name: string };

  // Service interface carries both types
  interface IService<R, T> {
    create(data: R): Promise<IResponse<T>>;
    update(id: number, data: R): Promise<IResponse<T>>;
    getById(id: number): Promise<IResponse<T>>;
    getAll(): Promise<IResponse<T[]>>;
    delete(id: number): Promise<IResponse<T>>;
  }

  // BaseService maps DTOs <-> domain entity
  class BaseService<R, T, E = T> implements IService<R, T> {
    protected repository: IRepository<E>;
    protected toEntity(request: R): E;    // request DTO -> entity
    protected toResponse(entity: E): T;   // entity -> response DTO
    // CRUD methods delegate to repository and map via toResponse
  }
  ```

## Swapping Data Sources

Repositories implement `IRepository<T>`. Swapping the data source is as simple as changing the constructor wiring in the routes:

```ts
// src/routes/User.route.ts
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
```

Replace with `PostgresUserRepository` or `FileUserRepository` without touching service/controller code.

### Postgres Example

To try the Postgres-backed repository:

```bash
# set connection and toggle Postgres use
export DATABASE_URL="postgres://user:pass@localhost:5432/mydb"
export USE_POSTGRES=true
pnpm run dev
```

Create a minimal table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
```

Seed a record to test:

```sql
INSERT INTO users (id, name) VALUES (1, 'John Doe') ON CONFLICT (id) DO NOTHING;
```

## Add a New Entity (Recipe)

1. Define the domain entity: `src/model/Product.ts`
2. Add DTOs: `src/dto/Product.dto.ts` with `ProductRequestDto` (input) and `ProductResponseDto` (output)
3. Implement repository: `InMemoryProduct.repository.ts` (implements `IRepository<Product>`) or a DB-backed repo
4. Create service: `Product.service.ts` extending `BaseService<ProductRequestDto, ProductResponseDto, Product>` and implement `toEntity`/`toResponse`
5. Create controller: `Product.controller.ts` extending `BaseController<ProductRequestDto, ProductResponseDto>` and inject the service
6. Add routes: `Product.route.ts` wiring Repository → Service → Controller, then mount in `src/routes/index.ts`

## Where to Add Business Logic

- Prefer adding business rules in Services:
  - validation (e.g., required fields)
  - orchestration (e.g., create order → check stock → charge → notify)
  - transformations (DTOs, aggregations)
- Keep Repositories focused on persistence only.

## Testing Tips

- Unit test services by mocking `IRepository<T>`
- Integration test routes with the real express app using supertest
- Swap `InMemory*Repository` implementations for fast, deterministic tests

## Notes

- Built with TypeScript `^5.9.x` and Express `^5.x`
- Dev script uses `tsx watch` for quick iteration
- This project intentionally uses in-memory repositories for clarity

---

If you’d like, I can add a sample `PostgresUserRepository` implementation and a minimal test suite to demonstrate swapping data sources and testing services with mocks.