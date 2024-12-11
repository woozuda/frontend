"use client";

import useReport from "@/app/hooks/useReport";
import { ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import ReportCard from "@/components/ReportCard";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface ReportSCSResultProps {
  searchParams: Record<string, string>;
}

const ReportSCSResult = (props: ReportSCSResultProps) => {
  const searchParams = new URLSearchParams(props.searchParams);
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );

  const { data } = useReport({ startDate: start, endDate: end, type });

  if (data?.type !== RetrospectEnums.SCS) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-y-[60px]">
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">Start</h3>
        <ReportCard>
          <ReportCard.Content text={data.start_summary} />
        </ReportCard>
        <ReportCard>
          <ReportCard.Suggestion
            suggestions={[
              { type: "강점", content: data.start_strength },
              { type: "제안", content: data.start_suggestion },
            ]}
          />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">Continue</h3>
        <ReportCard>
          <ReportCard.Content text={data.continue_summary} />
        </ReportCard>
        <ReportCard>
          <ReportCard.Suggestion
            suggestions={[
              { type: "강점", content: data.continue_strength },
              { type: "제안", content: data.continue_suggestion },
            ]}
          />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">Stop</h3>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-white text-h3">실행 계획 및 개선 방안</h3>
      </div>
    </div>
  );
};

export default ReportSCSResult;
