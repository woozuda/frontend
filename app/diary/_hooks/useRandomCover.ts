import { useMutation } from "@tanstack/react-query";
import { randomCover } from "../_lib/randomCover";
import { toast } from "sonner";

export function useRandomCover(
  handleRandomCoverSuccess: (data: { imageUrl: string }) => void
) {
  const { mutate: randomCoverMutate, isPending: randomCoverIsPending } =
    useMutation({
      mutationFn: randomCover,
      onSuccess: (data) => {
        toast.success("랜덤 이미지 생성이 완료 되었습니다.");
        handleRandomCoverSuccess(data);
      },
      onError: () => {
        toast.error("랜덤 이미지 생성이 실패했습니다.");
      },
    });
  return { randomCoverMutate, randomCoverIsPending };
}
