import { UserController } from "./controller/UserController";
import { TestController } from "./controller/TestController";

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
    route: "/test",
    controller: TestController,
    action: "one"
  }
];
