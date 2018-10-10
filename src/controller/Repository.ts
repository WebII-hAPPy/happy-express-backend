import { NextFunction, Request, Response } from "express";
import { readFile, write } from "fs";
import { ClientRequest, IncomingMessage } from "http";
import * as https from "https";
import {
  OCP_APIM_SUBSCRIPTION_KEY,
  URI_BASE,
  AZURE_PARAMS
} from "../shared/constants";
import { IAzureParams } from "../models/AzureParams";
import * as util from "util";
import { Writable } from "stream";
import {
  IAzureResponse,
  IAccessory,
  IHairColor
} from "../models/AzureResponse";
import { Analysis } from "../entity/Analysis";
import { Emotion } from "../entity/Emotion";
import { HairColor } from "../entity/HairColor";
import { IAnalysis } from "../models/Analysis";
import { User } from "../entity/User";
import { AnalysisController } from "./AnalysisController";
import { DeleteController } from "./DeleteController";

export class Repo {
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
      console.log("Could not read file " + err);
    }
  }

  async saveAnalysis(
    result: string,
    user: User,
    response: Response
  ): Promise<void> {
    const res: IAzureResponse = JSON.parse(result)[0];
    const _res: IAnalysis = this.convertToAnalysis(res, user);
    const analysis: Analysis = await this.analysisController.create(_res);
    response.status(201).json({ message: "Analysis complete", data: analysis });
  }

  convertToAnalysis(res: IAzureResponse, user: User): IAnalysis {
    const date: Date = new Date();
    const _res: IAnalysis = {
      user: user,
      time: date,
      emotion: res.faceAttributes.emotion,
      smile: res.faceAttributes.smile,
      accessories: res.faceAttributes.accessories,
      makeup: res.faceAttributes.makeup,
      glasses: res.faceAttributes.glasses,
      gender: res.faceAttributes.gender,
      age: res.faceAttributes.age,
      facialHair: res.faceAttributes.facialHair,
      hair: res.faceAttributes.hair
    };
    return _res;
  }
}
