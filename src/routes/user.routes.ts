import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  createUserController.handle(request, response);
});
userRoutes.get("/", (request, response) => {
  listAllUsersController.handle(request, response);
});

export { userRoutes };
