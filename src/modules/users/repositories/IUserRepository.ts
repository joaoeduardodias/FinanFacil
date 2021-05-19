import { User } from "../models/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUserRepository {
  create({ name, email, password }: ICreateUserDTO): void;
  list(): User[];
  findByEmail(email: string): User;
}

export { IUserRepository, ICreateUserDTO };
