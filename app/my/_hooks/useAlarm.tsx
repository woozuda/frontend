import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setAlarm } from "../_lib/setAlarm";

export function useAlarm() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (status: string) => setAlarm(status),
    onSuccess: async () => {
      toast.success("알람 설정이 완료되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["ALARM"] });
      await queryClient.refetchQueries({ queryKey: ["ALARM"] });
    },
    onError: () => {
      toast.error("알람  설정 중 오류가 발생했습니다.", {
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
