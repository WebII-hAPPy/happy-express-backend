import * as bcrypt from "bcrypt";

export class UserService {
  public async generateSalt(): Promise<string> {
    const saltRounds: number = 10;
    return bcrypt.genSalt(saltRounds);
  }

  public hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
