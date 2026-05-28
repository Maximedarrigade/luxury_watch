import { z } from "zod"; // bibliothèque de déclaration et de validation des schémas

export const registerSchema = z.object({
  email: z.string().min(2).max(50),
  mot_de_passe: z.string().min(6),
});
