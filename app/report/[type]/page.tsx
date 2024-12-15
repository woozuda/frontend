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
import { ReadonlyURLSearchParams } from "next/navigation";

interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default function Page(props: PageProps) {
  const param = props.params["type"] as ReportEnums;
  const searchParams = new URLSearchParams(props.searchParams);
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
        <ReportChipHeader searchParams={props.searchParams} />
      </div>
      {type === RetrospectEnums.FOUR_F_S && <Report4FSReport />}
      {type === RetrospectEnums.KPT && <ReportKPTReport />}
      {type === RetrospectEnums.PMI && <ReportPMIReport />}
      {type === RetrospectEnums.SCS && <ReportSCSReport />}
    </div>
  );
}
