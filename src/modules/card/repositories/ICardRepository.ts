import { ICreateCardDTO } from "../dtos/ICreateCardDTO";
import { Card } from "../entities/Card";

interface ICardRepository {
  create({
    user_id,
    number,
    cvc,
    date_validity,
    limit,
  }: ICreateCardDTO): Promise<void>;
  findByCardsofUser(user_id: string): Promise<Card[]>;
  findByCardNumber(number: number): Promise<Card>;
}

export { ICardRepository };
