import { UserRepository } from "../../repositories/UserRepository";
import { ListAllsersController } from "./ListAllsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

const userRepository = UserRepository.getInstance();
const listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
const listAllUsersController = new ListAllsersController(listAllUsersUseCase);

export { listAllUsersController };
