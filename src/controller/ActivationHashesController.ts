import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { ActivationHash } from "../entity/ActivationHash";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.service";

export class ActivationHashController {
  authService: AuthService;
  private activationHashRepository = getRepository(
    ActivationHash,
    process.env.NODE_ENV
  );

  constructor() {
    this.authService = new AuthService();
  }

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ActivationHash[]> {
    return this.activationHashRepository.find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ActivationHash> {
    return this.activationHashRepository.findOne(request.params.id);
  }

  public async findHash(hash: string): Promise<ActivationHash> {
    return this.activationHashRepository
      .createQueryBuilder("hash")
      .select()
      .where("hash.hash = :hash", { hash: hash })
      .getOne();
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ActivationHash> {
    return this.activationHashRepository.save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.activationHashRepository.remove(request.params.id);
  }

  async removeHash(hash: ActivationHash): Promise<void> {
    await this.activationHashRepository.remove(hash);
  }

  async query(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.activationHashRepository.createQueryBuilder("analysis");
    // .where(`analysis.uuid = ${request.params.imageName}`)
    // .andWhere(`analysis.user.id = ${request.body.userId}`);
  }

  public async createHash(user: User): Promise<ActivationHash> {
    const hash: ActivationHash = new ActivationHash();
    hash.hash = await this.authService.createHash();
    hash.userId = user.id;

    return this.activationHashRepository.save(hash);
  }
}
