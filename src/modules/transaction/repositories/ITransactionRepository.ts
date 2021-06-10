import { Account } from "../../account/entities/Account";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../entities/Transaction";

interface ITransactionRepository {
  create({
    account_id,
    type,
    user_id,
    value,
    card_id,
  }: ICreateTransactionDTO): Promise<void>;
  findByTransactionOfUser(user_id: string): Promise<Transaction[]>;
}

export { ITransactionRepository };
