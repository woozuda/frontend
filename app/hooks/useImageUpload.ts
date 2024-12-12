import { useMutation } from "@tanstack/react-query";
import { ImageAPI, type ImageUploadProps } from "../http";
import { Http } from "../lib/http";

const useImageUpload = () => {
  // TODO
  const http = new Http({
    credentials: "include",
  });
  http.baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  const imageApi = new ImageAPI(http);
  return useMutation({
    mutationKey: ["IMAGE_UPLOAD"],
    mutationFn: async (props: Partial<ImageUploadProps>) => {
      // const { file, filename } = props;
      // if (!file || !filename) {
      //   throw new Error("Image cannot be nullable.");
      // }
      try {
        const response = await imageApi.uploadImage(props as ImageUploadProps);
        return response;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useImageUpload;
