import { authMiddleware } from "@/middleware/auht.middleware";
import express from "express";
import * as spaceController from "../controlleur/space.controller"

const routerSpace: express.Router = express.Router();

routerSpace.get("/", spaceController.getAllSpacesController);
routerSpace.get("/:id", spaceController.getById);

export default routerSpace