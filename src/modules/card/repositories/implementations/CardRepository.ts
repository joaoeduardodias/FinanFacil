import { getRepository, Repository } from "typeorm";

import { ICreateCardDTO } from "../../dtos/ICreateCardDTO";
import { IUpdateFundsCardDTO } from "../../dtos/IUpdateFundsCardDTO";
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
    card_validity,
    limit,
    limit_available,
  }: ICreateCardDTO): Promise<void> {
    const user = this.repository.create({
      user_id,
      number,
      cvc,
      date_validity,
      card_validity,
      limit,
      limit_available,
    });
    await this.repository.save(user);
  }
  async findByCardsofUser(user_id: string): Promise<Card[]> {
    const cards = await this.repository.find({ user_id });
    return cards;
  }
  async findByCardNumber(number: number): Promise<Card> {
    const card = await this.repository.findOne({ number });
    return card;
  }
  async findById(id: string): Promise<Card> {
    const card = await this.repository.findOne(id);
    return card;
  }
  async UpdateFundsCard({ id, newFunds }: IUpdateFundsCardDTO): Promise<void> {
    const card = await this.repository.findOne(id);
    card.limit_available = newFunds;
    await this.repository.save(card);
  }
}

export { CardRepository };
