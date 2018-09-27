import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";

export class AnalysisController {
  private analysisRepository = getRepository(Analysis);

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
  ): Promise<Analysis> {
    return this.analysisRepository.findOne(request.params.id);
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
