import { NextFunction, Request, Response } from "express";
import { Analysis } from "../entity/Analysis";
import { User } from "../entity/User";
import { IEmotionWithTimestamp } from "../models/EmotionsWithTimestamp";
import { IResponse } from "../models/Response.model";
import { AnalysisService } from "../services/analysis.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class StatisticController {
  private authService: AuthService;
  private userService: UserService;
  private analysisService: AnalysisService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.analysisService = new AnalysisService();
  }

  /**
   * Get statistics for one specific user
   * @param request User request
   * @param response Server response
   * @param next Callback
   */
  async compose(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userService.getStatisticFromUser(
        request.params.id
      );

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
        message: `Request granted. Returning statistics for user ${user.id}.`,
        data: emotions
      };
    }
    return {
      status: 406,
      message: "Could not affirm identity."
    };
  }

  /**
   * Resets the statistics of a user
   * @param request HTTP request
   * @param response HTTP response
   * @param next Callback
   */
  public async reset(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    if (this.authService.affirmIdentity(request)) {
      const user: User = await this.userService.getStatisticFromUser(
        request.params.id
      );

      user.analyses.forEach(async (analysis: Analysis) => {
        await this.analysisService.remove(analysis);
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
