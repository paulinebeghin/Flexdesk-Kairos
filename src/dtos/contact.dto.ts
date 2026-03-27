import { z } from "zod"; // Correction de l'import

export const createContactSchema = z.object({
  name: z.string()
    .min(1, "Le nom est obligatoire")
    .trim(),
    
  email: z.string() // Ajout de .string() avant .email()
    .email("Format d'email invalide")
    .trim(),
    
  message: z.string()
    .min(1, "Le message est obligatoire")
    .trim(),
});

// Génère automatiquement le type TypeScript à partir du schéma
export type CreateContactDto = z.infer<typeof createContactSchema>;