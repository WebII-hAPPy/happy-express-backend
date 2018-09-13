export interface IRequestResult {
  request: Express.Request;
  res: Express.Response;
  next: Function;
}
