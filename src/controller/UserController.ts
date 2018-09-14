import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserController {
  private userRepository = getRepository(User);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User> {
    return this.userRepository.findOne(request.params.id);
  }

  public authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: request.body.email })
      .getOne()
      .then((user: User) => {
        if (
          user === undefined ||
          !bcrypt.compareSync(request.body.password, user.password)
        ) {
          response.json({
            status: "error",
            message: "E-Mail / Password invalid",
            data: null
          });
        } else {
          const token: string = jwt.sign(
            { id: user.id },
            request.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          response.json({
            status: "error",
            message: "authentication successful",
            data: { user: user, token: token }
          });
        }
      });
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.userRepository.save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.userRepository.remove(request.params.id);
  }
}
