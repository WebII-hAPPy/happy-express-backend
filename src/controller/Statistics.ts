import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Statistic } from "../entity/Statistic";

export class StatisticController {
  private statisticRepository = getRepository(Statistic);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.statisticRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.statisticRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.statisticRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.statisticRepository.remove(request.params.id);
  }
}
