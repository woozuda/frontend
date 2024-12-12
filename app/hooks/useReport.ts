import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { ReportLibs } from "../lib/report";
import { RetrospectEnums } from "../models/report";

export interface UseReportProps {
  startDate: Date;
  endDate: Date;
  type: RetrospectEnums;
}

const useReport = (props: UseReportProps) => {
  const { startDate, endDate, type } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "DIARY_ANALYSIS",
      ReportLibs.toDateParam(startDate),
      ReportLibs.toDateParam(endDate),
      type,
    ] as const,
    queryFn: async ({ queryKey }) => {
      const [, start, end, type] = queryKey;

      switch (type) {
        case RetrospectEnums.FOUR_FS: {
          return reportApi.getReport4FS(start, end);
        }
        case RetrospectEnums.KPT: {
          return reportApi.getReportKTP(start, end);
        }
        case RetrospectEnums.PMI: {
          return reportApi.getReportPMI(start, end);
        }
        case RetrospectEnums.SCS: {
          return reportApi.getReportSCS(start, end);
        }
        default: {
          return reportApi.getReport4FS(start, end);
        }
      }
    },
  });
};

export default useReport;
