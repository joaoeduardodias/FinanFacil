import { Router } from "express";

import createUserController from "../modules/users/useCases/createUser";
import listAllUsersController from "../modules/users/useCases/listAllUsers";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  return createUserController().handle(request, response);
});
userRoutes.get("/", (request, response) => {
  return listAllUsersController().handle(request, response);
});

export { userRoutes };
