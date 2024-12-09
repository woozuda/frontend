"use client";

import { ArrowLeftSmallSvg, ArrowRightSmallSvg } from "@/app/assets/icons";
import { ReportLibs } from "@/app/lib/report";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const ReportHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const [date, week] = ReportLibs.getWeekNumber(start, end);

  const text = ReportLibs.getWeekText(date, week);

  const prevHref = ReportLibs.createPrevHref(
    pathname,
    searchParams,
    start,
    end
  );
  const nextHref = ReportLibs.createNextHref(
    pathname,
    searchParams,
    start,
    end
  );

  return (
    <div className="w-full h-20 flex items-center justify-center">
      <div className="w-full flex items-center gap-x-3">
        <div className="w-10 h-10"></div>
        <div className="flex w-full items-center gap-x-3 justify-center">
          <Link href={prevHref}>
            <ArrowLeftSmallSvg className="text-white" />
          </Link>
          <h4 className="text-white text-sub4">{text}</h4>
          <Link href={nextHref}>
            <ArrowRightSmallSvg className="text-white" />
          </Link>
        </div>
        <div className="w-10 h-10"></div>
      </div>
    </div>
  );
};

export default ReportHeader;
