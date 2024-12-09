import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setAlarm } from "../_lib/setAlarm";

export function useAlarm(alarm: boolean) {

  const { mutate, isPending } = useMutation({
    mutationFn: (alarm: boolean) => setAlarm(alarm),
    onSuccess: () => {
        if(!alarm) {
            toast.success("알람 설정이 완료되었습니다.");
        } else {
            toast.success("알람 해지가 완료되었습니다.");
        } 
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
