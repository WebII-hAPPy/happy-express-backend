import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserService } from "../services/user.service";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
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

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.email = :email", { email: email })
      .getOne();
  }

  public async createUser(request: Request): Promise<User> {
    const user: User = request.body;
    const salt: string = await this.userService.generateSalt();
    const hash: string = await this.userService.hashPassword(
      user.password,
      salt
    );
    user.salt = salt;
    user.password = hash;
    return this.userRepository.save(user);
  }
}
