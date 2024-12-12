import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { ReportLibs } from "../lib/report";

export interface UseDiaryAnalysisProps {
  startDate: Date;
  endDate: Date;
}

const useDiaryAnalysis = (props: UseDiaryAnalysisProps) => {
  const { startDate, endDate } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "DIARY_ANALYSIS",
      ReportLibs.toDateParam(startDate),
      ReportLibs.toDateParam(endDate),
    ] as const,
    queryFn: async ({ queryKey }) => {
      const [, start, end] = queryKey;

      const response = reportApi.getDiaryAnalysis(start, end);
      return response;
    },
  });
};

export default useDiaryAnalysis;
