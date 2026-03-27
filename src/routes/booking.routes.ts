import { authMiddleware } from "@/middleware/auht.middleware";
import express from "express";
import * as bookingController from "../controlleur/booking.controller"

export const routerBooking: express.Router = express.Router();

routerBooking.get("/", bookingController.getAllBookingController);
routerBooking.get("/:id", bookingController.getBookingById);
routerBooking.post("/", bookingController.create);
routerBooking.put("/:id", bookingController.update);
routerBooking.delete("/:id", bookingController.remove);

export default routerBooking;