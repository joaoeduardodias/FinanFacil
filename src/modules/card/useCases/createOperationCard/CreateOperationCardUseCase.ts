import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICardRepository } from "../../repositories/ICardRepository";

interface IRequest {
  card_id: string;
  type: string;
  value: number;
}

@injectable()
class CreateOperationCardUseCase {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository
  ) {}

  async execute({ card_id, type, value }: IRequest): Promise<void> {
    const card = await this.cardRepository.findById(card_id);
    if (!card) {
      throw new AppError("Card not exists!");
    }
    if (type === "debit") {
      if (card.limit_available < value) {
        throw new AppError("Insufficient funds!");
      }
      const newFunds = card.limit_available - value;
      await this.cardRepository.UpdateFundsCard({
        id: card.id,
        newFunds,
      });
    }
    if (type === "credit") {
      if (card.limit_available + value < card.limit) {
        const newFunds = card.limit_available + value;
        await this.cardRepository.UpdateFundsCard({
          id: card.id,
          newFunds,
        });
      }
    }
  }
}

export { CreateOperationCardUseCase };
