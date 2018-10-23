import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { IResponse } from "../models/Response.model";
import { ActivationHashService } from "../services/activationHash.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class UserController {
  private activationHashService: ActivationHashService;
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.activationHashService = new ActivationHashService();
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  /**
   * Changes the name of a user account
   * @param request HTTP request
   * @param response HTTP response
   * @param next Callback
   */
  public async changeName(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      let user: User = await this.userService.getUserById(request.params.id);

      if (user) {
        user.name = request.body.name;
        user = await this.userService.update(user);
        user.password = "";
        user.salt = "";
        return {
          status: 200,
          message: "Name changed successfully.",
          data: user
        };
      }
      return {
        status: 404,
        message: "Could not find user in database."
      };
    }
    return {
      status: 401,
      message: "Could not affirm identity."
    };
  }

  /**
   * Deletes a user account
   * @param request HTTP request
   * @param response HTTP response
   * @param next Callback
   */
  async deleteAccount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userService.getUserById(request.params.id);

      if (user === undefined || user === null) {
        return {
          status: 404,
          message: "Could not find User in database"
        };
      }

      if (!user.active) {
        await this.activationHashService.removeInactiveHash(user.id);
      }

      const deleted: User = await this.userService.deleteUser(user);

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
}
