"use client";

import { ReportEnums, ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import {
  DiaryReport,
  Report4FSReport,
  ReportKPTReport,
  ReportPMIReport,
  ReportSCSReport,
} from "@/app/pages/report";
import { ReportChipHeader, ReportHeader } from "@/app/pages/report/header";
import {
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from "next/navigation";

export default function Page() {
  const params = useParams<{ type: string }>();
  const param = params.type;
  const searchParams = useSearchParams();
  const type = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );
  if (param === ReportEnums.COMMON) {
    return (
      <div className="w-full flex flex-col gap-y-3 pb-5 h-full items-center">
        <ReportHeader />
        <div className="flex flex-col w-full px-5 py-4 h-full">
          <DiaryReport />
        </div>
      </div>
    );
  }
  if (param === ReportEnums.CREATION) {
    return (
      <div className="w-full flex flex-col gap-y-3 pb-5 h-full">
        <ReportHeader />
        <div className="flex flex-col w-full px-5 py-4">
          {/* <DiaryResult /> */}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-y-3 pb-5 h-full">
      <ReportHeader />
      <div className="flex flex-col w-full px-5">
        <ReportChipHeader />
      </div>
      {type === RetrospectEnums.FOUR_F_S && <Report4FSReport />}
      {type === RetrospectEnums.KPT && <ReportKPTReport />}
      {type === RetrospectEnums.PMI && <ReportPMIReport />}
      {type === RetrospectEnums.SCS && <ReportSCSReport />}
    </div>
  );
}
