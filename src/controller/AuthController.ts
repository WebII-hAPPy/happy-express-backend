import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";
import { UserController } from "./UserController";
import { IResponse } from "../models/Response.model";

export class AuthController {
  userController: UserController;
  authService: AuthService;

  constructor() {
    this.userController = new UserController();
    this.authService = new AuthService();
  }

  public async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (!(request.body && request.body.email && request.body.password)) {
      // response
      //   .status(401)
      //   .json({ message: "Username and password are required." });
      // return null;

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
        // response.json({
        //   id: user.id,
        //   email: user.email,
        //   data: await this.authService.createToken(user.id, request)
        // });

        // return null;

        return {
          status: 200,
          data: {
            email: user.email,
            token: await this.authService.createToken(user.id, request)
          }
        };
      }
    }

    return {
      status: 422,
      message: "E-Mail / Password invalid"
    };
  }

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
      }
    }

    return {
      status: 201,
      data: user
    };

    // response.status(201).json(user);
    // return null;
  }
}
