import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCardUseCase } from "./CreateCardUseCase";

class CreateCardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cvc, date_validity, limit, number } = request.body;
    const { id } = request.user;
    const createCardUseCase = container.resolve(CreateCardUseCase);
    await createCardUseCase.execute({
      user_id: id,
      cvc,
      date_validity,
      limit,
      number,
    });
    return response.status(201).send();
  }
}

export { CreateCardController };
