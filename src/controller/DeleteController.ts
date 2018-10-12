import { deleteImage } from "../shared/utils";

export class DeleteController {
  /**
   * deletes a image on disk by filename
   * @param imageName image name on disk
   */
  async delete(imageName: string): Promise<void> {
    const result: string[] = deleteImage(imageName);

    if (result === []) {
      console.error("COULD NOT DELETE IMAGE: " + imageName);
    }
  }
}
