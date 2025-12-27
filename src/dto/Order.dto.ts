/**
 * Transport-layer DTOs for Order.
 */
export type CreateOrderRequest = {
  id: number;
  userId: number;
};

export type UpdateOrderRequest = {
  id: number;
  userId: number;
};

export type OrderResponse = {
  id: number;
  user: {
    id: number;
    name: string;
  };
};
