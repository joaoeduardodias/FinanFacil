import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICardRepository } from "../../repositories/ICardRepository";

interface IRequest {
  user_id: string;
  number: number;
  cvc: number;
  date_validity: string;
  limit: number;
}

@injectable()
class CreateCardUseCase {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository
  ) {}

  async execute({
    user_id,
    cvc,
    date_validity,
    limit,
    number,
  }: IRequest): Promise<void> {
    const cardAlreadyExists = await this.cardRepository.findByCardNumber(
      number
    );

    if (cardAlreadyExists) {
      throw new AppError("Card already exists!", 401);
    }

    this.cardRepository.create({
      user_id,
      cvc,
      date_validity,
      limit,
      number,
    });
  }
}

export { CreateCardUseCase };
