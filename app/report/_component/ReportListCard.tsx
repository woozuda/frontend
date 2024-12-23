import { ReportLibs } from "@/app/lib/report";
import { cn } from "@/lib/utils";
import { addWeeks, endOfWeek, format, getYear, startOfWeek } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  start: Date;
  end: Date;
  eightWeeks: { start: string; end: string; date: Date; week: number }[];
};

function createRangeYear(date: Date) {
  const initialYear = 2024;
  const array = [] as number[];
  for (let index = initialYear; index <= getYear(date); index++) {
    array.push(index);
  }
  array.push(2025);
  return array;
}

function createFullWeeks(year: number) {
  const date = new Date(year, 0, 1);
  const initialStart = startOfWeek(date);
  const initialEnd = endOfWeek(date);
  let num = 0;
  const array = [] as [Date, Date][];
  while (true) {
    const start = addWeeks(initialStart, num);
    const end = addWeeks(initialEnd, num);
    if (getYear(start) <= year && getYear(end) <= year) {
      array.push([start, end]);
      num += 1;
    } else {
      break;
    }
  }
  return array;
}

const getHref = (start: Date, end: Date) => {
  const searchParams = new URLSearchParams();
  searchParams.set("start", format(start, "yyyy-MM-dd"));
  searchParams.set("end", format(end, "yyyy-MM-dd"));
  const api = `/report?${searchParams}`;
  return api;
};

export default function ReportListCard({ eightWeeks, start, end }: Props) {
  const date = useMemo(() => new Date(), []);
  const years = createRangeYear(date);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const weeks = useMemo(() => createFullWeeks(selectedYear), [selectedYear]);

  // const { data: ReportDiaryData, isFetching } = useReportDiary({
  //   startDate: start,
  //   endDate: end,
  // });
  // const { data: countsFour } = useReportCount({
  //   startDate: start,
  //   endDate: end,
  //   type: RetrospectEnums.FOUR_F_S,
  // });
  // const { data: countsKPT } = useReportCount({
  //   startDate: start,
  //   endDate: end,
  //   type: RetrospectEnums.KPT,
  // });
  // const { data: countsPMI } = useReportCount({
  //   startDate: start,
  //   endDate: end,
  //   type: RetrospectEnums.PMI,
  // });
  // const { data: countsSCS } = useReportCount({
  //   startDate: start,
  //   endDate: end,
  //   type: RetrospectEnums.SCS,
  // });
  // const { data: aiData } = useAiCreation({ startDate: start, endDate: end });

  // const getHref = (week: { start: string; end: string }) => {
  //   if (ReportDiaryData) {
  //     return `/report/common/?start=${week.start}&end=${week.end}`;
  //   }
  //   if (countsFour && countsFour > 0) {
  //     return `/report/retrospective?type=FOUR_F_S&start=${week.start}&end=${week.end}`;
  //   }
  //   if (countsKPT && countsKPT > 0) {
  //     return `/report/retrospective?type=KPT&start=${week.start}&end=${week.end}`;
  //   }
  //   if (countsPMI && countsPMI > 0) {
  //     return `/report/retrospective?type=PMI&start=${week.start}&end=${week.end}`;
  //   }
  //   if (countsSCS && countsSCS > 0) {
  //     return `/report/retrospective?type=SCS&start=${week.start}&end=${week.end}`;
  //   }
  //   if (aiData) {
  //     return `/report/creation?start=${week.start}&end=${week.end}`;
  //   }
  //   return "/report/common";
  // };

  return (
    <div className="w-full flex flex-col gap-y-2 pt-6">
      <div className="w-full overflow-scroll scrollbar-hide px-5 flex gap-x-3">
        {years.map((year) => {
          const className = cn(
            "!text-sub4 w-[95px] h-[30px] rounded-[30px] flex justify-center items-center",
            selectedYear === year
              ? "bg-app-gray-1200 text-white"
              : "bg-app-primary-400 text-app-primary-200"
          );
          return (
            <button
              key={year}
              className={className}
              onClick={() => {
                setSelectedYear(year);
              }}
            >
              {year}
            </button>
          );
        })}
      </div>
      <div className="w-full px-4">
        {weeks.map((week, index) => {
          const [start, end] = week;
          const [date, weekNum] = ReportLibs.getWeekNumber(start, end);
          const startLabel = format(start, "MM월 dd일");
          const endLabel = format(end, "MM월 dd일");
          const label = `${startLabel} ~ ${endLabel}`;
          const title = `${format(date, "MM")}월 ${String(weekNum).padStart(
            2,
            "0"
          )}주차`;

          return (
            <div key={index}>
              <div className="w-full flex flex-col gap-4 p-4 mt-4 rounded-lg bg-app-primary-200">
                <div className="flex items-center text-white text-lg">
                  <div>{title}</div>
                  <div className="flex gap-2 ml-auto">
                    <div className="flex items-center text-app-gray-400 text-xs">
                      {label}
                    </div>
                    <Link href={getHref(start, end)}>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* {ReportDiaryData && (
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
                )} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
