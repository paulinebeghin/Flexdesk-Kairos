import { z } from "zod/v4";

export const BookingAllSchema = z.object({
  id: z.string(),

  space: z.object({
    name: z.string(),
    type: z.enum(['OPEN_SPACE', 'BUREAU_PRIVE', 'SALLE_REUNION', 'CABINE']),
  }),
});

export const BookingDetailSchema = z.object({
  id: z.string(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  // détails de l'espace pour savoir où il a réservé
  space: z.object({
    name: z.string(),
    type: z.enum(['OPEN_SPACE', 'BUREAU_PRIVE', 'SALLE_REUNION', 'CABINE']),
  }),
});

export const BookingCreateSchema = z.object({
  // L'identifiant de la salle (le "Où")
  spaceId: z.string().cuid("ID d'espace invalide"),
  
  // La date et les heures
  date: z.coerce.date(),      // coerce transforme une string "2026-03-27" en objet Date
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
}).refine((data) => data.endTime > data.startTime, {
  message: "L'heure de fin doit être après l'heure de début",
  path: ["endTime"], // L'erreur s'affichera sur le champ endTime
});

export const BookingUpdateSchema = z.object({
    id: z.string(),
    date: z.date(),
    startTime: z.date(),
    endTime: z.date(),
 
    space: z.object({
    name: z.string(),
    type: z.enum(['OPEN_SPACE', 'BUREAU_PRIVE', 'SALLE_REUNION', 'CABINE']),
  }),
});

export type BookingAllDto = z.infer<typeof BookingAllSchema>;
export type BookingDetailDto = z.infer<typeof BookingDetailSchema>;
export type BookingCreateDto = z.infer<typeof BookingCreateSchema>;
export type BookingUpdateDto = z.infer<typeof BookingUpdateSchema>;