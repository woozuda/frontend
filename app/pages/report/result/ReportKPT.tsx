"use client";

import useReportRetrospective from "@/app/hooks/useReportRetrospective";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import ReportCard from "@/components/ReportCard";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const ReportKPTResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );

  const { data } = useReportRetrospective({
    startDate: start,
    endDate: end,
    type,
  });

  if (data?.type !== RetrospectEnums.KPT) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-y-[60px]">
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">강점 분석</h3>
        <ReportCard>
          <ReportCard.Content text={data.strength_analysis} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">개선 제안</h3>
        <ReportCard>
          <ReportCard.Content text={data.improvement} />
        </ReportCard>
      </div>
    </div>
  );
};

export default ReportKPTResult;
