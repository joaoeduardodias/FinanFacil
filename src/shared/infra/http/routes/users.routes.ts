import { Router } from "express";

import { User } from "../../../../modules/users/infra/entities/User";

const userRoutes = Router();
const users: User[] = [];

userRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;

  const user = new User();
  Object.assign(user, {
    name,
    email,
    password,
    created_at: new Date(),
  });

  users.push(user);
  return response.status(201).json(user);
});
userRoutes.get("/", (request, response) => {
  return response.json(users).send();
});

export { userRoutes };
