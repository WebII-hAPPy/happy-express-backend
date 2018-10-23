import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { IUploadResponse } from "../models/UploadResult.model";
import { AuthService } from "../services/auth.service";
import { ImageService } from "../services/image.service";
import { UserService } from "../services/user.service";
import { COLLECTION_NAME } from "../shared/constants";
import { db, loadCollection } from "../shared/utils";

export class UploadController {
  private imageService: ImageService;
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.imageService = new ImageService();
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  /**
   * Uploading the photo and analysing it
   * @param request User request
   * @param response Server response
   * @param next Callback
   */
  public async upload(
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

      const userId: number = this.authService.getIdClaim(request);

      if (userId !== -1) {
        const user: User = await this.userService.getUserById(userId);
        if (user !== undefined && user !== null) {
          this.imageService.analyseImage(result.fileName, user, response);
        } else {
          response
            .set("status", "404")
            .status(404)
            .json({ message: "User not found." });
        }
      } else {
        response
          .set("status", "401")
          .status(401)
          .json({ message: "Route protected. Authentication required." });
      }
    } catch (err) {
      console.log(err);
      response
        .set("status", "400")
        .status(400)
        .json({ message: "Could not process file." });
    }
  }
}
