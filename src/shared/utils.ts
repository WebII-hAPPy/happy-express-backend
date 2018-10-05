import * as Loki from "lokijs";
import * as del from "del";
import { UPLOAD_PATH, DB_NAME } from "./constants";

/**
 * Throws an error if the type of the image isnt jpg, jpeg, png or gif.
 * @param file Image file
 * @param cb Call back
 */
const imageFilter: any = function(file: any, cb: any): Error {
  // accept image only

  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

/**
 * Loads a collection from a spezified database
 * @param colName Column name
 * @param db Loki databse name
 */
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

/**
 * Deletes an image inside a folder, but not its folder
 * @param imageName Name of the image
 */
const deleteImage: any = function(imageName: string): string[] {
  // delete files inside folder but not the folder itself
  return del.sync([`${UPLOAD_PATH}/${imageName}`, `!${UPLOAD_PATH}`]);
};

export { imageFilter, loadCollection, db, deleteImage };
