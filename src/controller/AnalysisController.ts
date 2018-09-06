import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Analysis } from "../entity/Analysis";

export class AnalysisController {
  private analysisRepository = getRepository(Analysis);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.analysisRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.analysisRepository.findOne(request.params.id);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.analysisRepository.remove(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.analysisRepository.save(request.body);
  }
}
