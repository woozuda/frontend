"use client";

import { CalendarDotSvg, PencilFlatSvg, Star28Svg } from "@/app/assets/icons";
import { ReportLibs } from "@/app/lib/report";
import { useSearchParams } from "next/navigation";
import InsufficientHeader from "./Header";
import InsufficientItem from "./Item";

const DiaryInsufficient = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);

  return (
    <div className="w-full flex flex-col gap-y-16 px-5 pb-4">
      <div className="w-full h-px" />
      <InsufficientHeader
        icon={<Star28Svg className="text-white" />}
        text="이번 주에 분석할 일기를 작성해 주세요."
      />
      <div className="w-full flex flex-col gap-y-3">
        <InsufficientItem
          icon={<PencilFlatSvg className="text-white" />}
          text="일기 쓰기"
        />
        <InsufficientItem
          icon={<CalendarDotSvg className="text-white" />}
          text="오늘의 질문 쓰기"
        />
      </div>
    </div>
  );
};

export default DiaryInsufficient;
