import { AnalysisController } from "./controller/AnalysisController";
import { AuthController } from "./controller/AuthController";
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
  {
    method: "get",
    route: "/verifyAccount/:hash",
    controller: AuthController,
    action: "verifyAccount"
  },
  {
    method: "post",
    route: "/api/image",
    controller: UploadController,
    action: "save"
  },
  {
    method: "get",
    route: "/api/analysis/:id",
    controller: AnalysisController,
    action: "one"
  },
  {
    method: "delete",
    route: "/api/analysis/:id",
    controller: AnalysisController,
    action: "remove"
  }
];
