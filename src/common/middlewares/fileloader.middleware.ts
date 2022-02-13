import multer, { Options } from 'multer';
import path from 'path';

type Maybe<T> = T | null

export class FileLoader {
  plugin: typeof multer;
  options: Options;

  constructor() {
    this.plugin = multer;
    this.options = {};

    this.addOptionsStorage();
    this.addFileFilter();
    this.addLimits();
  }

  addOptionsStorage() {
    this.options.storage = this.plugin!.diskStorage({
      destination(req, file, cb) {
        cb(null, __dirname + '/uploads');
      },
      filename(req, file, cb) {
        cb(null, `${ file.originalname }`);
      }
    });
  }

  addFileFilter() {
    this.options.fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  }

  addLimits() {
    this.options.limits = { fileSize: 1024 * 1024 * 3 };
  }
}

const loader = new FileLoader()

export default loader.plugin(loader.options)
