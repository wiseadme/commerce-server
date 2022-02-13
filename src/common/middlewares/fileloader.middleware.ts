import multer, { Multer, Options } from 'multer';
import path from 'path';
import { injectable } from 'inversify';

type Maybe<T> = T | null

class FileLoaderOptions {
  storage: Maybe<Options['storage']>
  fileFilter: Maybe<Options['fileFilter']>
  limits: Maybe<Options['limits']>

  constructor() {
    this.storage = null
    this.fileFilter = null
    this.limits = null

    this.addOptionsStorage();
    this.addFileFilter();
    this.addLimits();
  }

  addOptionsStorage() {
    this.storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, __dirname + '/uploads');
      },
      filename(req, file, cb) {
        cb(null, `${ file.originalname }`);
      }
    });
  }

  addFileFilter() {
    this.fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  }

  addLimits() {
    this.limits = { fileSize: 1024 * 1024 * 3 };
  }
}

@injectable()
export class FileLoader {
  plugin: Multer;

  constructor(options: Options) {
    this.plugin = multer(options);
  }

  loadSingle(fieldName) {
    return this.plugin.single(fieldName)
  }

  loadArray(fieldName, count) {
    return this.plugin.array(fieldName, count)
  }
}

const fileLoader = new FileLoader(new FileLoaderOptions() as Options)

export default fileLoader.loadSingle('any')
