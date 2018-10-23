import { AuthService } from "./auth.service";
import { ActivationHash } from "../entity/ActivationHash";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class ActivationHashService {
  private activationHashRepository = getRepository(
    ActivationHash,
    process.env.NODE_ENV
  );
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Creates a new hash object and saves it into the database
   * @param user New registered user, hash for E-Mail validation
   */
  public async createHash(user: User): Promise<ActivationHash> {
    const hash: ActivationHash = new ActivationHash();
    hash.hash = await this.authService.createHash(256);
    return hash;
  }

  /**
   * Updates a hash
   * @param hash Updated activation hash object
   */
  public async update(hash: ActivationHash): Promise<ActivationHash> {
    return this.activationHashRepository.save(hash);
  }

  /**
   * Finds hash in database
   * @param hash Hash string
   */
  public async findByHash(hash: string): Promise<ActivationHash> {
    return await this.activationHashRepository
      .createQueryBuilder("hash")
      .innerJoinAndSelect("hash.user", "user")
      .select()
      .where("hash.hash = :hash", { hash: hash })
      .getOne();
  }

  /**
   * Removes hash from database
   * @param hash To be removed hash object
   */
  public async removeHash(hash: ActivationHash): Promise<ActivationHash> {
    return await this.activationHashRepository.remove(hash);
  }

  /**
   * Removes inactive hashes
   * @param userId The user identification number
   */
  public async removeInactiveHash(userId: number): Promise<ActivationHash> {
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
