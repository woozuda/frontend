import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setAiType } from "../_lib/setAitype";

export function useAiType() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (type: string) => setAiType(type),
    onSuccess: () => {
      toast.success("AI 창작 전환이 완료 되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["AITYPE"] });
    },
    onError: () => {
      toast.error("AI 창작 전환 중 오류가 발생했습니다.", {
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
