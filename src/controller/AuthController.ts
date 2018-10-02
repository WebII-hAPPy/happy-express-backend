import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";
import { UserController } from "./UserController";
import { IResponse } from "../models/Response.model";
import { ActivationHash } from "../entity/ActivationHash";
import { ActivationHashController } from "./ActivationHashesController";
import { MailService } from "../services/email.service";

export class AuthController {
  userController: UserController;
  authService: AuthService;
  hashController: ActivationHashController;
  emailService: MailService;

  constructor() {
    this.userController = new UserController();
    this.authService = new AuthService();
    this.hashController = new ActivationHashController();
    this.emailService = new MailService();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  public async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (!(request.body && request.body.email && request.body.password)) {
      return {
        status: 401,
        message: "Username and password are required."
      };
    }

    const user: User = await this.userController.getUserByEmail(
      request.body.email
    );

    if (user) {
      if (
        await this.authService.checkCredentials(
          request.body.password,
          user.password
        )
      ) {
        user.password = "";
        user.salt = "";
        return {
          status: 200,
          data: {
            user: user,
            token: await this.authService.createToken(user)
          }
        };
      }
    }

    return {
      status: 422,
      message: "E-Mail / Password invalid"
    };
  }

  /**
   * Registration authentication
   * @param request User request
   * @param response Server Response
   * @param next callback
   */
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (!(request.body && request.body.email && request.body.password)) {
      return {
        status: 401,
        message: "Username and password are required."
      };
    }

    let user: User = await this.userController.getUserByEmail(
      request.body.email
    );

    if (user) {
      return {
        status: 409,
        message: "This E-Mail is already registered"
      };
    } else {
      user = await this.userController.createUser(request);
      if (user) {
        user.password = "";
        user.salt = "";
      }
    }

    this.hashController.createHash(user).then();

    return {
      status: 201,
      data: {
        user: user,
        token: await this.authService.createToken(user)
      }
    };
  }

  public async verifyAccount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (request.params && request.params.hash) {
      const hash: ActivationHash = await this.hashController.findHash(
        request.params.hash
      );
      if (hash) {
        const user: User = hash.user;
        this.hashController.removeHash(hash);
        user.active = true;
        this.userController.update(user);
        user.password = "";
        user.salt = "";
        return {
          status: 204,
          message: "User successfully activated",
          data: {
            user: user
          }
        };
      }
    }
    return {
      status: 404,
      message: "Activation link invalid or expired"
    };
  }

  public async fuck(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    this.emailService.test();
  }
}
