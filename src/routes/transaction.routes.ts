import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateTransactionController } from "../modules/transaction/useCases/createTransaction/CreateTransactionController";

const createTransactionController = new CreateTransactionController();

const transactionRoutes = Router();

transactionRoutes.post(
  "/",
  EnsureAuthenticated,
  createTransactionController.handle
);

export { transactionRoutes };
