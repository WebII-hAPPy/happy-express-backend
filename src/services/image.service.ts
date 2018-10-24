import { Response } from "express-serve-static-core";
import { readFile } from "fs";
import { ClientRequest, IncomingMessage } from "http";
import * as https from "https";
import * as util from "util";
import { Accessory } from "../entity/Accessory";
import { Analysis } from "../entity/Analysis";
import { Emotion } from "../entity/Emotion";
import { FacialHair } from "../entity/FacialHair";
import { Hair } from "../entity/Hair";
import { HairColor } from "../entity/HairColor";
import { MakeUp } from "../entity/MakeUp";
import { User } from "../entity/User";
import { IAnalysis } from "../models/Analysis";
import {
  IAccessory,
  IAzureResponse,
  IHairColor
} from "../models/AzureResponse";
import {
  AZURE_PARAMS,
  OCP_APIM_SUBSCRIPTION_KEY,
  URI_BASE
} from "../shared/constants";
import { deleteImage } from "../shared/utils";
import { AnalysisService } from "./analysis.service";
import { UserService } from "./user.service";

export class ImageService {
  private userService: UserService;
  private analysisService: AnalysisService;

  constructor() {
    this.userService = new UserService();
    this.analysisService = new AnalysisService();
  }

  /**
   * Call to Azure Face API to analyse the image
   * @param imageName Name of the image
   * @param user The current user object
   * @param response HTTP response
   */
  public async analyseImage(
    imageName: string,
    user: User,
    response: Response
  ): Promise<void> {
    try {
      const readFileAsync: any = util.promisify(readFile);
      const data: Buffer = await readFileAsync(`./uploads/${imageName}`);

      const post_options: any = {
        host: URI_BASE,
        path: `/face/v1.0/detect?returnFaceId=${
          AZURE_PARAMS.faceId
        }&returnFaceLandmarks=${
          AZURE_PARAMS.faceLandmarks
        }&returnFaceAttributes=${AZURE_PARAMS.faceAttributes}`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": data.length,
          "Ocp-Apim-Subscription-Key": OCP_APIM_SUBSCRIPTION_KEY
        }
      };

      let responseText: string = "";

      const post_req: ClientRequest = https.request(
        post_options,
        (_response: IncomingMessage) => {
          _response.on("data", function(rdata: string): void {
            responseText += rdata;
          });

          _response.on("end", () => {
            this.delete(imageName);
            this.saveAnalysis(responseText, user, response);
          });
        }
      );

      post_req.write(data);

      post_req.end();
    } catch (err) {
      this.delete(imageName);
      console.log("Could not read file " + err);
      response.status(400).json({ message: "Could not process file." });
    }
  }

  /**
   * Saves the response of the analysis
   * @param result from the Azure Face API
   * @param user The user object
   * @param response HTTP response
   */
  public async saveAnalysis(
    result: string,
    user: User,
    response: Response
  ): Promise<void> {
    if (result === "[]") {
      response
        .set("status", "406")
        .status(406)
        .json({
          message: "Analysis failed. No face recognized."
        });
      return;
    }

    const res: IAzureResponse = JSON.parse(result)[0];

    if (res !== undefined || res !== null) {
      const _res: IAnalysis = this.convertToAnalysis(res, user);
      const __res: Analysis = this.convertToEntity(_res);

      const analysis: Analysis = await this.analysisService.store(__res);

      user.analysisCount += 1;

      await this.userService.update(user);

      analysis.user.password = "";
      analysis.user.salt = "";

      response
        .set("status", "201")
        .status(201)
        .json({
          message: "Analysis complete.",
          data: { analysisId: analysis.id }
        });
    }
  }

  /**
   * Converts the azure response into the IAnalysis object
   * @param res Azure response
   * @param user The User object
   */
  convertToAnalysis(res: IAzureResponse, user: User): IAnalysis {
    const date: Date = new Date();

    const _res: IAnalysis = {
      user: user,
      time: date,
      ...res.faceAttributes
    };
    return _res;
  }

  /**
   * Converts a IAnalysis object to the database entity
   * @param analysis The IAnalysis object
   */
  convertToEntity(analysis: IAnalysis): Analysis {
    const _emotion: Emotion = {
      analysis: null,
      ...analysis.emotion
    };

    let _accessories: Accessory[] = [];

    analysis.accessories.forEach((accessory: IAccessory) => {
      _accessories.push({ ...accessory, analysis: null });
    });

    const _makeUp: MakeUp = {
      analysis: null,
      ...analysis.makeup
    };

    const _facialHair: FacialHair = {
      analysis: null,
      ...analysis.facialHair
    };

    let _hairColor: HairColor[] = [];

    analysis.hair.hairColor.forEach((hairColor: IHairColor) => {
      _hairColor.push({ ...hairColor, hair: _hair });
    });

    const _hair: Hair = {
      analysis: null,
      bald: analysis.hair.bald,
      invisible: analysis.hair.invisible,
      hairColor: _hairColor
    };

    const _analysis: Analysis = {
      user: analysis.user,
      time: analysis.time,
      emotion: _emotion,
      smile: analysis.smile,
      accessories: _accessories,
      makeUp: _makeUp,
      glasses: analysis.glasses,
      gender: analysis.gender,
      age: analysis.age,
      facialHair: _facialHair,
      hair: _hair
    };

    _analysis.emotion.analysis = _analysis;
    _analysis.accessories.forEach(
      (accessory: Accessory) => (accessory.analysis = _analysis)
    );
    _analysis.facialHair.analysis = _analysis;
    _analysis.makeUp.analysis = _analysis;
    _analysis.hair.analysis = _analysis;

    _emotion.analysis = _analysis;
    _accessories.forEach(
      (accessory: Accessory) => (accessory.analysis = _analysis)
    );
    _facialHair.analysis = _analysis;
    _makeUp.analysis = _analysis;
    _hair.analysis = _analysis;

    return _analysis;
  }

  /**
   * deletes a image on disk by filename
   * @param imageName image name on disk
   */
  public async delete(imageName: string): Promise<void> {
    const result: string[] = deleteImage(imageName);

    if (result === []) {
      console.error("COULD NOT DELETE IMAGE: " + imageName);
    }
  }
}
