import { container, inject, injectable } from "tsyringe";

import { CreateOperationAccountUseCase } from "../../../account/useCases/createOperationAccount/CreateOperationAccountUseCase";
import { CreateOperationCardUseCase } from "../../../card/useCases/createOperationCard/CreateOperationCardUseCase";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";

enum Operation {
  credit,
  debit,
}

interface IRequest {
  account_id?: string;
  card_id?: string;
  type: Operation;
  value: number;
  user_id: string;
}

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository
  ) {}

  async execute({
    type,
    user_id,
    value,
    account_id,
    card_id,
  }: IRequest): Promise<void> {
    if (account_id) {
      const createOperationAccount = container.resolve(
        CreateOperationAccountUseCase
      );
      createOperationAccount.execute({ account_id, type, value });
    } else {
      const createOperationCard = container.resolve(CreateOperationCardUseCase);
      createOperationCard.execute({ card_id, type, value });
    }

    await this.transactionRepository.create({
      type,
      user_id,
      value,
      account_id,
      card_id,
    });
  }
}

export { CreateTransactionUseCase };
