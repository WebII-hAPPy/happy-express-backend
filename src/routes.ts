import { UserController } from "./controller/UserController";
import { AnalysisController } from "./controller/AnalysisController";
import { UploadController } from "./controller/UploadController";
import { DeleteController } from "./controller/DeleteController";
import { Repo } from "./controller/Repository";
import { IRoute } from "./models/Route.model";
import { StatisticController } from "./controller/Statistics";
import { AuthController } from "./controller/AuthController";

export const Routes: IRoute[] = [
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
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/users",
    controller: UserController,
    action: "remove"
  },
  {
    method: "get",
    route: "/analyses",
    controller: AnalysisController,
    action: "all"
  },
  {
    method: "get",
    route: "/analysis",
    controller: AnalysisController,
    action: "one"
  },
  {
    method: "delete",
    route: "/analysis/:id",
    controller: AnalysisController,
    action: "remove"
  },
  {
    method: "post",
    route: "/image",
    controller: UploadController,
    action: "save"
  },
  {
    method: "delete",
    route: "/image/:imageName",
    controller: DeleteController,
    action: "delete"
  },
  {
    method: "get",
    route: "/face/:imageName",
    controller: Repo,
    action: "getImageAnalysis"
  },
  {
    method: "get",
    route: "/statistic/:id",
    controller: StatisticController,
    action: "compose"
  }
];
