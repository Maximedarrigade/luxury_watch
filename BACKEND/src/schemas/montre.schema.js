import { z } from "zod";

export const createMontreSchema = z.object({
  nom: z.string().min(2).max(100),
  prix: z.string().transform((val) => Number(val)),
  description: z.string().optional(),
  stock: z.string().transform((val) => Number(val)),
  categorie_id: z.string().transform((val) => Number(val)),
});
