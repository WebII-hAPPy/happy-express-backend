import * as Loki from "lokijs";
import * as del from "del";
import { UPLOAD_PATH, DB_NAME } from "./constants";

const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const loadCollection = function(
  colName,
  db: Loki
): Promise<Loki.Collection<any>> {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection =
        db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    });
  });
};

const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {
  persistenceMethod: "fs"
});

const deleteImage = function(imageName) {
  // delete files inside folder but not the folder itself
  return del.sync([`${UPLOAD_PATH}/${imageName}`, `!${UPLOAD_PATH}`]);
};

export { imageFilter, loadCollection, db, deleteImage };
