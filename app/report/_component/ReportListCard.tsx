import ArrowRightIcon from "@/app/assets/icons/ArrowRightSmall.svg";
import Link from "next/link";
import { isNotNil } from "ramda";
import { RetrospectEnums } from "@/app/models/report";
import useReportDiary from "@/app/hooks/useReportDiary";
import useReportCount from "@/app/hooks/useReportCount";
import useAiCreation from "@/app/hooks/useAiCreation";

type Props = {
  start: Date;
  end: Date;
  eightWeeks: { start: string; end: string; date: Date; week: number }[];
};

export default function ReportListCard({ eightWeeks, start, end }: Props) {
  const { data: ReportDiaryData, isFetching } = useReportDiary({
    startDate: start,
    endDate: end,
  });
  const { data: countsFour } = useReportCount({
    startDate: start,
    endDate: end,
    type: RetrospectEnums.FOUR_F_S,
  });
  const { data: countsKPT } = useReportCount({
    startDate: start,
    endDate: end,
    type: RetrospectEnums.KPT,
  });
  const { data: countsPMI } = useReportCount({
    startDate: start,
    endDate: end,
    type: RetrospectEnums.PMI,
  });
  const { data: countsSCS } = useReportCount({
    startDate: start,
    endDate: end,
    type: RetrospectEnums.SCS,
  });
  const { data: aiData } = useAiCreation({ startDate: start, endDate: end });

  const getHref = (week: { start: string; end: string }) => {
    if (ReportDiaryData) {
      return `/report/common/?start=${week.start}&end=${week.end}`;
    }
    if (countsFour && countsFour > 0) {
      return `/report/retrospective?type=FOUR_F_S&start=${week.start}&end=${week.end}`;
    }
    if (countsKPT && countsKPT > 0) {
      return `/report/retrospective?type=KPT&start=${week.start}&end=${week.end}`;
    }
    if (countsPMI && countsPMI > 0) {
      return `/report/retrospective?type=PMI&start=${week.start}&end=${week.end}`;
    }
    if (countsSCS && countsSCS > 0) {
      return `/report/retrospective?type=SCS&start=${week.start}&end=${week.end}`;
    }
    if (aiData) {
      return `/report/creation?start=${week.start}&end=${week.end}`;
    }
    return "/report/common";
  };

  return (
    <div className="w-full mt-6 px-4">
      {eightWeeks.map((week, index) => (
        <div key={index}>
          <div className="w-full flex flex-col gap-4 p-4 mt-4 rounded-lg bg-app-primary-200">
            <div className="flex items-center text-white text-lg">
              <div>{`${week.date.getMonth() + 1}월 ${week.week}주차`}</div>
              <div className="flex gap-2 ml-auto">
                <div className="flex items-center text-app-gray-400 text-xs">
                  {`${
                    new Date(week.start as string).getMonth() + 1
                  }월 ${new Date(week.start as string).getDate()}일 ~ ${
                    new Date(week.end as string).getMonth() + 1
                  }월 ${new Date(week.end as string).getDate()}일`}
                </div>
                <Link href={getHref(week)}>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
            <div className="flex gap-2">
              {ReportDiaryData && (
                <div className="bg-app-primary-400 rounded-lg p-1 text-xs font-thin text-app-gray-400">
                  <span>자유일기</span>
                </div>
              )}
              {(isNotNil(countsFour) && countsFour > 0) ||
                (isNotNil(countsKPT) && countsKPT > 0) ||
                (isNotNil(countsPMI) && countsPMI > 0) ||
                (isNotNil(countsSCS) && countsSCS > 0 && (
                  <div className="bg-app-primary-400 rounded-lg p-1 text-xs font-thin text-app-gray-400">
                    <span>회고일기</span>
                  </div>
                ))}
              {aiData && (
                <div className="bg-app-primary-400 rounded-lg p-1 text-xs font-thin text-app-gray-400">
                  <span>AI 창작</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
