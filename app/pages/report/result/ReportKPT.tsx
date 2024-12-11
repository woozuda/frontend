"use client";

import useReport from "@/app/hooks/useReport";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import ReportCard from "@/components/ReportCard";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface ReportKPTResultProps {
  searchParams: Record<string, string>;
}

const ReportKPTResult = (props: ReportKPTResultProps) => {
  const searchParams = new URLSearchParams(props.searchParams);
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );

  const { data } = useReport({ startDate: start, endDate: end, type });

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
