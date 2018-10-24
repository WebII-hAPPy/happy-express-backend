import { AnalysisController } from "./controller/AnalysisController";
import { AuthController } from "./controller/AuthController";
import { StatisticController } from "./controller/StatisticController";
import { UploadController } from "./controller/UploadController";
import { UserController } from "./controller/UserController";
import { IRoute } from "./models/Route.model";

export const Routes: IRoute[] = [
  // AuthController
  {
    method: "get",
    route: "/verifyAccount/:hash",
    controller: AuthController,
    action: "verifyAccount"
  },
  {
    method: "get",
    route: "/api/verifyToken",
    controller: AuthController,
    action: "isTokenClaimValid"
  },
  {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "authenticate"
  },
  {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "register"
  },
  {
    method: "post",
    route: "/resetPassword",
    controller: AuthController,
    action: "resetPassword"
  },
  {
    method: "put",
    route: "/api/updatePassword",
    controller: AuthController,
    action: "updatePassword"
  },
  // UserController
  {
    method: "put",
    route: "/api/changeName/:id",
    controller: UserController,
    action: "changeName"
  },
  {
    method: "delete",
    route: "/api/deleteAccount/:id",
    controller: UserController,
    action: "deleteAccount"
  },
  // UploadController
  {
    method: "post",
    route: "/api/image",
    controller: UploadController,
    action: "upload"
  },
  // AnalysisController
  {
    method: "get",
    route: "/api/analysis/:id",
    controller: AnalysisController,
    action: "getAnalysis"
  },
  // StatisticController
  {
    method: "get",
    route: "/api/statistics/:id",
    controller: StatisticController,
    action: "getStatistic"
  },
  {
    method: "delete",
    route: "/api/statistics/:id",
    controller: StatisticController,
    action: "reset"
  }
];
