import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCardsOfUsersUseCase } from "./ListCardsOfUsersUseCase";

class ListCardsOfUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listCardsOfUsers = container.resolve(ListCardsOfUsersUseCase);
    const cards = await listCardsOfUsers.execute(id);
    return response.json(cards).send();
  }
}

export { ListCardsOfUsersController };
