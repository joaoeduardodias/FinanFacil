import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICardRepository } from "../../repositories/ICardRepository";

interface IRequest {
  user_id: string;
  number: number;
  cvc: number;
  date_validity: Date;
  card_validity: Date;
  limit: number;
  limit_available: number;
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
    card_validity,
    limit,
    limit_available,
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
      card_validity,
      limit,
      limit_available,
      number,
    });
  }
}

export { CreateCardUseCase };
