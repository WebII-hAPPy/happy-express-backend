import { UserController } from './controller/UserController';
import { AnalysisController } from './controller/AnalysisController';
import { UploadController } from './controller/UploadController';
import { DeleteController } from './controller/DeleteController';
import { Repo } from './controller/Repository';
import { IRoute } from './models/Route.model';

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/users',
    controller: UserController,
    action: 'remove'
  },
  {
    method: 'get',
    route: '/analyses',
    controller: AnalysisController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/analysis',
    controller: AnalysisController,
    action: 'one'
  },
  {
    method: 'delete',
    route: '/analysis/:id',
    controller: AnalysisController,
    action: 'remove'
  },
  {
    method: 'post',
    route: '/image',
    controller: UploadController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/image/:imageName',
    controller: DeleteController,
    action: 'delete'
  },
  {
    method: 'get',
    route: '/face/:imageName',
    controller: Repo,
    action: 'getImageAnalysis'
  }
];
