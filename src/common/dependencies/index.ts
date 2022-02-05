import 'reflect-metadata';
import App from '@/app/app';
import { DB } from '@/app/db';
import { Config } from '@/app/config';
import { TYPES } from '../schemes/di-types';
import { Container } from 'inversify';
// Services
import { LoggerService } from '../services/logger/logger.service';
import { CategoryService } from '@/modules/category/service/category.service';
// Controllers
import { CategoryController } from '@/modules/category/controller/category.controller';
import { ProductController } from '@/modules/product/controller/product.controller';
import { CategoryRepository } from '@/modules/category/repository/category.repository';
// Middlewares
import { JsonMiddleware } from '@/common/middlewares/json.middleware';
import { UrlEncodedMiddleware } from '@/common/middlewares/urlencoded.middleware';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { ErrorRouteMiddleware } from '../middlewares/error.route.middleware';
// Types
import { ICategoryService } from '@/types/services';
import { ICategoryRepository, IProductRepository } from '@/types/repositories';
import { ILogger } from '@/types/utils';
import { IController, IConfig, IDb } from '@/types';
import { IMiddleware, IErrorRouteMiddleware, IExpressMiddleware } from '@/types/middlewares';
import { ProductRepository } from '@/modules/product/repository/product.repository';
import { Category } from '@/modules/category/entity/category.entity';

export const container = new Container();

// Globals
container.bind<App>(TYPES.APPLICATION).to(App);
container.bind<IDb>(TYPES.DB).to(DB);
container.bind<IConfig>(TYPES.CONFIG).to(Config);

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService);

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService);

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController);
container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductController);

// Middlewares
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(JsonMiddleware);
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(UrlEncodedMiddleware);
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware);
container.bind<IErrorRouteMiddleware>(TYPES.MIDDLEWARES.IErrorRouteMiddleware).to(ErrorRouteMiddleware);

// Repositories
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.CategoryRepository).to(CategoryRepository);
container.bind<IProductRepository>(TYPES.REPOSITORIES.ProductRepository).to(ProductRepository);
