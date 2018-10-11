import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";
import { IAnalysis } from "../models/Analysis";
import { AuthService } from "../services/auth.service";
import { IResponse } from "../models/Response.model";

export class AnalysisController {
  authService: AuthService;

  private analysisRepository = getRepository(Analysis);

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Analysis[]> {
    return this.analysisRepository.find();
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
      .innerJoinAndSelect("analysis.user", "user")
      .innerJoinAndSelect("analysis.emotion", "emotion")
      .leftJoinAndSelect("analysis.accessories", "accessories")
      .innerJoinAndSelect("analysis.makeUp", "makeUp")
      .innerJoinAndSelect("analysis.facialHair", "facialHair")
      .innerJoinAndSelect("analysis.hair", "hair")
      .leftJoinAndSelect("hair.hairColor", "hairColor")
      .select()
      .where("analysis.id = :id", { id: request.params.id })
      .getOne();

    if (userId === analysis.user.id) {
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
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.analysisRepository.save(request.body);
  }

  /**
   * Inserts a single analysis into the database
   * @param analysis accepts objects that implement the IAnalysis interface
   */
  async create(analysis: IAnalysis): Promise<any> {
    return this.analysisRepository.save(analysis);
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
    await this.analysisRepository.remove(request.params.id);
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async query(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.analysisRepository.createQueryBuilder("analysis");
    // .where(`analysis.uuid = ${request.params.imageName}`)
    // .andWhere(`analysis.user.id = ${request.body.userId}`);
  }
}
