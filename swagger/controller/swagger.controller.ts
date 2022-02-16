import { Router } from 'express';
import { inject, injectable } from 'inversify';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';

import { TYPES } from '@common/schemes/di-types';
import { IController } from '@/types';
import { ILogger } from '@/types/utils';

@injectable()
export class SwaggerController implements IController {
  public path = '/api-docs';
  public router = Router();
  public options: Options = {};

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
    this.initOptions();
    this.initRoutes();
  }

  public initRoutes(){
    this.router.use('/', swaggerUi.serve);
    this.router.get('/', swaggerUi.setup(swaggerJsDoc(this.options)));
  }

  public initOptions(){
    this.options.swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce Headless Server API',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:5000'
        }
      ]
    };

    this.options.apis = [ './swagger/*.controller.yaml' ];
  }
}
