import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

class ListAllUsersService {
  constructor(private userRepository: UserRepository) {}

  execute(): User[] {
    const users = this.userRepository.list();
    return users;
  }
}

export { ListAllUsersService };
