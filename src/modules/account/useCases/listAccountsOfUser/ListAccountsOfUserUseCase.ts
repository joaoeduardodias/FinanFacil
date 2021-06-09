import { inject, injectable } from "tsyringe";

import { Account } from "../../entities/Account";
import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListAccountsOfUserUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) {}
  async execute({ user_id }: IRequest): Promise<Account[]> {
    const accounts = this.accountRepository.findByAccountsOfUser(user_id);
    return accounts;
  }
}

export { ListAccountsOfUserUseCase };
