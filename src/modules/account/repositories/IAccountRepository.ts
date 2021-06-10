import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { IUpdateFundsAccountDTO } from "../dtos/IUpdateAccountDTO";
import { Account } from "../entities/Account";

interface IAccountRepository {
  create({ name, user_id, value_total }: ICreateAccountDTO): Promise<void>;
  findByAccountsOfUser(user_id: string): Promise<Account[]>;
  findByName(name: string): Promise<Account>;
  findById(id: string): Promise<Account>;
  UpdateFundsAccount({
    id,
    value_total,
  }: IUpdateFundsAccountDTO): Promise<void>;
}

export { IAccountRepository };
