interface ICreateCardDTO {
  user_id: string;
  number: number;
  cvc: number;
  date_validity: string;
  limit: number;
}

export { ICreateCardDTO };
