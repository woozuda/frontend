import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createDiary } from "../_lib/createDiary";
import { CreateInfo as ICreateInfo } from "@/app/models/diary";
import { toast } from "sonner"

export function useCreateDiary(createInfo: ICreateInfo) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => createDiary(createInfo),
    onSuccess: () => {
      toast.success("다이어리 생성이 완료되었습니다.")
      router.replace("/");
    },
    onError: () => {
      toast.error("다이어리 생성 중 오류가 발생했습니다.", {
        description: "다시 한번 시도해 주세요.",
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      })
    },
  });
  return { mutate, isPending };
}
