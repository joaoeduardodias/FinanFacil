import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { cardRoutes } from "./card.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use(authenticateRoutes);
router.use("/card", cardRoutes);
export { router };
