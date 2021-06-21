import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it("should be able to authenticate user", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "user@email.com",
      password: "123456",
    });
    const token = await authenticateUserUseCase.execute({
      email: "user@email.com",
      password: "123456",
    });
    expect(token).toHaveProperty("token");
  });

  it("should not be able to authenticate nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate user with incorrect password", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User Test",
        email: "user@email.com",
        password: "123456",
      });
      await authenticateUserUseCase.execute({
        email: "user@email.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
