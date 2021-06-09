import { getRepository, Repository } from "typeorm";

import { ICreateAccountDTO } from "../../dtos/ICreateAccountDTO";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

class AccountRepository implements IAccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  async create({
    name,
    user_id,
    value_total,
  }: ICreateAccountDTO): Promise<void> {
    const account = this.repository.create({
      name,
      user_id,
      value_total,
    });
    await this.repository.save(account);
  }
  async findByAccountsOfUser(user_id: string): Promise<Account[]> {
    const accounts = await this.repository.find({ user_id });
    return accounts;
  }
  async findByName(name: string): Promise<Account> {
    const account = await this.repository.findOne({ name });
    return account;
  }
}

export { AccountRepository };
