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
          // CONCERTAR ESSE ERRO QUE DA NO THROW NEW APPERROR
          // throw new AppError("Account not exists!");
          console.log(account);
        }
        const newFunds = account.value_total - value;
        console.log(newFunds);
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
        console.log("debit in card");
        const card = await this.transactionRepository.findByCard(card_id);
        if (!card) {
          // AQUI TAMBEM GERA  O ERRO
          // throw new AppError("Card not exists!");
          console.log("tambem  da erro");
        }
        if (card.limit_available < value) {
          console.log("mesmo erro");
          // throw new AppError("Insuficient funds!");
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
          // throw new AppError("Account not exists!");
          console.log(account);
        }

        let newFunds: number;

        newFunds = Number(account.value_total);
        newFunds += value;

        console.log(newFunds);

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
        console.log("credit in card");
        const card = await this.transactionRepository.findByCard(card_id);
        if (!card) {
          console.log("erro cartao n existe");
          // throw new AppError("Card not exists!");
        }
      }
    }
  }
}

export { CreateTransactionUseCase };
