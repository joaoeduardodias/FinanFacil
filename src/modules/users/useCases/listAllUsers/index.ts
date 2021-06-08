import { UserRepository } from "../../repositories/implementations/UserRepository";
import { ListAllsersController } from "./ListAllsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export default (): ListAllsersController => {
  const userRepository = new UserRepository();
  const listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  const listAllUsersController = new ListAllsersController(listAllUsersUseCase);
  return listAllUsersController;
};
