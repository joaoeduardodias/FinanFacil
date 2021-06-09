import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

interface IPayLoad {
  sub: string;
}

export async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const auth = request.headers.authorization;
  if (!auth) {
    throw new AppError("Token missing!", 401);
  }
  const [, token] = auth.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "f3e962cfff9a6919a801e14ac05226d0"
    ) as IPayLoad;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    request.user = {
      id: user_id,
    };
    return next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
