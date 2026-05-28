import { CommandeModel } from "../models/commande.model.js";

// Créer une commande

export const createCommande = async (req, res, next) => {
  try {
    const { panier, total } = req.body;
    const user_id = req.user.id;
    const commande_id = await CommandeModel.create(user_id, total);

    for (let item of panier) {
      await CommandeModel.addMontre(
        commande_id,
        item.id,
        item.quantite,
        item.prix,
      );
    }

    res
      .status(201)
      .json({ message: "Commande créer avec succès", commande_id });
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les commandes (admin)

export const getCommandes = async (req, res, next) => {
  try {
    const commandes = await CommandeModel.findAll();

    for (let commande of commandes) {
      commande.montres = await CommandeModel.getMontresByCommande(commande.id);
    }

    res.json(commandes);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour le statut d'une commande (admin)

export const updateStatutCommande = async (req, res, next) => {
  try {
    const result = await CommandeModel.updateStatut(
      req.params.id,
      req.body.statut,
    );

    if (!result)
      return res.status(404).json({ message: "Commande introuvable" });

    res.json({ message: "Statut mis à jour" });
  } catch (error) {
    next(error);
  }
};

// Récupérer les commandes de l'utilisateur connecté
export const getMesCommandes = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const commandes = await CommandeModel.findByUserId(user_id);

    for (let commande of commandes) {
      commande.montres = await CommandeModel.getMontresByCommande(commande.id);
    }

    res.json(commandes);
  } catch (error) {
    next(error);
  }
};
