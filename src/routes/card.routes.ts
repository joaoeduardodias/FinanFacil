import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCardController } from "../modules/card/useCases/createCard/CreateCardController";

const cardRoutes = Router();

const createCardController = new CreateCardController();

cardRoutes.post("/", EnsureAuthenticated, createCardController.handle);

export { cardRoutes };
