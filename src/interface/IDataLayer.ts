/**
 * Generic response wrapper for consistent API responses.
 * 
 * This type demonstrates TypeScript generics by wrapping any data type T
 * in a standardized response structure. This ensures all API responses
 * follow the same format regardless of the data being returned.
 * 
 * @template T - The type of data being returned (User, Order, array, etc.)
 * 
 * @example
 * // Returning a single user
 * const userResponse: IResponse<User> = {
 *   data: { id: 1, name: 'John' },
 *   success: true
 * };
 * 
 * @example
 * // Returning an array of orders
 * const ordersResponse: IResponse<Order[]> = {
 *   data: [{ id: 1, user: {...} }, { id: 2, user: {...} }],
 *   success: true
 * };
 */
type IResponse<T> = {
  /** The actual data payload of type T */
  data: T;
  /** Indicates whether the operation was successful */
  success: boolean;
};
export default IResponse;
