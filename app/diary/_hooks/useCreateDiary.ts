import { CreateInfo as ICreateInfo } from "@/app/models/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createDiary } from "../_lib/createDiary";

export function useCreateDiary(createInfo: ICreateInfo) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createDiary(createInfo),
    onSuccess: async (data: { id: number}) => {
      toast.success("다이어리 생성이 완료되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["DIARY"] });
      await queryClient.refetchQueries({ queryKey: ["DIARY"] });
      router.replace("/diary");
    },
    onError: () => {
      toast.error("다이어리 생성 중 오류가 발생했습니다.", {
        description: "다시 한번 시도해 주세요.",
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
    },
  });
  return { mutate, isPending };
}
