import { pool } from "../config/db.js";

export const CommandeModel = {
  // Créer une commande
  async create(user_id, total) {
    const [res] = await pool.query(
      "INSERT INTO commandes (user_id, total) VALUES (?, ?)",
      [user_id, total],
    );

    return res.insertId;
  },

  // Ajouter une montre a une commande
  async addMontre(commande_id, montre_id, quantite, prix) {
    await pool.query(
      "INSERT INTO commandes_montres (commande_id, montre_id, quantite, prix) VALUES (?, ?, ?, ?)",
      [commande_id, montre_id, quantite, prix],
    );
  },

  // Récupèrer toutes les commandes (pour l'admin)
  async findAll() {
    const [rows] = await pool.query(
      `SELECT c.*, u.email, u.nom as user_nom FROM commandes c JOIN utilisateurs u ON c.user_id = u.id ORDER BY u.email, c.created_at DESC`,
    );

    return rows;
  },

  // Récupèrer les montres d'une commande
  async getMontresByCommande(commande_id) {
    const [rows] = await pool.query(
      `SELECT cm.*, m.nom, COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url), NULL)), JSON_ARRAY()) AS images FROM commandes_montres cm  JOIN montres m ON cm.montre_id = m.id LEFT JOIN images i ON m.id = i.montre_id WHERE cm.commande_id = ? GROUP BY cm.id, m.nom`,
      [commande_id],
    );

    return rows;
  },

  // Mettre a jour le statut d'une commande
  async updateStatut(id, statut) {
    const [res] = await pool.query(
      "UPDATE commandes SET statut = ? WHERE id = ?",
      [statut, id],
    );

    return res.affectedRows;
  },

  // Récupérer les commandes d'un utilisateur
  async findByUserId(user_id) {
    const [rows] = await pool.query(
      `SELECT c.* FROM commandes c WHERE c.user_id = ? ORDER BY c.created_at DESC`,
      [user_id],
    );

    return rows;
  },
};
