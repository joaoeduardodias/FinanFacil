import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { Account } from "../entities/Account";

interface IAccountRepository {
  create({ name, user_id, value_total }: ICreateAccountDTO): Promise<void>;
  findByAccountsOfUser(user_id: string): Promise<Account[]>;
  findByName(name: string): Promise<Account>;
}

export { IAccountRepository };
