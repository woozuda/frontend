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
    formData.append("multipartFile", file, filename);

    const response = await this.http.post("api/image/upload", {
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    return HttpLibs.toJson<{ url: string }>(response);
  }
}
