import { Http, HttpLibs } from "../lib/http";

export interface ImageUploadProps {
  filename: string;
  file: File;
}

export class ImageAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async uploadImage(props: ImageUploadProps) {
    const { filename, file } = props;
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("file", file);

    const response = await this.http.post("api/image/upload", {
      body: formData,
    });
    return HttpLibs.toJson<{ url: string }>(response);
  }
}
