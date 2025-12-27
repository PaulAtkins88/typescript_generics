import { Pool } from 'pg';
import IResponse from '../interface/IDataLayer';
import IRepository from '../interface/IRepository';
import User from '../model/User';

/**
 * Postgres-backed User repository.
 *
 * This implementation demonstrates swapping the data source without changing
 * service or controller code. It uses `pg` and expects a `users` table:
 *
 * CREATE TABLE IF NOT EXISTS users (
 *   id   INTEGER PRIMARY KEY,
 *   name TEXT NOT NULL
 * );
 *
 * Configure via env var: DATABASE_URL=postgres://user:pass@host:port/db
 */
export default class PostgresUserRepository implements IRepository<User> {
  private pool: Pool;

  constructor(pool?: Pool) {
    this.pool =
      pool ??
      new Pool({
        connectionString: process.env.DATABASE_URL,
      });
  }

  async getAll(): Promise<IResponse<User[]>> {
    const { rows } = await this.pool.query('SELECT id, name FROM users ORDER BY id');
    return { data: rows as User[], success: true };
  }

  async getById(id: number): Promise<IResponse<User>> {
    const { rows } = await this.pool.query('SELECT id, name FROM users WHERE id = $1', [id]);
    const user = rows[0] as User | undefined;
    if (!user) {
      return Promise.reject({ success: false, message: 'User not found' });
    }
    return { data: user, success: true };
  }

  async create(data: User): Promise<IResponse<User>> {
    await this.pool.query('INSERT INTO users (id, name) VALUES ($1, $2)', [data.id, data.name]);
    return { data, success: true };
  }

  async update(id: number, data: User): Promise<IResponse<User>> {
    const { rowCount } = await this.pool.query('UPDATE users SET name = $2 WHERE id = $1', [id, data.name]);
    if (rowCount === 0) {
      return Promise.reject({ success: false, message: 'User not found' });
    }
    return { data, success: true };
  }

  async delete(id: number): Promise<IResponse<User>> {
    const { rows } = await this.pool.query('DELETE FROM users WHERE id = $1 RETURNING id, name', [id]);
    const deleted = rows[0] as User | undefined;
    if (!deleted) {
      return Promise.reject({ success: false, message: 'User not found' });
    }
    return { data: deleted, success: true };
  }
}
