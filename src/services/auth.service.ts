import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { IResponse } from "../models/Response.model";

export class AuthService {
  readonly secret = process.env.JWT_SECRET;

  public async checkCredentials(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  public async createToken(user: User): Promise<Object> {
    const JWT_SECRET: string = process.env.JWT_SECRET;
    user.password = "";
    user.salt = "";

    const token: string = jwt.sign({ user: user, auth: "" }, JWT_SECRET);

    return { token: token };
  }

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
}
