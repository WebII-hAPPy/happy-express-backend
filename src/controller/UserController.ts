import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = getRepository(User);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<User> {
    return this.userRepository.findOne(request.params.id);
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.userRepository.save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    await this.userRepository.remove(request.params.id);
  }
}
