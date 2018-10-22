import { NextFunction, Request, Response } from "express";
import { Analysis } from "../entity/Analysis";
import { IResponse } from "../models/Response.model";
import { AnalysisService } from "../services/analysis.service";
import { AuthService } from "../services/auth.service";

export class AnalysisController {
  private authService: AuthService;
  private analysisService: AnalysisService;

  constructor() {
    this.authService = new AuthService();
    this.analysisService = new AnalysisService();
  }

  /**
   * Get one analysis
   * @param request User request
   * @param response Server response
   * @param next Callback
   */
  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    const userId: number = this.authService.getIdClaim(request);

    let analysis: Analysis = await this.analysisService.findById(
      request.params.id
    );

    if (analysis === undefined) {
      return {
        status: 404,
        message: `No analysis with the the id ${request.params.id}.`
      };
    }

    analysis = await this.analysisService.getAnalysis(request.params.id);

    if (userId === analysis.user.id) {
      analysis.user.password = "";
      analysis.user.salt = "";
      return {
        status: 200,
        message: "Analysis found.",
        data: analysis
      };
    } else {
      return {
        status: 400,
        message: "Could not find analysis for user."
      };
    }
  }
}
