import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

export class AuthService {
  readonly secret = process.env.JWT_SECRET;

  /**
   * Test password against hash.
   * @param password Password from user request.
   * @param hash Hash from database.
   */
  public async checkCredentials(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Creates an authorization jwt token.
   * @param user User object
   */
  public async createToken(user: User): Promise<string> {
    const JWT_SECRET: string = process.env.JWT_SECRET;

    user.password = "";
    user.salt = "";

    const token: string = jwt.sign({ user: user }, JWT_SECRET, {
      algorithm: "HS256"
    });

    return token;
  }

  /**
   * Tries to decode and validate token against JWT_SECRET
   * @param request User request
   */
  public validate(request: Request): boolean {
    const token: string = request.headers.authorization;
    let decoded: string | object;

    try {
      decoded = jwt.verify(token, this.secret);
    } catch (err) {
      return false;
    }

    if (!decoded) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * creates Hash for email verification
   */
  public async createHash(): Promise<string> {
    return crypto.randomBytes(256).toString("base64");
  }
}
