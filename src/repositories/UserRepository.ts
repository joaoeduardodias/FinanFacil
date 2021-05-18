import { User } from "../models/User";
import { ICreateUserDTO, IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }

  create({ name, email, password }: ICreateUserDTO): void {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
    });

    this.users.push(user);
  }
  findByEmail(email: string): User {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  list(): User[] {
    return this.users;
  }
}

export { UserRepository };
