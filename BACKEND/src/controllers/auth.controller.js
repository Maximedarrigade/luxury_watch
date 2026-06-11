import { UserModel } from "../models/user.model.js";
import argon2 from "argon2"; // Permet le hash des mot de passe
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../services/mailer.service.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res, next) => {
  try {
    res.json(await UserModel.findAll());
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, mot_de_passe } = req.body;

    const user = await UserModel.findByEmail(email);

    if (!user)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    if (!user.is_verified)
      return res.status(403).json({ message: "Compte non vérifié" });

    const valid = await argon2.verify(user.mot_de_passe, mot_de_passe);

    if (!valid)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    });

    res.json({ message: "Connexion réussi", token });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, mot_de_passe } = req.body;

    const existing = await UserModel.findByEmail(email);

    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const passwordHash = await argon2.hash(mot_de_passe);
    const verifyToken = uuidv4();

    const user = await UserModel.create({
      ...req.body,
      mot_de_passe: passwordHash,
    });

    res.cookie("verifyToken", verifyToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    }); // Création d'un cookie qui contient le token UUID, inaccessible en JavaScript et qui expire dans 30 jours
    res.cookie("verifyEmail", email, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    }); // On stocke aussi l'email dans le cookie au cas ou l'utilisateur clique sur le liens pour vérifier son compte 1h plus tard

    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({ message: "Compte créé, vérifiez votre email" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: "none", 
    }); // On supprime le cookie avec le token

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.getById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const result = await UserModel.updateById(req.params.id, req.body);

    if (!result)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    res.json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.deleteById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    const cookieEmail = req.cookies.verifyEmail; // Récupération de l'email depuis le cookie

    const cookieToken = req.cookies.verifyToken; // Récupération du token depuis le cookie

    const user = await UserModel.findByEmail(cookieEmail); // On trouve l'utilisateur avec l'email du cookie

    if (!token || !cookieToken || token !== cookieToken)
      return res.status(400).json({ message: "Token invalide" });

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    await UserModel.verifyUser(user.id); // On vérifie le compte de l'utilisateur

    res.clearCookie("verifyToken"); // On supprime le cookie du token

    res.clearCookie("verifyEmail"); // On supprime le cookie de l'email

    res
      .status(200)
      .json({ message: "Compte vérifié, vous pouvez vous connecter" });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.getById(req.user.id);

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    res.json(user);
  } catch (error) {
    next(error);
  }
};
