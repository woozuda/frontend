import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { ReportLibs } from "../lib/report";
import { RetrospectEnums } from "../models/report";

export interface UseReportCountProps {
  startDate: Date;
  endDate: Date;
  type?: RetrospectEnums;
}

const useReportCount = (props: UseReportCountProps) => {
  const { startDate, endDate, type = RetrospectEnums.FOUR_F_S } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "REPORT_COUNT",
      ReportLibs.toDateParam(addDays(startDate, 1)),
      ReportLibs.toDateParam(addDays(endDate, 1)),
      type,
    ] as const,
    queryFn: ({ queryKey }) => {
      const [, start, end, type] = queryKey;
      return reportApi.getReportCount(start, end, type);
    },
  });
};

export default useReportCount;
