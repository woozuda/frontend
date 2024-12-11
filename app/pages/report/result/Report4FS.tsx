"use client";

import useReport from "@/app/hooks/useReport";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import ReportCard from "@/components/ReportCard";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const Report4FSResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );

  const { data } = useReport({ startDate: start, endDate: end, type });

  if (data?.type !== RetrospectEnums.FOUR_FS) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-y-[60px]">
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">패턴 분석</h3>
        <ReportCard>
          <ReportCard.Content text={data.pattern_analysis} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">행동의 긍정적 측면</h3>
        <ReportCard>
          <ReportCard.Content text={data.positive_behavior} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">개선 제안</h3>
        <ReportCard>
          <ReportCard.Content text={data.improvement_suggest} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">활용 팁</h3>
        <ReportCard>
          <ReportCard.Content text={data.utilization_tips} />
        </ReportCard>
      </div>
    </div>
  );
};

export default Report4FSResult;
