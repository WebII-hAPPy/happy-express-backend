import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { IResponse } from "../models/Response.model";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { ActivationHashController } from "./ActivationHashesController";

export class UserController {
  userService: UserService;
  authService: AuthService;
  hashController: ActivationHashController;
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
    this.hashController = new ActivationHashController();
  }
  private userRepository = getRepository(User, process.env.NODE_ENV);

  async deleteAccount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userRepository.findOne(request.params.id);
      if (user === undefined || user === null) {
        return {
          status: 404,
          message: "Could not find User in database"
        };
      }

      if (!user.active) {
        this.hashController.removeInactiveHash(user.id).then();
      }

      const deleted: User = await this.userRepository.remove(user);
      if (deleted !== null || deleted !== undefined) {
        return {
          status: 200,
          message: "User successfully deleted",
          data: { deletedUser: deleted }
        };
      }
      return {
        status: 500,
        message: "Could not delete User"
      };
    }
    return {
      status: 401,
      message: "Could not affirm identity"
    };
  }

  /**
   * updates a user resource
   * @param user a user
   */
  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
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
   * Find user by id
   * @param id user id
   */
  public async getUserById(id: number): Promise<User> {
    return this.userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.id = :id", { id: id })
      .getOne();
  }

  /**
   * Creates user resource
   * @param request http request
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

  public async changeName(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      let user: User = await this.getUserById(request.params.id);
      if (user) {
        user.name = request.body.name;
        user = await this.update(user);
        user.password = "";
        user.salt = "";
        console.log(request);
        
        console.log(user);
        return {
          status: 200,
          message: "Name changed successfully",
          data: user
        };
      }
      return {
        status: 404,
        message: "Could not find user in database"
      };
    }
    return {
      status: 401,
      message: "Could not affirm identity"
    };
  }
}
