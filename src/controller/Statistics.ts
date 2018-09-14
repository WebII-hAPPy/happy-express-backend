import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Statistic } from "../entity/Statistic";
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

  // async all(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<Statistic[]> {
  //   return this.statisticRepository.find();
  // }

  // async one(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<Statistic> {
  //   return this.statisticRepository.findOne(request.params.id);
  // }

  // async save(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<any> {
  //   return this.statisticRepository.save(request.body);
  // }

  // async remove(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   await this.statisticRepository.remove(request.params.id);
  // }
}
