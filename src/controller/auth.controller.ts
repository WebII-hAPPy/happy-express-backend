import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";
import { UserController } from "./UserController";

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
  ): Promise<Response> {
    if (!(request.body && request.body.email && request.body.password)) {
      response
        .status(401)
        .json({ message: "Username and password are required." });
      return null;
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
        response.json({
          id: user.id,
          email: user.email,
          data: await this.authService.createToken(user.id, request)
        });

        return null;
      }
    }

    response.status(422).json({ message: "E-Mail / Password invalid" });
    return null;
  }

  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    if (!(request.body && request.body.email && request.body.password)) {
      response
        .status(401)
        .json({ message: "Username and password are required." });

      return null;
    }

    let user: User = await this.userController.getUserByEmail(
      request.body.email
    );

    if (user) {
      response.status(409).json({
        message: "This E-Mail is already registered"
      });
      return null;
    } else {
      user = await this.userController.createUser(request);
      if (user) {
        user.password = "";
      }
    }

    response.json(user);
    return null;
  }
}
