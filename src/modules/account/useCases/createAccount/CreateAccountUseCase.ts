import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IRequest {
  name: string;
  user_id: string;
  value_total: number;
}

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) {}

  async execute({ name, user_id, value_total }: IRequest): Promise<void> {
    const accountAlreadyExist = await this.accountRepository.findByName(name);
    if (accountAlreadyExist) {
      throw new AppError("Account already exists!", 401);
    }

    await this.accountRepository.create({
      name,
      user_id,
      value_total,
    });
  }
}

export { CreateAccountUseCase };
