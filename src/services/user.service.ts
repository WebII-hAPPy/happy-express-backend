import * as bcrypt from "bcrypt";

export class UserService {
  /**
   * Generates salt for hashing.
   */
  public async generateSalt(): Promise<string> {
    const saltRounds: number = 10;
    return bcrypt.genSalt(saltRounds);
  }

  /**
   * hashes password
   * @param password Password string from user
   * @param salt hash salt
   */
  public hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
