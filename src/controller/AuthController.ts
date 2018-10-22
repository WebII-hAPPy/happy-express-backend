import { NextFunction, Request, Response } from "express";
import { ActivationHash } from "../entity/ActivationHash";
import { User } from "../entity/User";
import { IResponse } from "../models/Response.model";
import { ActivationHashService } from "../services/activationHash.service";
import { AuthService } from "../services/auth.service";
import { MailService } from "../services/email.service";
import { UserService } from "../services/user.service";

export class AuthController {
  private userService: UserService;
  private activationHashService: ActivationHashService;
  private authService: AuthService;
  private emailService: MailService;

  constructor() {
    this.userService = new UserService();
    this.activationHashService = new ActivationHashService();
    this.authService = new AuthService();
    this.emailService = new MailService();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next Callback
   */
  public async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (!(request.body && request.body.email && request.body.password)) {
      return {
        status: 401,
        message: "E-Mail and password are required."
      };
    }

    const user: User = await this.userService.getUserByEmail(
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
      message: "E-Mail / Password invalid."
    };
  }

  /**
   * Registration authentication
   * @param request HTTP request
   * @param response HTTP Response
   * @param next Callback
   */
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (!(request.body && request.body.email && request.body.password)) {
      return {
        status: 401,
        message: "E-Mail and password are required."
      };
    }

    let user: User = await this.userService.getUserByEmail(request.body.email);

    if (user) {
      return {
        status: 409,
        message: "This E-Mail is already registered."
      };
    } else {
      user = await this.userService.createUser(request);

      const isVerification: boolean = true;
      let hash: ActivationHash = await this.activationHashService.createHash(
        user
      );
      hash.user = user;
      hash = await this.activationHashService.update(hash);
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
   * Checks verification link against database and activates user if valid
   * @param request HTTP request
   * @param response HTTP response
   * @param next Callback
   */
  public async verifyAccount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    let hash: ActivationHash = await this.activationHashService.findByHash(
      request.params.hash
    );

    if (hash) {
      let user: User = hash.user;
      user.active = true;
      user = await this.userService.update(user);
      hash = await this.activationHashService.removeHash(hash);

      return {
        status: 200,
        message: "User successfully activated.",
        data: {
          user: user,
          token: await this.authService.createToken(user)
        }
      };
    }

    return {
      status: 404,
      message: "Activation link invalid or expired."
    };
  }

  /**
   * Checks if a jwt token is valid
   * @param request HTTP request
   * @param response HTTP response
   * @param next Callback
   */
  public async isTokenClaimValid(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    const userId: number = this.authService.getIdClaim(request);

    const user: User = await this.userService.getUserById(userId);

    if (user !== undefined && user !== null) {
      user.password = "";
      user.salt = "";
      return {
        status: 200,
        message: "User exist.",
        data: user
      };
    }
    return {
      status: 404,
      message: "User does not exist."
    };
  }
}
