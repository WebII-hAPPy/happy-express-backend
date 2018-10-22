import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request } from "express";

export class UserService {
  private userRepository = getRepository(User, process.env.NODE_ENV);

  /**
   * Finds user by E-Mail
   * @param email User E-Mail
   */
  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.email = :email", { email: email })
      .getOne();
  }

  /**
   * Find user by id
   * @param id user id
   */
  public async getUserById(id: number): Promise<User> {
    return this.userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.id = :id", { id: id })
      .getOne();
  }

  /**
   * Gets the statistics from one user by id
   * @param id user id
   */
  public async getStatisticFromUser(id: number) {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .select()
      .leftJoinAndSelect("user.analyses", "analysis")
      .innerJoinAndSelect("analysis.emotion", "emotion")
      .getOne();
  }

  /**
   * Creates user resource
   * @param request HTTP request
   */
  public async createUser(request: Request): Promise<User> {
    const user: User = request.body;
    const salt: string = await this.generateSalt();
    const hash: string = await this.hashPassword(user.password, salt);

    user.salt = salt;
    user.password = hash;
    return this.userRepository.save(user);
  }

  /**
   * Updates a user resource
   * @param user a user object
   */
  public async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  /**
   * Deletes a user resource
   * @param user a user object
   */
  public async deleteUser(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  /**
   * Generates salt for hashing.
   */
  public async generateSalt(): Promise<string> {
    const saltRounds: number = 10;
    return bcrypt.genSalt(saltRounds);
  }

  /**
   * Hashes password
   * @param password Password string from user
   * @param salt Hash salt
   */
  public hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
