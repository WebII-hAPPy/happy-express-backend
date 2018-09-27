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

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User> {
    return this.userRepository.findOne(request.params.id);
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.userRepository.save(request.body);
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.userRepository.remove(request.params.id);
  }

  /**
   * Find user by email
   * @param email user email
   */
  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.email = :email", { email: email })
      .getOne();
  }

  /**
   * Create a user.
   * @param request user request
   */
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
