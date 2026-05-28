import cloudinary from "../config/cloudinary.js";
import { MontreModel } from "../models/montre.model.js";
import { uploadImage } from "../services/image.service.js";

export const getMontre = async (req, res, next) => {
  try {
    res.json(await MontreModel.getAllMontres());
  } catch (error) {
    next(error);
  }
};

export const createMontre = async (req, res, next) => {
  try {
    const id = await MontreModel.create(req.body);

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const url = await uploadImage(req.files[i]);

        await MontreModel.addImage(id, url);
      }
    }

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const updateMontre = async (req, res, next) => {
  try {
    const result = await MontreModel.updateById(req.params.id, req.body);

    if (!result) return res.status(404).json({ message: "Montre introuvable" });

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const url = await uploadImage(req.files[i]);

        await MontreModel.addImage(req.params.id, url);
      }
    }

    res.json({ message: "Montre mise a jour" });
  } catch (error) {
    next(error);
  }
};

export const deleteMontre = async (req, res, next) => {
  try {
    const result = await MontreModel.deleteById(req.params.id);

    if (!result) return res.status(404).json({ message: "Montre introuvable" });

    res.json({ message: "Montre suprimée" });
  } catch (error) {
    next(error);
  }
};

export const getMontreById = async (req, res, next) => {
  try {
    const montre = await MontreModel.getById(req.params.id);

    if (!montre) return res.status(404).json({ message: "Montre introuvable" });

    res.json(montre);
  } catch (error) {
    next(error);
  }
};

export const getMontresByCategories = async (req, res, next) => {
  try {
    const montres = await MontreModel.getByCategorieImages(req.params.id);

    if (!montres)
      return res.status(404).json({ message: "Montre introuvable" });

    res.json(montres);
  } catch (error) {
    next(error);
  }
};

export const getBySearch = async (req, res, next) => {
  try {
    const { query } = req.query; // On récupère les termes de le recherche
    const montres = await MontreModel.search(query);

    res.json(montres);
  } catch (error) {
    next(error);
  }
};
