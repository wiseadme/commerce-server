import express, { Application } from 'express';
import { inject, injectable, multiInject } from 'inversify';
import { DB } from './db';
import { TYPES } from '@common/schemes/di-types';
import { IController } from '@/types';
import { IErrorRouteMiddleware, IMiddleware } from '@/types/middlewares';
import { ILogger } from '@/types/utils';
import config from './config'

@injectable()
class App {
  public app: Application;
  public port: number;

  constructor(
    @inject(TYPES.DB) private db: DB,
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.MIDDLEWARES.IErrorRouteMiddleware) private errorRouteMiddleware: IErrorRouteMiddleware,
    @multiInject(TYPES.CONTROLLERS.IController) private routesArray: IController[],
    @multiInject(TYPES.MIDDLEWARES.IMiddleware) private middlewaresArray: IMiddleware[],
  ){
    this.app = express();
    this.port = config.port;

    this.middleWares(middlewaresArray);
    this.routes(routesArray);
    this.db.connect();
  }

  private middleWares(middleWares: Array<any>){
    middleWares.forEach(middleWare => {
      this.app.use(middleWare.execute.bind(middleWare));
    });
  }

  private routes(controllers: Array<IController>){
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    });

    this.app.use(this.errorRouteMiddleware.execute as any);
  }

  public listen(){
    this.app.listen(this.port, () => this.logger.log('server is running on', this.port));
  }
}

export default App;
