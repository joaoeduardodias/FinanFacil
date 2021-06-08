import { ICreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
