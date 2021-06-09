import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, value_total } = request.body;
    const { id } = request.user;

    const createAccountUseCase = container.resolve(CreateAccountUseCase);

    await createAccountUseCase.execute({ name, value_total, user_id: id });

    return response.status(201).send();
  }
}

export { CreateAccountController };
