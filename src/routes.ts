import { AnalysisController } from "./controller/AnalysisController";
import { AuthController } from "./controller/AuthController";
import { DeleteController } from "./controller/DeleteController";
import { Repo } from "./controller/Repository";
import { UploadController } from "./controller/UploadController";
import { UserController } from "./controller/UserController";
import { IRoute } from "./models/Route.model";

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
    route: "/ver/:hash",
    controller: AuthController,
    action: "verifyAccount"
  },
  {
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/api/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/api/users",
    controller: UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/api/users",
    controller: UserController,
    action: "remove"
  },
  {
    method: "get",
    route: "/api/analyses",
    controller: AnalysisController,
    action: "all"
  },
  {
    method: "get",
    route: "/api/analysis",
    controller: AnalysisController,
    action: "one"
  },
  {
    method: "delete",
    route: "/api/analysis/:id",
    controller: AnalysisController,
    action: "remove"
  },
  {
    method: "post",
    route: "/api/image",
    controller: UploadController,
    action: "save"
  },
  {
    method: "delete",
    route: "/api/image/:imageName",
    controller: DeleteController,
    action: "delete"
  },
  {
    method: "get",
    route: "/api/face/:imageName",
    controller: Repo,
    action: "getImageAnalysis"
  }
];
