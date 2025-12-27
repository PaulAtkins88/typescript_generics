/**
 * User entity type definition.
 * 
 * TEACHING EXAMPLE: Simple Entity Type
 * This defines the shape of User objects throughout the application.
 * TypeScript's type system ensures consistency across all layers.
 */
type User = {
  /** Unique identifier for the user */
  id: number;
  /** User's full name */
  name: string;
};
export default User;
