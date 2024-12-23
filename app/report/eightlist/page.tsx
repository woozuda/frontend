"use client";

import { useSearchParams } from "next/navigation";
import { getEightWeeks } from "../_lib/getEightWeeks";
import { useEffect, useState } from "react";
import ReportListCard from "../_component/ReportListCard";
import BackButton from "@/app/_component/BackButton";
import { ReportLibs } from "@/app/lib/report";


type WeekRange = { start: string; end: string; date: Date; week: number };

export default function EightListPage() {
  const searchParams = useSearchParams();

  const [start, end] = ReportLibs.getPeriod(searchParams);
  const [eightWeeks, setEightWeeks] = useState<WeekRange[]>([]);

  useEffect(() => {
    const res: WeekRange[] = getEightWeeks(start, end);
    setEightWeeks(res);
  }, []);
  return (
    <main className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950 py-6 pb-[70px]">
      <section className="w-full px-4">
        <div className="flex gap-6">
          <BackButton />
          <h1 className="font-bold text-white">분석내역 보기</h1>
        </div>
      </section>
      <ReportListCard eightWeeks={eightWeeks} start={start} end={end}/>
    </main>
  );
}
