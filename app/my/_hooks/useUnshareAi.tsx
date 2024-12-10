import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { unshareAi } from "../_lib/unshareAi";


export function useUnshareAi() {
  const { mutate, isPending } = useMutation({
    mutationFn: (noShareList: number[]) => unshareAi(noShareList),
    onSuccess: () => {
        toast.success("공유 해지가 완료되었습니다.");
    },
    onError: () => {
      toast.error("공유 해지 중 오류가 발생했습니다.", {
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
