import { pool } from "../config/db.js";

export const CategoryModel = {
  async create(data) {
    const [res] = await pool.query(
      "INSERT INTO categories (nom, description, image) VALUES (?, ?, ?)",
      [data.nom, data.description, data.image || null],
    );

    return { id: res.insertId, ...data };
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM categories");

    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);

    return rows[0];
  },

  async updateById(id, data) {
    const [res] = await pool.query(
      "UPDATE categories SET nom = ?, description = ?, image = ? WHERE id = ?",
      [data.nom, data.description, data.image || null, id],
    );

    return res.affectedRows;
  },

  async deleteById(id) {
    const [res] = await pool.query("DELETE FROM categories WHERE id =?", [id]);

    return res.affectedRows;
  },
};
