import { z } from "zod";

export const createCategorySchema = z.object({
  nom: z.string().min(2).max(100),
  description: z.string().nonempty("Ajouter une description"),
});
