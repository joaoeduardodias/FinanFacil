import { getRepository, Repository } from "typeorm";

import { IUpdateFundsAccountDTO } from "../../../account/dtos/IUpdateAccountDTO";
import { Account } from "../../../account/entities/Account";
import { IUpdateFundsCardDTO } from "../../../card/dtos/IUpdateFundsCardDTO";
import { Card } from "../../../card/entities/Card";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;
  private accountRepository: Repository<Account>;
  private cardRepository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Transaction);
    this.accountRepository = getRepository(Account);
    this.cardRepository = getRepository(Card);
  }

  async create({
    account_id,
    type,
    user_id,
    value,
    card_id,
  }: ICreateTransactionDTO): Promise<void> {
    const transaction = this.repository.create({
      account_id,
      card_id,
      type,
      user_id,
      value,
    });
    await this.repository.save(transaction);
  }
  async findByTransactionOfUser(user_id: string): Promise<Transaction[]> {
    const transactions = await this.repository.find({ user_id });
    return transactions;
  }
  async findByAccount(account_id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: account_id },
    });

    return account;
  }
  async findByCard(card_id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id: card_id },
    });
    return card;
  }
  async UpdateFundsAccount({
    account_id,
    funds,
  }: IUpdateFundsAccountDTO): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: account_id },
    });
    account.value_total = funds;
    await this.accountRepository.save(account);
  }
  async UpdateLimitAvailableCard({
    card_id,
    newLimitAvailable,
  }: IUpdateFundsCardDTO): Promise<void> {
    const card = await this.cardRepository.findOne({
      where: { id: card_id },
    });
    card.limit_available = newLimitAvailable;
    await this.cardRepository.save(card);
  }
}

export { TransactionRepository };
