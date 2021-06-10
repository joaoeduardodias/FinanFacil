import { Router } from "express";

import { accountRoutes } from "./account.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { cardRoutes } from "./card.routes";
import { transactionRoutes } from "./transaction.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use(authenticateRoutes);
router.use("/card", cardRoutes);
router.use("/account", accountRoutes);
router.use("/transaction", transactionRoutes);
export { router };
