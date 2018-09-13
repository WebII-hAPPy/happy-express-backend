import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Analysis } from '../entity/Analysis';

export class AnalysisController {
  private analysisRepository = getRepository(Analysis);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Analysis[]> {
    return this.analysisRepository.find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Analysis> {
    return this.analysisRepository.findOne(request.params.id);
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.analysisRepository.save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.analysisRepository.remove(request.params.id);
  }

  async query(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.analysisRepository.createQueryBuilder('analysis');
    // .where(`analysis.uuid = ${request.params.imageName}`)
    // .andWhere(`analysis.user.id = ${request.body.userId}`);
  }
}
