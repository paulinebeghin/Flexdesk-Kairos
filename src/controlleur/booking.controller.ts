import { Request, Response } from "express";
import { BookingAllSchema, BookingCreateSchema, BookingUpdateSchema, BookingDetailSchema } from "@/dtos/booking.dto";
import * as bookingService from "../services/booking.service"

export const getAllBookingController = async (req: Request, res: Response) => {
    try {
       
        const spaces = await bookingService.getAllBooking();

        return res.status(200).json(spaces);

    } catch (error) {
     
        console.error("Erreur getAllBooking:", error);
        return res.status(500).json({ 
            message: "Erreur lors de la récupération des reservations", 
            error: error instanceof Error ? error.message : error 
        });
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
      
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID manquant" });
        }

        const space = await bookingService.getBookingById(req.params.id as string);

        if (!space) {
            return res.status(404).json({ message: "Reservation non trouvé" });
        }

        return res.json(space);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = BookingCreateSchema.safeParse(req.body);
        
        if (!parsed.success) {
            return res.status(400).json({
                message: "Données invalides", 
                errors: parsed.error.issues 
            });
        }

        const newBooking = await bookingService.createBooking(parsed.data, req.userId!);

        return res.status(201).json(newBooking);

    } catch (error) {
        console.error("Erreur création réservation:", error);
        return res.status(500).json({ message: "Erreur serveur", error });    
    };
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = BookingUpdateSchema.safeParse(req.body);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID manquant dans l'URL" });
        }

        if (!parsed.success) {
            return res.status(400).json({ 
                message: "Données invalides", 
                errors: parsed.error.issues 
            });
        }

       
        const note = await bookingService.updateBooking(
            parsed.data, 
            req.userId!, 
            id as string 
        );

        if (!note) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }  

        return res.json(note); 
    } catch (error) {
       return res.status(500).json({ message: "Erreur serveur", error }); 
    }
};

export const remove = async (req : Request, res : Response) => {
    try {
        const result = await bookingService.getBookingById(req.params.id as string);
        if(!result){
           return res.status(404).json({message : "Note not found"}); 
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    }
}