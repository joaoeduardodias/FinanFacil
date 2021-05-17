import { User } from "../infra/entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
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
  list(): User[] {
    return this.users;
  }
}

export { UserRepository };
