import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCardController } from "../modules/card/useCases/createCard/CreateCardController";
import { ListCardsOfUsersController } from "../modules/card/useCases/listCardsOfUsers/ListCardsOfUsersController";

const cardRoutes = Router();

const createCardController = new CreateCardController();
const listCardsOfUsersController = new ListCardsOfUsersController();

cardRoutes.post("/", EnsureAuthenticated, createCardController.handle);
cardRoutes.get("/", EnsureAuthenticated, listCardsOfUsersController.handle);

export { cardRoutes };
