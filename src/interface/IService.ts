import IResponse from './IDataLayer';

/**
 * Generic service interface with distinct Request/Response types.
 *
 * TEACHING CONCEPT: DTOs at the service boundary
 * - R (Request DTO): transport/input shape (e.g., body payload)
 * - T (Response DTO): transport/output shape (what the API returns)
 *
 * This keeps wire contracts (DTOs) separate from domain entities, enabling validation,
 * mapping, and versioning without leaking persistence models to callers.
 */
interface IService<R, T> {
  /** Retrieve all items and return response DTOs */
  getAll(): Promise<IResponse<T[]>>;

  /** Retrieve a single item by id */
  getById(id: number): Promise<IResponse<T>>;

  /** Create from request DTO, return response DTO */
  create(data: R): Promise<IResponse<T>>;

  /** Update using request DTO, return response DTO */
  update(id: number, data: R): Promise<IResponse<T>>;

  /** Delete by id, return response DTO */
  delete(id: number): Promise<IResponse<T>>;
}

export default IService;
