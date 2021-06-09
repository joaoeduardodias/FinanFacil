import { container } from "tsyringe";

import { ICardRepository } from "../../modules/card/repositories/ICardRepository";
import { CardRepository } from "../../modules/card/repositories/implementations/CardRepository";
import { UserRepository } from "../../modules/users/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICardRepository>("CardRepository", CardRepository);
