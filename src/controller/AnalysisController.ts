import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";
import { IResponse } from "../models/Response.model";
import { AuthService } from "../services/auth.service";

export class AnalysisController {
  authService: AuthService;
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
  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    const userId: number = this.authService.getIdClaim(request);
    const analysis: Analysis = await this.analysisRepository
      .createQueryBuilder("analysis")
      .select()
      .where("analysis.id = :id", { id: request.params.id })
      .innerJoinAndSelect("analysis.user", "user")
      .innerJoinAndSelect("analysis.emotion", "emotion")
      .leftJoinAndSelect("analysis.accessories", "accessories")
      .innerJoinAndSelect("analysis.makeUp", "makeUp")
      .innerJoinAndSelect("analysis.facialHair", "facialHair")
      .innerJoinAndSelect("analysis.hair", "hair")
      .leftJoinAndSelect("hair.hairColor", "hairColor")
      .getOne();

    if (userId === analysis.user.id) {
      analysis.user.password = "";
      analysis.user.salt = "";
      return {
        status: 200,
        message: "Analysis found",
        data: analysis
      };
    } else {
      return {
        status: 400,
        message: "Could not find analysis for user."
      };
    }
  }

  /**
   * Inserts a single analysis into the database
   * @param analysis analysis object
   */
  async store(analysis: Analysis): Promise<Analysis> {
    return this.analysisRepository.save(analysis);
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const analysis: Analysis = await this.analysisRepository.findOne(
      request.params.id
    );
    await this.analysisRepository.remove(analysis);
  }
}
