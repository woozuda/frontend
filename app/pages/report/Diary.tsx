"use client";

import useNoteCount from "@/app/hooks/useNoteCount";
import useReportCreateState from "@/app/hooks/useReportCreateState";
import useReportDiary from "@/app/hooks/useReportDiary";
import { ReportLibs } from "@/app/lib/report";
import { useSearchParams } from "next/navigation";
import { isNil } from "ramda";
import { DiaryInsufficient } from "./insufficient";
import { DiaryResult } from "./result";
import ReportSpinner from "./spinner";
import { DiarySufficient } from "./sufficient";

const DiaryReport = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const { data: counts } = useNoteCount({ startDate: start, endDate: end });
  const { data, isFetching } = useReportDiary({
    startDate: start,
    endDate: end,
  });
  const mutationState = useReportCreateState({
    type: "DIARY",
  });

  if (mutationState.length > 0 || isFetching) {
    return <ReportSpinner />;
  }

  if (counts && counts.diary < 2) {
    return <DiaryInsufficient />;
  }

  if (isNil(data)) {
    return <DiarySufficient />;
  }
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <DiaryResult />
    </div>
  );
};

export default DiaryReport;
