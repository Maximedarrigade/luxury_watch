import { z } from "zod";

export const validateRegister = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    mot_de_passe: z.string().min(6),
    confirm_mot_de_passe: z.string().min(6),
  });

  try {
    schema.parse(req.body);

    if (req.body.mot_de_passe !== req.body.confirm_mot_de_passe)
      return res
        .status(400)
        .json({ message: "les mots de passes ne correspondent pas" });

    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    mot_de_passe: z.string().min(6),
  });

  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    next(error);
  }
};
