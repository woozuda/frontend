"use client";

import useDiaryAnalysis from "@/app/hooks/useDiaryAnalysis";
import { ReportLibs } from "@/app/lib/report";
import ReportCard from "@/components/ReportCard";

interface DiaryResultProps {
  searchParams: Record<string, string>;
}

const DiaryResult = (props: DiaryResultProps) => {
  const searchParams = new URLSearchParams(props.searchParams);
  const [start, end] = ReportLibs.getPeriod(searchParams);

  const { data } = useDiaryAnalysis({ startDate: start, endDate: end });

  return (
    <div className="flex flex-col w-full gap-y-[60px]">
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-sub3 text-white">키워드 분석</h3>
        <ReportCard>
          <ReportCard.SubTitle title="주요 장소" />
          <ReportCard.Content text={data?.place} />
        </ReportCard>
        <ReportCard>
          <ReportCard.SubTitle title="주요 활동" />
          <ReportCard.Content text={data?.activity} />
        </ReportCard>
        <ReportCard>
          <ReportCard.SubTitle title="주요 감정" />
          <ReportCard.Content text={data?.emotion} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-sub3 text-white">이번 주 날씨에 따른 내 모습</h3>
        <ReportCard>
          <ReportCard.SubTitle title="날씨" />
          <ReportCard.Content text={data?.weather} />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-sub3 text-white">주로 일기 쓰는 시간</h3>
        <ReportCard>
          <ReportCard.SubTitle title="주로 밤 10시에 작성해요" />
          <ReportCard.Content text="성찰적이고 차분한 기록이 많아요" />
        </ReportCard>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h3 className="text-sub3 text-white">새로운 기록 제안</h3>
        <ReportCard>
          <ReportCard.Suggestion
            suggestions={[
              {
                type: data?.suggestion ?? "제안",
                content: data?.suggestion ?? "",
              },
            ]}
          />
        </ReportCard>
      </div>
    </div>
  );
};

export default DiaryResult;
