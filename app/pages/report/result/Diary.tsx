"use client";

import useReportDiary from "@/app/hooks/useReportDiary";
import { DiaryLibs } from "@/app/lib/diary";
import { ReportLibs } from "@/app/lib/report";
import Chart from "@/components/Chart";
import ReportCard from "@/components/ReportCard";
import { useSearchParams } from "next/navigation";

const DiaryResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);

  const { data } = useReportDiary({ startDate: start, endDate: end });

  const chartData = data ? DiaryLibs.getChartData(data) : undefined;

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
        <h3 className="text-sub3 text-white">감정 비율 분석</h3>
        {chartData && (
          <div className="flex gap-x-10 justify-center">
            <div className="flex w-20 flex-col gap-y-3 shrink-0">
              <div className="flex items-center gap-x-2">
                <div className="flex justify-center items-center rounded-sm bg-gradient-to-r from-gradient-02-100 to-gradient-02-200 h-[22px] px-3">
                  <span className="text-sub5 text-white whitespace-nowrap">
                    긍정
                  </span>
                </div>
                <div>
                  <span className="text-sub5 text-white">
                    {chartData.labels.positive}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-app-primary-200 flex justify-center items-center px-3 rounded-sm h-[22px]">
                  <span className="text-sub5 text-app-primary-300 whitespace-nowrap">
                    부정
                  </span>
                </div>
                <div>
                  <span className="text-app-primary-300 text-sub5">
                    {chartData.labels.denial}
                  </span>
                </div>
              </div>
            </div>
            <Chart data={chartData.data} />
            <div className="flex w-20"></div>
          </div>
        )}
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
