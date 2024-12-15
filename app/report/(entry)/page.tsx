import { DiaryReport } from "@/app/pages/report";
import { ReportHeader } from "@/app/pages/report/header";

export default function Page() {
  return (
    <div className="w-full flex gap-y-3 flex-col pb-5 h-full">
      <ReportHeader />
      <div className="flex flex-col w-full px-5 py-4 h-full">
        <DiaryReport />
      </div>
    </div>
  );
}
