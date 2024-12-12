import { useMutation } from "@tanstack/react-query";
import { uploadCover } from "../_lib/uploadCover";
import { toast } from "sonner";

export function useUploadCover(
  handleUploadCoverSuccess: (data: { imageUrl: string }) => void
) {
  const { mutate: uploadCoverMutate, isPending: uploadCoverIsPending } =
    useMutation({
      mutationFn: (formData: FormData) => uploadCover(formData),
      onSuccess: (data) => {
        toast.success("이미지 업로드가 완료되었습니다.")
        handleUploadCoverSuccess(data);
      },
      onError: () => {
        toast.error("이미지 업로드가 실패했습니다.")
      },
    });
  return { uploadCoverMutate, uploadCoverIsPending };
}
