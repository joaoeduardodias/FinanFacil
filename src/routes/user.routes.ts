import { Router } from "express";

import { UserRepository } from "../repositories/UserRepository";

const userRoutes = Router();

const userRepository = new UserRepository();

userRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;
  const userAlreadyExist = userRepository.findByEmail(email);
  if (userAlreadyExist) {
    return response.status(400).json({ error: "User already exists!" });
  }
  userRepository.create({ name, email, password });
  return response.status(201).send();
});
userRoutes.get("/", (request, response) => {
  const users = userRepository.list();
  return response.json(users).send();
});

export { userRoutes };
