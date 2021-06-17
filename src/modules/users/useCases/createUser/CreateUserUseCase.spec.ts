import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "User Test",
      email: "userTest@email.com",
      password: "123456",
    };
    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    const userCreated = await userRepository.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id");
  });
  it("should not be able to create a new user with same name", () => {
    expect(async () => {
      const user = {
        name: "User Test",
        email: "userTest@email.com",
        password: "123456",
      };
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
