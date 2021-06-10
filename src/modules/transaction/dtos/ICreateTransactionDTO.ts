enum Operation {
  credit,
  debit,
}

interface ICreateTransactionDTO {
  user_id: string;
  type: Operation;
  value: number;
  account_id: string;
  card_id: string;
}

export { ICreateTransactionDTO };
