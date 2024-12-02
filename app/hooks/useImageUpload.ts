import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { ImageAPI, type ImageUploadProps } from "../http";

const useImageUpload = () => {
  const http = useHttp();
  const imageApi = new ImageAPI(http);
  return useMutation({
    mutationKey: ["IMAGE_UPLOAD"],
    mutationFn: (props: Partial<ImageUploadProps>) => {
      // const { file, filename } = props;
      // if (!file || !filename) {
      //   throw new Error("Image cannot be nullable.");
      // }
      return imageApi.uploadImage(props as ImageUploadProps);
    },
  });
};

export default useImageUpload;
