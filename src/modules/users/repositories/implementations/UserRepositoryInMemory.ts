import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[];

  private static INSTANCE: UserRepositoryInMemory;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserRepositoryInMemory {
    if (!UserRepositoryInMemory.INSTANCE) {
      UserRepositoryInMemory.INSTANCE = new UserRepositoryInMemory();
    }
    return UserRepositoryInMemory.INSTANCE;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async list(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}

export { UserRepositoryInMemory };
