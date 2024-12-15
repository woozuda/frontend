"use client";

import useReportCreateState from "@/app/hooks/useReportCreateState";
import useReportRetrospective from "@/app/hooks/useReportRetrospective";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import { useSearchParams } from "next/navigation";
import { isNil } from "ramda";
import { Report4FSResult } from "./result";
import ReportSpinner from "./spinner";
import { ReportSufficient } from "./sufficient";

const Report4FSReport = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(searchParams);
  const { data, isFetching } = useReportRetrospective({
    startDate: start,
    endDate: end,
    type,
  });
  const mutationState = useReportCreateState({
    type: RetrospectEnums.FOUR_F_S,
  });

  if (mutationState.length > 0 || isFetching) {
    return <ReportSpinner />;
  }

  if (isNil(data)) {
    return <ReportSufficient />;
  }
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <Report4FSResult />
    </div>
  );
};

export default Report4FSReport;
