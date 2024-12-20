import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { ReportLibs } from "../lib/report";
import { AiCreationEnums } from "../models/report";

export interface CreateAiCreationProps {
  startDate: Date;
  endDate: Date;
  type: AiCreationEnums;
}

export interface UseAiCreationCreateProps {
  onSuccess?: (data: boolean, variables: CreateAiCreationProps) => unknown;
  onError?: (error: Error) => unknown;
}

const useAiCreationCreate = (props: UseAiCreationCreateProps) => {
  const { onSuccess, onError } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["AI_CREATION_CREATE"],
    mutationFn: async (props: CreateAiCreationProps) => {
      const { startDate, endDate, type } = props;
      const start = ReportLibs.toDateParam(addDays(startDate, 1));
      const end = ReportLibs.toDateParam(addDays(endDate, 1));

      return reportApi.createAiCreation(start, end);

      switch (type) {
        case AiCreationEnums.POETRY:
          return reportApi.createAiCreationPoetry(start, end);
        case AiCreationEnums.WRITING:
          return reportApi.createAiCreationWriting(start, end);
        case AiCreationEnums.IMAGE:
          return reportApi.createAiCreationImage(start, end);
        default:
          throw new Error("분석 형태가 올바르지 않습니다.");
      }
    },
    onSuccess: (data, variables, context) => {
      if (data === false) {
        toast.error("레포트 생성에 실패했습니다.");
        return;
      }
      onSuccess?.(data, variables);
      queryClient.invalidateQueries({ queryKey: ["AI_CREATION"] });
    },
    onError: (error) => {
      onError?.(error);
      toast.error("알 수 없는 에러가 발생했습니다.");
    },
  });
};

export default useAiCreationCreate;
