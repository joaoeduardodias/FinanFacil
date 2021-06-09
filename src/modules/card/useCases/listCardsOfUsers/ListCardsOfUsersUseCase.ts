import { inject, injectable } from "tsyringe";

import { Card } from "../../entities/Card";
import { ICardRepository } from "../../repositories/ICardRepository";

@injectable()
class ListCardsOfUsersUseCase {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository
  ) {}

  async execute(user_id: string): Promise<Card[]> {
    const cards = await this.cardRepository.findByCardsofUser(user_id);
    return cards;
  }
}

export { ListCardsOfUsersUseCase };
