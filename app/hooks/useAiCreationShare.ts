import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isNil } from "ramda";
import { toast } from "sonner";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";

export interface AiCreationShareProps {
  ids?: number[];
}

const useAiCreationShare = () => {
  const http = useHttp();
  const reportApi = new ReportAPI(http);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["AI_CREATION_SHARE"],
    mutationFn: async (props: AiCreationShareProps) => {
      const { ids } = props;
      if (isNil(ids)) {
        throw new Error("Error: no note ids");
      }
      const response = await reportApi.shareAiCreations(ids);
      return response;
    },
    onError(error, variables, context) {
      toast.error("알 수 없는 에러가 발생했습니다.");
    },
    onSuccess(data, variables, context) {
      if (!data.ok) {
        toast.error("창작물 공유에 실패했습니다.");
      }
      queryClient.invalidateQueries({ queryKey: ["SHARED_AI_CREATION"] });
    },
  });
};

export default useAiCreationShare;
