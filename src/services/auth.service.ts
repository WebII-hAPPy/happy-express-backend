import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { UserController } from "../controller/UserController";

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

  public getIdClaim(request: Request): number {
    const token: string = request.headers.authorization;
    let decoded: any;
    try {
      decoded = jwt.verify(token, this.secret);
    } catch (err) {
      return -1;
    }

    if (!decoded) {
      return -1;
    }
    return decoded.user.id;
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
   * makes sure a user requesting an analysis is who he claims to be by v
   * alidating the jwt token claim
   * @param request http Request
   */
  public affirmIdentity(request: Request): boolean {
    const token: string = request.headers.authorization;
    // not sure know how to properly handle string | object correctly -> any for now
    let decoded: any;
    try {
      decoded = jwt.verify(token, this.secret);
    } catch (err) {
      return false;
    }

    if (!decoded) {
      return false;
    } else {
      if (decoded.user.id === parseInt(request.params.id, 10)) {
        return true;
      }
      return false;
    }
  }

  /**
   * creates Hash for email verification
   */
  public async createHash(): Promise<string> {
    return crypto
      .randomBytes(256)
      .toString("base64")
      .replace(/\//g, "");
  }
}
