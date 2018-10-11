import { AnalysisController } from "./controller/AnalysisController";
import { AuthController } from "./controller/AuthController";
import { DeleteController } from "./controller/DeleteController";
import { ImageController } from "./controller/ImageController";
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
    route: "/verifyAccount/:hash",
    controller: AuthController,
    action: "verifyAccount"
  },
  {
    method: "get",
    // todo: protect route
    route: "/users",
    controller: UserController,
    action: "all"
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
  }
];
