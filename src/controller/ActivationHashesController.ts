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

  /**
   * creates a newe hash objects and saves it into the database
   * @param user new registered user, hash for email validation
   */
  public async createHash(user: User): Promise<ActivationHash> {
    const hash: ActivationHash = new ActivationHash();
    hash.hash = await this.authService.createHash();

    return hash;
  }

  /**
   * updates a hash
   * @param hash updated activation hash object
   */
  async update(hash: ActivationHash): Promise<ActivationHash> {
    return this.activationHashRepository.save(hash);
  }

  /**
   * finds hash in database
   * @param hash hash string
   */
  async findByHash(hash: string): Promise<ActivationHash> {
    return await this.activationHashRepository
      .createQueryBuilder("hash")
      .innerJoinAndSelect("hash.user", "user")
      .select()
      .where("hash.hash = :hash", { hash: hash })
      .getOne();
  }

  /**
   * removes hash from database
   * @param hash to be removed hash object
   */
  async removeHash(hash: ActivationHash): Promise<ActivationHash> {
    return await this.activationHashRepository.remove(hash);
  }

  async removeInactiveHash(userId: number): Promise<ActivationHash> {
    const hash: ActivationHash = await this.activationHashRepository
      .createQueryBuilder("hash")
      .innerJoinAndSelect("hash.user", "user")
      .select()
      .where("hash.user.id = :userId", { userId: userId })
      .getOne();

    if (hash) {
      return this.activationHashRepository.remove(hash);
    }
  }
}
