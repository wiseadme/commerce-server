import multer, { Options } from 'multer';
import path from 'path';

type Maybe<T> = T | null

export class FileLoader {
  plugin: typeof multer;
  storage: Maybe<Options['storage']>;
  limits: Maybe<Options['limits']>;
  fileFilter: Maybe<Options['fileFilter']>;

  constructor(){
    this.plugin = multer;
    this.storage = null;
    this.limits = null;
    this.fileFilter = null
  }

  addStorage(){
    this.storage = this.plugin!.diskStorage({
      destination(req, file, cb){
        cb(null, __dirname + '/uploads');
      },
      filename(req, file, cb){
        cb(null, `${ file.originalname }`);
      }
    });
  }
}
