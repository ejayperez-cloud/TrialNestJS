import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { RowDataPacket, OkPacket } from "mysql2";

@Injectable()
export class PositionsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  // ✅ Create a position linked to a user
  async createPosition(
    position_code: string,
    position_name: string,
    id: number | string // user id
  ) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO positions (position_code, position_name, id) VALUES (?, ?, ?)',
      [position_code, position_name, id],
    );

    return {
      position_id: (result as OkPacket).insertId,
      position_code,
      position_name,
      id,
    };
  }

  // ✅ Get one position by its primary key
  async findById(position_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT position_id, position_code, position_name, id, created_at FROM positions WHERE position_id = ?',
      [position_id],
    );
    return rows[0];
  }

  // ✅ Get all positions
  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT position_id, position_code, position_name, id, created_at FROM positions',
    );
    return rows;
  }

  // ✅ Update a position
  async updatePosition(
    position_id: number,
    partial: { position_code?: string; position_name?: string; id?: number | string },
  ) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.position_code) {
      fields.push('position_code = ?');
      values.push(partial.position_code);
    }
    if (partial.position_name) {
      fields.push('position_name = ?');
      values.push(partial.position_name);
    }
    if (partial.id) {
      fields.push('id = ?');
      values.push(partial.id);
    }

    if (fields.length === 0) return await this.findById(position_id);

    values.push(position_id);
    const sql = `UPDATE positions SET ${fields.join(', ')} WHERE position_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(position_id);
  }

  // ✅ Delete a position
  async deletePosition(position_id: number) {
    const [res] = await this.pool().execute<OkPacket>(
      'DELETE FROM positions WHERE position_id = ?',
      [position_id],
    );
    return res.affectedRows > 0;
  }
}
