"use client";

import { Star28Svg } from "@/app/assets/icons";
import useReportCreate from "@/app/hooks/useReportCreate";
import { ReportLibs } from "@/app/lib/report";
import { useSearchParams } from "next/navigation";
import SufficientItem from "./Item";

const DiarySufficient = () => {
  const { mutateAsync } = useReportCreate();
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  return (
    <SufficientItem
      icon={<Star28Svg className="text-white" />}
      text="이번주 일기를 분석해 보세요"
      onClick={() => {
        mutateAsync({ startDate: start, endDate: end, type: "DIARY" });
      }}
    />
  );
};

export default DiarySufficient;
