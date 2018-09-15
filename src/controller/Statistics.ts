import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";

export class StatisticController {
  private analysisRepository = getRepository(Analysis);

  async compose(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Analysis[]> {
    return this.analysisRepository
      .createQueryBuilder("analysis")
      .where(`analysis.userId = ${request.params.id}`)
      .getMany();
  }
}
