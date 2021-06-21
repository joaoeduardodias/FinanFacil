import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

let userRepository: UserRepositoryInMemory;
let listAllUsersUseCase: ListAllUsersUseCase;

describe("List all users", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  });

  it("should be able to list all users", async () => {
    const user = await userRepository.create({
      name: "User test",
      email: "user@email.com",
      password: "123456",
    });
    // await userRepository.create({
    //   name: "User test 2",
    //   email: "user2@email.com",
    //   password: "123456",
    // });

    const users = await listAllUsersUseCase.execute();
    expect(users).toEqual([user]);
  });
});
