import { ICreateCardDTO } from "../dtos/ICreateCardDTO";
import { IUpdateFundsCardDTO } from "../dtos/IUpdateFundsCardDTO";
import { Card } from "../entities/Card";

interface ICardRepository {
  create({
    user_id,
    number,
    cvc,
    date_validity,
    card_validity,
    limit,
    limit_available,
  }: ICreateCardDTO): Promise<void>;
  findByCardsofUser(user_id: string): Promise<Card[]>;
  findByCardNumber(number: number): Promise<Card>;
  findById(id: string): Promise<Card>;
  UpdateFundsCard({ id, newFunds }: IUpdateFundsCardDTO): Promise<void>;
}

export { ICardRepository };
