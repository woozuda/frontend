import { Http, HttpLibs } from "../lib/http";
export interface ImageUploadProps {
  file: File;
}

export class ImageAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async uploadImage(props: ImageUploadProps) {
    const { file } = props;
    const formData = new FormData();
    formData.append("multipartFile ", file);

    const response = await this.http.post("api/image/upload", {
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    return HttpLibs.toJson<{ imageUrl: string }>(response);
  }
}
