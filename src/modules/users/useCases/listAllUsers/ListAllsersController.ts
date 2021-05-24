import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const users = this.listAllUsersUseCase.execute();
    return response.json(users).send();
  }
}

export { ListAllsersController };
