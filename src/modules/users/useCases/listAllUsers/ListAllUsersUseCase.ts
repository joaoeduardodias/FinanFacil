import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ListAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(): User[] {
    const users = this.userRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
