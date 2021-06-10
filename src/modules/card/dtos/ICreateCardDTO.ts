interface ICreateCardDTO {
  user_id: string;
  number: number;
  cvc: number;
  card_validity: Date;
  date_validity: Date;
  limit: number;
  limit_available: number;
}

export { ICreateCardDTO };
