import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { ReportLibs } from "../lib/report";
import { RetrospectEnums } from "../models/report";

export interface CreateReportProps {
  startDate: Date;
  endDate: Date;
  type: "DIARY" | RetrospectEnums;
}

const useReportCreate = () => {
  const http = useHttp();
  const reportApi = new ReportAPI(http);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["REPORT_CREATE"],
    mutationFn: async (props: CreateReportProps) => {
      const { startDate, endDate, type } = props;
      const start = ReportLibs.toDateParam(addDays(startDate, 1));
      const end = ReportLibs.toDateParam(addDays(endDate, 1));
      switch (type) {
        case "DIARY": {
          return reportApi.createReportDiary(start, end);
        }
        case RetrospectEnums.FOUR_F_S: {
          return reportApi.createReport4FS(start, end);
        }
        case RetrospectEnums.KPT: {
          return reportApi.createReportKPT(start, end);
        }
        case RetrospectEnums.PMI: {
          return reportApi.createReportPMI(start, end);
        }
        case RetrospectEnums.SCS: {
          return reportApi.createReportSCS(start, end);
        }
        default: {
          return null;
        }
      }
    },
    onSuccess: (data, variables, context) => {
      if (data === false) {
        toast.error("레포트 생성에 실패했습니다.");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["DIARY_ANALYSIS"] });
    },
    onError: () => {
      toast.error("알 수 없는 에러가 발생했습니다.");
    },
  });
};

export default useReportCreate;
