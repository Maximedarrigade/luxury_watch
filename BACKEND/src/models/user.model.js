import { pool } from "../config/db.js";

export const UserModel = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateurs WHERE email = ?",
      [email],
    );

    return rows[0];
  },

  async create(data) {
    const [res] = await pool.query(
      "INSERT INTO utilisateurs (email, mot_de_passe) VALUES (?, ?)",
      [data.email, data.mot_de_passe],
    );

    return { id: res.insertId, email: data.email };
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM utilisateurs");

    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM utilisateurs WHERE id = ?", [
      id,
    ]);

    return rows[0];
  },

  async updateById(id, data) {
    const [res] = await pool.query(
      "UPDATE utilisateurs SET email = ?, mot_de_passe = ? WHERE id = ?",
      [data.email, data.mot_de_passe, id],
    );

    return res.affectedRows;
  },

  async deleteById(id) {
    const [res] = await pool.query("DELETE FROM utilisateurs WHERE id =?", [
      id,
    ]);

    return res.affectedRows;
  },

  async verifyUser(id) {
    const [res] = await pool.query(
      "UPDATE utilisateurs SET is_verified = 1 WHERE id = ? ",
      [id],
    );

    return res.affectedRows;
  },
};
