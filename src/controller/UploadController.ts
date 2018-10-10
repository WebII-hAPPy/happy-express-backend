import { NextFunction, Request, Response, json } from "express";
import { IResponse } from "../models/Response.model";
import { IUploadResponse } from "../models/UploadResult.model";
import { COLLECTION_NAME } from "../shared/constants";
import { db, loadCollection } from "../shared/utils";
import { AnalysisController } from "./AnalysisController";
import { Repo } from "./Repository";
import { AuthService } from "../services/auth.service";
import { UserController } from "./UserController";
import { User } from "../entity/User";

export class UploadController {
  repo: Repo;
  authService: AuthService;
  userController: UserController;

  constructor() {
    this.repo = new Repo();
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

      const user: User = await this.userController.getUserById(userId);

      this.repo.analyseImage(result.fileName, user, response);
    } catch (err) {
      console.log(err);
      response.status(400).json({ message: "Could not process file" });
    }
  }
}
