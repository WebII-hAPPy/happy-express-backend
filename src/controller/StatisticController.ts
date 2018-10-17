import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";
import { IResponse } from "../models/Response.model";
import { IEmotionWithTimestamp } from "../models/EmotionsWithTimestamp";
import { AnalysisController } from "./AnalysisController";

export class StatisticController {
  authService: AuthService;
  private userRepository = getRepository(User, process.env.NODE_ENV);
  private analysisRepository = getRepository(Analysis, process.env.NODE_ENV);

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
        .leftJoinAndSelect("user.analyses", "analysis")
        .innerJoinAndSelect("analysis.emotion", "emotion")
        .getOne();

      let emotions: IEmotionWithTimestamp[] = [];

      user.analyses.forEach((analysis: Analysis) => {
        const emotion: IEmotionWithTimestamp = {
          id: analysis.emotion.id,
          timestamp: analysis.time,
          emotions: {
            sadness: analysis.emotion.sadness,
            anger: analysis.emotion.anger,
            disgust: analysis.emotion.disgust,
            fear: analysis.emotion.fear,
            contempt: analysis.emotion.contempt,
            neutral: analysis.emotion.neutral,
            surprise: analysis.emotion.surprise,
            happiness: analysis.emotion.happiness
          }
        };
        emotions.push(emotion);
      });

      return {
        status: 200,
        message: `Request granted. Returning statistics for user ${user.id}`,
        data: emotions
      };
    }
    return {
      status: 406,
      message: "Could not affirm identity"
    };
  }

  public async reset(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: request.params.id })
        .select()
        .leftJoinAndSelect("user.analyses", "analysis")
        .innerJoinAndSelect("analysis.emotion", "emotion")
        .getOne();

      user.analyses.forEach(async (analysis: Analysis) => {
        await this.analysisRepository.remove(analysis);
      });

      return {
        status: 200,
        message: "Successfully removed statistics"
      };
    }
    return {
      status: 406,
      message: "Could not affirm identity"
    };
  }
}
