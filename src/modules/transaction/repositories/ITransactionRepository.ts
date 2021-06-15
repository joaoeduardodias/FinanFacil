import { IUpdateFundsAccountDTO } from "../../account/dtos/IUpdateAccountDTO";
import { Account } from "../../account/entities/Account";
import { IUpdateFundsCardDTO } from "../../card/dtos/IUpdateFundsCardDTO";
import { Card } from "../../card/entities/Card";
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
  findByAccount(account_id: string): Promise<Account>;
  findByCard(card_id: string): Promise<Card>;
  UpdateFundsAccount({
    account_id,
    funds,
  }: IUpdateFundsAccountDTO): Promise<void>;
  UpdateLimitAvailableCard({
    card_id,
    newLimitAvailable,
  }: IUpdateFundsCardDTO): Promise<void>;
}

export { ITransactionRepository };
