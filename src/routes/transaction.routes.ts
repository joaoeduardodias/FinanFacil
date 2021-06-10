import { Router } from "express";

import { CreateTransactionController } from "../modules/transaction/useCases/createTransaction/CreateTransactionController";

const createTransactionController = new CreateTransactionController();

const transactionRoutes = Router();

transactionRoutes.post("/", createTransactionController.handle);

export { transactionRoutes };
