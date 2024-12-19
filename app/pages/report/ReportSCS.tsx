"use client";

import useNoteCount from "@/app/hooks/useNoteCount";
import useReportCreateState from "@/app/hooks/useReportCreateState";
import useReportRetrospective from "@/app/hooks/useReportRetrospective";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import { useSearchParams } from "next/navigation";
import { isNil } from "ramda";
import { ReportInsufficient } from "./insufficient";
import { ReportSCSResult } from "./result";
import ReportSpinner from "./spinner";
import { ReportSufficient } from "./sufficient";

const ReportSCSReport = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(searchParams);
  const { data, isFetching } = useReportRetrospective({
    startDate: start,
    endDate: end,
    type,
  });
  const { data: counts } = useNoteCount({
    startDate: start,
    endDate: end,
  });

  const mutationState = useReportCreateState({
    type: RetrospectEnums.SCS,
  });

  if (mutationState.length > 0 || isFetching) {
    return <ReportSpinner />;
  }
  if (counts && counts.retrospective < 2) {
    return <ReportInsufficient />;
  }
  if (isNil(data)) {
    return <ReportSufficient />;
  }
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <ReportSCSResult />
    </div>
  );
};

export default ReportSCSReport;
