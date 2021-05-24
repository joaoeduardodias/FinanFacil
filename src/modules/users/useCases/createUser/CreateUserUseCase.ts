import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute({ name, email, password }: IRequest): void {
    const userAlreadyExist = this.userRepository.findByEmail(email);
    if (userAlreadyExist) {
      throw new Error("User already exists !");
    }
    this.userRepository.create({ name, email, password });
  }
}

export { CreateUserUseCase };
