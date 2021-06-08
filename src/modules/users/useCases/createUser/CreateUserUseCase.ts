import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);
    if (userAlreadyExist) {
      throw new Error("User already exists !");
    }
    const passwordHash = await hash(password, 8);
    this.userRepository.create({ name, email, password: passwordHash });
  }
}

export { CreateUserUseCase };
