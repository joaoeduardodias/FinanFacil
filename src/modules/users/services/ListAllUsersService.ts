import { User } from "../models/User";
import { IUserRepository } from "../repositories/IUserRepository";

class ListAllUsersService {
  constructor(private userRepository: IUserRepository) {}

  execute(): User[] {
    const users = this.userRepository.list();
    return users;
  }
}

export { ListAllUsersService };
