import { Pool } from 'pg';
import IResponse from '../interface/IDataLayer';
import IRepository from '../interface/IRepository';
import Order from '../model/Order';

/**
 * Postgres-backed Order repository.
 *
 * Demonstrates swapping data source without changing service/controller code.
 * Expects basic tables:
 *
 * CREATE TABLE IF NOT EXISTS users (
 *   id   INTEGER PRIMARY KEY,
 *   name TEXT NOT NULL
 * );
 *
 * CREATE TABLE IF NOT EXISTS orders (
 *   id      INTEGER PRIMARY KEY,
 *   user_id INTEGER NOT NULL REFERENCES users(id)
 * );
 */
export default class PostgresOrderRepository implements IRepository<Order> {
  private pool: Pool;

  constructor(pool?: Pool) {
    this.pool =
      pool ??
      new Pool({
        connectionString: process.env.DATABASE_URL,
      });
  }

  async getAll(): Promise<IResponse<Order[]>> {
    const { rows } = await this.pool.query(
      `SELECT o.id as id, u.id as user_id, u.name as user_name
       FROM orders o JOIN users u ON u.id = o.user_id
       ORDER BY o.id`
    );
    const orders: Order[] = rows.map((r: any) => ({ id: r.id, user: { id: r.user_id, name: r.user_name } }));
    return { data: orders, success: true };
  }

  async getById(id: number): Promise<IResponse<Order>> {
    const { rows } = await this.pool.query(
      `SELECT o.id as id, u.id as user_id, u.name as user_name
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.id = $1`,
      [id]
    );
    const r = rows[0];
    if (!r) {
      return Promise.reject({ success: false, message: 'Order not found' });
    }
    const order: Order = { id: r.id, user: { id: r.user_id, name: r.user_name } };
    return { data: order, success: true };
  }

  async create(data: Order): Promise<IResponse<Order>> {
    await this.pool.query('INSERT INTO orders (id, user_id) VALUES ($1, $2)', [data.id, data.user.id]);
    return { data, success: true };
  }

  async update(id: number, data: Order): Promise<IResponse<Order>> {
    const { rowCount } = await this.pool.query('UPDATE orders SET user_id = $2 WHERE id = $1', [id, data.user.id]);
    if (rowCount === 0) {
      return Promise.reject({ success: false, message: 'Order not found' });
    }
    return { data, success: true };
  }

  async delete(id: number): Promise<IResponse<Order>> {
    const { rows } = await this.pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING id, (SELECT row_to_json(u) FROM users u WHERE u.id = orders.user_id) as user',
      [id]
    );
    const r = rows[0];
    if (!r) {
      return Promise.reject({ success: false, message: 'Order not found' });
    }
    const deleted: Order = { id: r.id, user: r.user };
    return { data: deleted, success: true };
  }
}
