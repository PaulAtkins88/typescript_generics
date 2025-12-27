/**
 * Transport-layer DTOs for User.
 *
 * These types separate API request/response shapes from domain models.
 */
export type CreateUserRequest = {
  id: number;
  name: string;
};

export type UpdateUserRequest = {
  id: number;
  name: string;
};

export type UserResponse = {
  id: number;
  name: string;
};
