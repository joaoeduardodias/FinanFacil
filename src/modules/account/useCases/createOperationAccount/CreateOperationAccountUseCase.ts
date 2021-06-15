import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IRequest {
  account_id: string;
  type: string;
  value: number;
}

@injectable()
class CreateOperationAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) {}

  async execute({ account_id, type, value }: IRequest): Promise<void> {
    const account = await this.accountRepository.findById(account_id);
    if (!account) {
      // throw new AppError("Account not exists!");
    }

    // console.log(type);
    // if (type === "debit") {
    //   if (account.value_total < value) {
    //     throw new AppError("Insufficient funds!");
    //   }
    //   const newFunds = account.value_total - value;
    //   console.log(newFunds);
    //   await this.accountRepository.UpdateFundsAccount({
    //     id: account.id,
    //     value_total: newFunds,
    //   });
    // }
    // if (type === "credit") {
    //   const newFunds = account.value_total + value;
    //   await this.accountRepository.UpdateFundsAccount({
    //     id: account.id,
    //     value_total: newFunds,
    //   });
    // }
  }
}

export { CreateOperationAccountUseCase };
