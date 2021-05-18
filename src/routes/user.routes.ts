import { Router } from "express";

import { UserRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/CreateUserService";
import { ListAllUsersService } from "../services/ListAllUsersService";

const userRoutes = Router();

const userRepository = new UserRepository();

userRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService(userRepository);
  createUserService.execute({ name, email, password });
  return response.status(201).send();
});
userRoutes.get("/", (request, response) => {
  const listAllUserservice = new ListAllUsersService(userRepository);
  const users = listAllUserservice.execute();
  return response.json(users).send();
});

export { userRoutes };
