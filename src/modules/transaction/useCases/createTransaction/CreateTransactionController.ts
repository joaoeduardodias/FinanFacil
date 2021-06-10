import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id, card_id, type, value } = request.body;
    const { id } = request.user;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );
    createTransactionUseCase.execute({
      account_id,
      card_id,
      type,
      value,
      user_id: id,
    });

    return response.status(201).send();
  }
}

export { CreateTransactionController };
