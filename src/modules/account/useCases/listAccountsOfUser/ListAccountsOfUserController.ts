import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAccountsOfUserUseCase } from "./ListAccountsOfUserUseCase";

class ListAccountsOfUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listAccountsOfUser = container.resolve(ListAccountsOfUserUseCase);
    const accounts = await listAccountsOfUser.execute({ user_id: id });
    return response.json(accounts).send();
  }
}

export { ListAccountsOfUserController };
