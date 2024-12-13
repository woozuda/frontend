import { CreateRetrospect as ICreateRetrospect } from "@/app/models/diary";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRetrospect } from "../_lib/createRetrospect";

export function useCreateRetrospect({
  retrospectId,
  type,
  date,
  diaryId,
  title,
  retrospectText,
}: ICreateRetrospect) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createRetrospect({
        retrospectId,
        type,
        date,
        diaryId,
        title,
        retrospectText,
      }),
    onSuccess: () => {
      toast.success("회고 작성이 완료되었습니다.");
      router.replace("/home");
    },
    onError: () => {
      toast.error("회고 작성 중 오류가 발생했습니다.", {
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
