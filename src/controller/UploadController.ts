import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { IUploadResponse } from "../models/UploadResult.model";
import { AuthService } from "../services/auth.service";
import { COLLECTION_NAME } from "../shared/constants";
import { db, loadCollection } from "../shared/utils";
import { ImageController } from "./ImageController";
import { UserController } from "./UserController";

export class UploadController {
  repo: ImageController;
  authService: AuthService;
  userController: UserController;

  constructor() {
    this.repo = new ImageController();
    this.authService = new AuthService();
    this.userController = new UserController();
  }

  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const col: LokiConstructor.Collection<any> = await loadCollection(
        COLLECTION_NAME,
        db
      );

      const data: any = col.insert(request.file);

      db.saveDatabase();

      const result: IUploadResponse = {
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname
      };

      // move this somewhere else
      // if (!request.body.id && !this.authService.affirmIdentity(request)) {
      //   response.status(400).json({ message: "Could not confirm identity" });
      // }

      const userId: number = this.authService.getIdClaim(request);

      if (userId !== -1) {
        const user: User = await this.userController.getUserById(userId);
        this.repo.analyseImage(result.fileName, user, response);
      } else {
        response.status(401).json({ message: "Could not identify user claim" });
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({ message: "Could not process file" });
    }
  }
}
