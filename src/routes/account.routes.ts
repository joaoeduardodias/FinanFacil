import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateAccountController } from "../modules/account/useCases/createAccount/CreateAccountController";
import { ListAccountsOfUserController } from "../modules/account/useCases/listAccountsOfUser/ListAccountsOfUserController";

const createAccountController = new CreateAccountController();
const listAccountsOfUserController = new ListAccountsOfUserController();

const accountRoutes = Router();

accountRoutes.post("/", EnsureAuthenticated, createAccountController.handle);
accountRoutes.get(
  "/",
  EnsureAuthenticated,
  listAccountsOfUserController.handle
);

export { accountRoutes };
