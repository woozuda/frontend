import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { HttpLibs } from "../lib/http";
import { ReportLibs } from "../lib/report";
import {
  Report4FS,
  ReportKPT,
  ReportPMI,
  ReportSCS,
  RetrospectEnums,
} from "../models/report";

export interface UseReportProps {
  startDate: Date;
  endDate: Date;
  type: RetrospectEnums;
}

const useReportRetrospective = (props: UseReportProps) => {
  const { startDate, endDate, type } = props;
  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "DIARY_ANALYSIS",
      ReportLibs.toDateParam(addDays(startDate, 1)),
      ReportLibs.toDateParam(addDays(endDate, 1)),
      type,
    ] as const,
    queryFn: async ({ queryKey }) => {
      const [, start, end, type] = queryKey;

      switch (type) {
        case RetrospectEnums.FOUR_F_S: {
          const response = await reportApi.getReport4FS(start, end);

          if (!response.ok) {
            return null;
          }

          const data = await HttpLibs.toJson<Report4FS>(response);
          data.type = RetrospectEnums.FOUR_F_S;
          return data;
        }
        case RetrospectEnums.KPT: {
          const response = await reportApi.getReportKPT(start, end);

          if (!response.ok) {
            return null;
          }

          const data = await HttpLibs.toJson<ReportKPT>(response);
          data.type = RetrospectEnums.KPT;
          return data;
        }
        case RetrospectEnums.PMI: {
          const response = await reportApi.getReportPMI(start, end);

          if (!response.ok) {
            return null;
          }

          const data = await HttpLibs.toJson<ReportPMI>(response);
          data.type = RetrospectEnums.PMI;
          return data;
        }
        case RetrospectEnums.SCS: {
          const response = await reportApi.getReportSCS(start, end);

          if (!response.ok) {
            return null;
          }

          const data = await HttpLibs.toJson<ReportSCS>(response);
          data.type = RetrospectEnums.SCS;
          return data;
        }
        default: {
          const response = await reportApi.getReport4FS(start, end);

          if (!response.ok) {
            return null;
          }

          const data = await HttpLibs.toJson<Report4FS>(response);
          data.type = RetrospectEnums.FOUR_F_S;
          return data;
        }
      }
    },
  });
};

export default useReportRetrospective;
