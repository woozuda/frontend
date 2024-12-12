import { nanoid } from "nanoid";

export class ImageLibs {
  static createFormFile(file: File) {
    const id = nanoid();
    const type = file.type;
    const blob = file.slice(0, file.size, type);
    const extension = file.name.split(".").pop();

    const filename = `${id}.${extension}`;
    const newFile = new File([blob], filename, { type: type });

    return newFile;
  }
}
