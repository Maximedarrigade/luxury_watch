import { pool } from "../config/db.js";

export const MontreModel = {
  async create(data) {
    const [res] = await pool.query(
      "INSERT INTO montres (nom, prix, description, stock, categorie_id) VALUES (?, ?, ?, ?, ?)",
      [data.nom, data.prix, data.description, data.stock, data.categorie_id],
    );
    return res.insertId;
  },

  async addImage(id, url) {
    await pool.query(
      "INSERT INTO images (url, montre_id, principale) VALUE (?, ?, true)",
      [url, id],
    );
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM montres");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `
            SELECT m.*, 
            COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url, 'principale', i.principale), NULL)), JSON_ARRAY()) AS images 
            FROM montres m 
            LEFT JOIN images i ON m.id = i.montre_id 
            WHERE m.id = ?
            GROUP BY m.id
        `,
      [id],
    );
    return {
      ...rows[0],
      images:
        typeof rows[0].images === "string"
          ? JSON.parse(rows[0].images)
          : rows[0].images,
    };
  },

  async updateById(id, data) {
    const [res] = await pool.query(
      "UPDATE montres SET nom = ?, prix = ?, description = ?, stock = ?, categorie_id = ? WHERE id = ?",
      [
        data.nom,
        data.prix,
        data.description,
        data.stock,
        data.categorie_id,
        id,
      ],
    );
    return res.affectedRows;
  },

  async deleteById(id) {
    await pool.query("DELETE FROM images WHERE montre_id = ?", [id]);
    await pool.query("DELETE FROM commandes_montres WHERE montre_id = ?", [id]);
    const [res] = await pool.query("DELETE FROM montres WHERE id = ?", [id]);
    return res.affectedRows;
  },

  async getAllMontres() {
    const [rows] = await pool.query(`
            SELECT m.id, m.nom, m.prix, m.description, m.stock, m.categorie_id, 
            COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url, 'principale', i.principale), NULL)), JSON_ARRAY()) AS images 
            FROM montres m 
            LEFT JOIN images i ON m.id = i.montre_id 
            GROUP BY m.id 
            ORDER BY m.id DESC
        `);
    return rows.map((row) => ({
      ...row,
      images:
        typeof row.images === "string" ? JSON.parse(row.images) : row.images,
    }));
  },

  async getByCategorie(categorie_id) {
    const [rows] = await pool.query(
      "SELECT * FROM montres WHERE categorie_id = ?",
      [categorie_id],
    );
    return rows;
  },

  async getByCategorieImages(categorie_id) {
    const [rows] = await pool.query(
      `
            SELECT m.*, 
            COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url, 'principale', i.principale), NULL)), JSON_ARRAY()) AS images 
            FROM montres m 
            LEFT JOIN images i ON m.id = i.montre_id 
            WHERE m.categorie_id = ?
            GROUP BY m.id
        `,
      [categorie_id],
    );
    return rows.map((row) => ({
      ...row,
      images:
        typeof row.images === "string" ? JSON.parse(row.images) : row.images,
    }));
  },

  async search(query) {
    const [rows] = await pool.query(
      `
            SELECT m.*, c.nom as marque,
            COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url, 'principale', i.principale), NULL)), JSON_ARRAY()) AS images 
            FROM montres m 
            LEFT JOIN categories c ON m.categorie_id = c.id
            LEFT JOIN images i ON m.id = i.montre_id
            WHERE m.nom LIKE ? OR c.nom LIKE ?
            GROUP BY m.id
        `,
      [`%${query}%`, `%${query}%`],
    );
    return rows.map((row) => ({
      ...row,
      images:
        typeof row.images === "string" ? JSON.parse(row.images) : row.images,
    }));
  },
};
