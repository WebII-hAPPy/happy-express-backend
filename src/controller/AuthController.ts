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
      if (!user.active) {
        return {
          status: 403,
          message: "User not verified"
        };
      }

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
   * @param request http request
   * @param response htpp Response
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

      const isVerification: boolean = true;
      const hash: ActivationHash = await this.hashController.createHash(user);
      this.emailService.send(user.email, user.name, isVerification, hash.hash);

      if (user) {
        user.password = "";
        user.salt = "";
      }
    }

    return {
      status: 201,
      data: {
        user: user
      }
    };
  }

  /**
   * Checks verification link against db and activates user if valid
   * @param request http request
   * @param response http response
   * @param next callback
   */
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
        const user: User = await this.userController.getUserById(hash.userId);
        this.hashController.removeHash(hash);
        user.active = true;
        this.userController.update(user);
        user.password = "";
        user.salt = "";
        this.hashController.removeHash(hash);
        return {
          // status: 204,
          // message: "User successfully activated",
          // data: {
          //   user: user,
          //   token: await this.authService.createToken(user)
          // }
          status: 200,
          message: "User successfully activated",
          data: {
            user: user,
            token: await this.authService.createToken(user)
          }
        };
      }
      return {
        status: 404,
        message: "Activation link invalid or expired"
      };
    }
    return {
      status: 404,
      message: "Activation link invalid"
    };
  }
}
