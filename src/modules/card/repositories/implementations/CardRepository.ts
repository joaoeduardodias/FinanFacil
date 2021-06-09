import { getRepository, Repository } from "typeorm";

import { ICreateCardDTO } from "../../dtos/ICreateCardDTO";
import { Card } from "../../entities/Card";
import { ICardRepository } from "../ICardRepository";

class CardRepository implements ICardRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Card);
  }

  async create({
    user_id,
    number,
    cvc,
    date_validity,
    limit,
  }: ICreateCardDTO): Promise<void> {
    const user = this.repository.create({
      user_id,
      number,
      cvc,
      date_validity,
      limit,
    });
    await this.repository.save(user);
  }
  async findByCardsofUser(user_id: string): Promise<Card[]> {
    const cards = await this.repository.find({ where: { user_id } });
    return cards;
  }
  async findByCardNumber(number: number): Promise<Card> {
    const card = await this.repository.findOne({ number });
    return card;
  }
}

export { CardRepository };
