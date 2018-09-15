import * as bcrypt from "bcrypt";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../shared/constants";

export class AuthService {
  public async checkCredentials(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  public async createToken(userId: number, request: Request): Promise<Object> {
    const key: string = "secretKey";
    const expiresIn: string = "1h";

    const token: string = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: expiresIn
    });

    return { expiresIn: expiresIn, token: token };
  }
}
