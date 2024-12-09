import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setAnalysisType } from "../_lib/setAnalysisType";

export function useAnalysisType() {

  const { mutate: analysisMutate, isPending: analysisIsPending } = useMutation({
    mutationFn: (type: string) => setAnalysisType(type),
    onSuccess: () => {
        toast.success("분석형태 설정이 완료되었습니다.");
    },
    onError: () => {
      toast.error("분석형태 설정 중 오류가 발생했습니다.", {
        description: "다시 한번 시도해 주세요.",
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
    },
  });
  return { analysisMutate, analysisIsPending };
}
