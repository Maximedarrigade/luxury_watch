import { CategoryModel } from "../models/category.model.js";
import { uploadImage } from "../services/image.service.js";

export const getCategories = async (req, res, next) => {
  try {
    res.json(await CategoryModel.findAll());
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    res
      .status(201)
      .json(await CategoryModel.create({ ...req.body, image: imageUrl }));
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const result = await CategoryModel.updateById(req.params.id, {
      ...req.body,
      image: imageUrl,
    });

    if (!result)
      return res.status(404).json({ message: "Catégorie introuvable" });

    res.json({ message: "Catégorie mise a jour" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const result = await CategoryModel.deleteById(req.params.id);

    if (!result)
      return res.status(404).json({ message: "Catégorie non trouvée" });

    res.json({ message: "Catégorie suprimée" });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryModel.getById(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Catégorie non trouvée" });

    res.json(category);
  } catch (error) {
    next(error);
  }
};
