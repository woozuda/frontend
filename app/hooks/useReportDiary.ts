import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { HttpLibs } from "../lib/http";
import { ReportLibs } from "../lib/report";
import { ReportDiary } from "../models/report";

export interface UseDiaryAnalysisProps {
  startDate: Date;
  endDate: Date;
}

const useReportDiary = (props: UseDiaryAnalysisProps) => {
  const { startDate, endDate } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "DIARY_ANALYSIS",
      ReportLibs.toDateParam(addDays(startDate, 1)),
      ReportLibs.toDateParam(addDays(endDate, 1)),
      "DIARY",
    ] as const,
    queryFn: async ({ queryKey }) => {
      const [, start, end] = queryKey;

      const response = await reportApi.getReportDiary(start, end);

      if (!response.ok) {
        return null;
      }

      return HttpLibs.toJson<ReportDiary>(response);
    },
  });
};

export default useReportDiary;
