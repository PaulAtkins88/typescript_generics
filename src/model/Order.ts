import User from './User';

/**
 * Order entity type definition.
 * 
 * TEACHING EXAMPLE: Entity with Relationships
 * Orders contain a nested User object, demonstrating entity relationships.
 */
type Order = {
  /** Unique identifier for the order */
  id: number;
  /** The user who placed this order */
  user: User;
};
export default Order;
