import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";

interface IRequest {
  account_id?: string;
  card_id?: string;
  type: string;
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
    value,
    user_id,
    account_id,
    card_id,
  }: IRequest): Promise<void> {
    if (type === "debit") {
      if (account_id) {
        const account = await this.transactionRepository.findByAccount(
          account_id
        );
        if (!account) {
          throw new AppError("Account not exists!");
        }
        const newFunds = account.value_total - value;
        await this.transactionRepository.UpdateFundsAccount({
          account_id,
          funds: newFunds,
        });
        await this.transactionRepository.create({
          value,
          type,
          user_id,
          account_id,
          card_id,
        });
      }
      if (card_id) {
        const card = await this.transactionRepository.findByCard(card_id);
        if (!card) {
          throw new AppError("Card not exists!");
        }
        if (card.limit_available < value) {
          throw new AppError("Insuficient funds!");
        }
        const newLimitAvailable = card.limit_available - value;
        await this.transactionRepository.UpdateLimitAvailableCard({
          card_id,
          newLimitAvailable,
        });
        await this.transactionRepository.create({
          value,
          type,
          user_id,
          account_id,
          card_id,
        });
      }
    }
    if (type === "credit") {
      if (account_id) {
        const account = await this.transactionRepository.findByAccount(
          account_id
        );
        if (!account) {
          throw new AppError("Account not exists!");
        }

        let newFunds: number;

        newFunds = Number(account.value_total);
        newFunds += value;

        await this.transactionRepository.UpdateFundsAccount({
          account_id,
          funds: newFunds,
        });
        await this.transactionRepository.create({
          value,
          type,
          user_id,
          account_id,
          card_id,
        });
      }
      if (card_id) {
        const card = await this.transactionRepository.findByCard(card_id);
        if (!card) {
          throw new AppError("Card not exists!");
        }

        const fat = card.limit - card.limit_available;

        if (fat < value) {
          throw new AppError(
            "Operation not allowed!, try again value with a lower value"
          );
        }
        let newLimitAvailable = Number(card.limit_available);
        newLimitAvailable += value;
        card.limit_available = newLimitAvailable;
        await this.transactionRepository.UpdateLimitAvailableCard({
          card_id,
          newLimitAvailable,
        });
        await this.transactionRepository.create({
          value,
          type,
          user_id,
          account_id,
          card_id,
        });
      }
    }
  }
}

export { CreateTransactionUseCase };
