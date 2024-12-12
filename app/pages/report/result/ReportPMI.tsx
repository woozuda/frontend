"use client";

import useReport from "@/app/hooks/useReport";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import ReportCard from "@/components/ReportCard";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const ReportPMIResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );

  const { data } = useReport({ startDate: start, endDate: end, type });

  if (data?.type !== RetrospectEnums.PMI) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-y-[60px]">
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">{"강점 (Positive)"}</h3>
        <ReportCard>
          <ReportCard.Content text={data.positive} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">{"문제점 (Minus)"}</h3>
        <ReportCard>
          <ReportCard.Content text={data.minus} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">{"흥미 요소 (Interesting)"}</h3>
        <ReportCard>
          <ReportCard.Content text={data.interesting} />
        </ReportCard>
      </div>
    </div>
  );
};

export default ReportPMIResult;
