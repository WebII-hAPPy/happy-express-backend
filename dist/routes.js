"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("./controller/UserController");
var AnalysisController_1 = require("./controller/AnalysisController");
var UserRoutes = [];
var AnalysisRoutes = [];
exports.Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController_1.UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController_1.UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/users",
    controller: UserController_1.UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/users",
    controller: UserController_1.UserController,
    action: "remove"
  },
  {
    method: "get",
    route: "/analyses",
    controller: AnalysisController_1.AnalysisController,
    action: "all"
  },
  {
    method: "get",
    route: "/analysis",
    controller: AnalysisController_1.AnalysisController,
    action: "one"
  },
  {
    method: "delete",
    route: "/analysis:id",
    controller: AnalysisController_1.AnalysisController,
    action: "remove"
  },
  {
    method: "post",
    route: "/analysis",
    controller: AnalysisController_1.AnalysisController,
    action: "save"
  }
];
//# sourceMappingURL=routes.js.map
