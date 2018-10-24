import * as del from "del";
import * as Loki from "lokijs";
import { DB_NAME, UPLOAD_PATH } from "./constants";

/**
 * Loads a collection from a spezified database
 * @param colName Column name
 * @param db Loki databse name
 */
const loadCollection: Function = function(
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
const deleteImage: Function = function(imageName: string): string[] {
  // delete files inside folder but not the folder itself
  return del.sync([`${UPLOAD_PATH}/${imageName}`, `!${UPLOAD_PATH}`]);
};

export { loadCollection, db, deleteImage };
