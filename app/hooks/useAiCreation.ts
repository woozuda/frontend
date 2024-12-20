import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useHttp } from "../contexts/http";
import { ReportAPI } from "../http/report";
import { HttpLibs } from "../lib/http";
import { ReportLibs } from "../lib/report";
import { AiCreation } from "../models/report";

export interface UseAiCreationProps {
  startDate: Date;
  endDate: Date;
}

const useAiCreation = (props: UseAiCreationProps) => {
  const { startDate, endDate } = props;

  const http = useHttp();
  const reportApi = new ReportAPI(http);

  return useQuery({
    queryKey: [
      "AI_CREATION",
      ReportLibs.toDateParam(addDays(startDate, 1)),
      ReportLibs.toDateParam(addDays(endDate, 1)),
    ] as const,
    queryFn: async ({ queryKey }) => {
      const [, start, end] = queryKey;

      const response = await reportApi.getAiCreation(start, end);

      if (!response.ok) {
        return null;
      }

      return HttpLibs.toJson<AiCreation>(response);
    },
  });
};

export default useAiCreation;
