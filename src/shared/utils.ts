import * as Loki from "lokijs";
import * as del from "del";
import { UPLOAD_PATH, DB_NAME } from "./constants";

const imageFilter: any = function(req: any, file: any, cb: any): Error {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const loadCollection: any = function(
  colName: string,
  db: Loki
): Promise<Loki.Collection<any>> {
  return new Promise((resolve) => {
    db.loadDatabase({}, () => {
      const _collection: Collection<any> =
        db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    });
  });
};

const db: Loki = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {
  persistenceMethod: "fs"
});

const deleteImage: any = function(imageName: string): string[] {
  // delete files inside folder but not the folder itself
  return del.sync([`${UPLOAD_PATH}/${imageName}`, `!${UPLOAD_PATH}`]);
};

export { imageFilter, loadCollection, db, deleteImage };
