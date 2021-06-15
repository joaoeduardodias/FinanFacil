interface ICreateTransactionDTO {
  user_id: string;
  type: string;
  value: number;
  account_id: string;
  card_id: string;
}

export { ICreateTransactionDTO };
