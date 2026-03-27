import { z } from "zod/v4";

const SpaceTypeEnum = z.enum(['OPEN_SPACE', 'BUREAU_PRIVE', 'SALLE_REUNION', 'CABINE']);

export const spaceAllSchema = z.object({
    name : z.string().min(1, "Le nom est obligatoire"),
    type: SpaceTypeEnum
});

export const spaceDetailSchama = z.object({
    id: z.string().cuid(),
    name : z.string().min(1, "Le nom est obligatoire"),
    type: SpaceTypeEnum,
    description : z.string().min(1, "La description est obligatoire"),
    capacity: z.number().min(1),
});

export type SpaceAllSchema = z.infer <typeof spaceAllSchema>;
export type SpaceDetailSchema = z.infer <typeof spaceDetailSchama>;