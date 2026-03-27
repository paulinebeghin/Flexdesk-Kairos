import { Request, Response } from "express";
import { spaceAllSchema, spaceDetailSchama } from "@/dtos/space.dto";
import * as spaceService from "../services/space.service";

export const getAllSpacesController = async (req: Request, res: Response) => {
    try {
       
        const spaces = await spaceService.getAllSpaces();

        return res.status(200).json(spaces);

    } catch (error) {
     
        console.error("Erreur getAllSpaces:", error);
        return res.status(500).json({ 
            message: "Erreur lors de la récupération des espaces", 
            error: error instanceof Error ? error.message : error 
        });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
      
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID manquant" });
        }

        const space = await spaceService.getSpacesById(req.params.id as string);

        if (!space) {
            return res.status(404).json({ message: "Espace non trouvé" });
        }

        return res.json(space);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};