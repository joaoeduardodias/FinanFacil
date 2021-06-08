import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listAllUsersUseCase.execute();
    return response.json(users).send();
  }
}

export { ListAllsersController };
