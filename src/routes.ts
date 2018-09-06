import { UserController } from "./controller/UserController";
import { AnalysisController } from "./controller/AnalysisController";

const UserRoutes = [];

const AnalysisRoutes = [];

export const Routes = [
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
    route: "/analysis:id",
    controller: AnalysisController,
    action: "remove"
  },
  {
    method: "post",
    route: "/analysis",
    controller: AnalysisController,
    action: "save"
  }
];
