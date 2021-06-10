import { getRepository, Repository } from "typeorm";

import { Account } from "../../../account/entities/Account";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;
  private accountRepository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Transaction);
    this.accountRepository = getRepository(Account);
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
}

export { TransactionRepository };
