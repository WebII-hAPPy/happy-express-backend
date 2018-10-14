import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";
import { IResponse } from "../models/Response.model";

export class StatisticController {
  authService: AuthService;
  private userRepository = getRepository(User, process.env.NODE_ENV);

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async compose(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: request.params.id })
        .select()
        .leftJoinAndSelect("user.analyses", "analyses")
        .getOne();

      return {
        status: 200,
        message: `Request granted. Returning statistics for user ${user.id}`,
        data: user.analyses
      };
    }
    return {
      status: 406,
      message: "Could not affirm identity"
    };
  }
}
