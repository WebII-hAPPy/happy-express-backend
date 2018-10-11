import { Response } from "express";
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
import { AnalysisController } from "./AnalysisController";
import { DeleteController } from "./DeleteController";
import { IResponse } from "../models/Response.model";

export class ImageController {
  analysisController: AnalysisController;
  deleteController: DeleteController;

  constructor() {
    this.analysisController = new AnalysisController();
    this.deleteController = new DeleteController();
  }

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

      let __return: string;
      let _return: Promise<string>;

      let responseText: string = "";

      const post_req: ClientRequest = https.request(
        post_options,
        (_response: IncomingMessage) => {
          _response.on("data", function(rdata: string): void {
            responseText += rdata;
          });

          _response.on("end", () => {
            this.deleteController.delete(imageName);
            this.saveAnalysis(responseText, user, response);
          });
        }
      );

      post_req.write(data);

      post_req.end();
    } catch (err) {
      this.deleteController.delete(imageName);
      console.log("Could not read file " + err);
      response.status(400).json({ message: "Could not read file" });
    }
  }

  async saveAnalysis(
    result: string,
    user: User,
    response: Response
  ): Promise<void> {
    console.log(result);
    const res: IAzureResponse = JSON.parse(result)[0];

    if (res !== null || res !== undefined) {
      const _res: IAnalysis = this.convertToAnalysis(res, user);
      const __res: Analysis = this.convertToEntity(_res);
      // const analysis: Analysis = await this.analysisController.create(_res);
      const analysis: Analysis = await this.analysisController.store(__res);
      analysis.user.password = "";
      analysis.user.salt = "";

      response
        .set("status", "201")
        .status(201)
        .json({
          message: "Analysis complete",
          data: { analysisId: analysis.id }
        });
    } else {
      response.status(406).json({ message: "No face recognized" });
    }
  }

  convertToAnalysis(res: IAzureResponse, user: User): IAnalysis {
    const date: Date = new Date();
    const _res: IAnalysis = {
      user: user,
      time: date,
      ...res.faceAttributes
    };
    return _res;
  }

  convertToEntity(analysis: IAnalysis): Analysis {
    const _emotion: Emotion = {
      ...analysis.emotion
    };

    let _accessories: Accessory[] = [];

    analysis.accessories.forEach((accessory: IAccessory) => {
      _accessories.push({ ...accessory, analysis: null });
    });

    const _makeUp: MakeUp = {
      ...analysis.makeup
    };

    const _facialHair: FacialHair = {
      ...analysis.facialHair
    };

    let _hairColor: HairColor[] = [];

    analysis.hair.hairColor.forEach((hairColor: IHairColor) => {
      _hairColor.push({ ...hairColor, hair: _hair });
    });

    const _hair: Hair = {
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

    return _analysis;
  }
}
