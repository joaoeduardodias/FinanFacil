import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ListAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
