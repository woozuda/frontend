import { ReportChipHeader, ReportHeader } from "@/app/pages/report";
import { ReportResult } from "@/app/pages/report/result";

interface PageProps {
  searchParams: Record<string, string>;
}

export default function Page(props: PageProps) {
  return (
    <div className="w-full flex flex-col gap-y-3 pb-5">
      <ReportHeader searchParams={props.searchParams} />
      <div className="flex flex-col w-full px-5">
        <ReportChipHeader searchParams={props.searchParams} />
      </div>
      <div className="flex flex-col w-full px-5 py-1">
        <ReportResult searchParams={props.searchParams} />
      </div>
    </div>
  );
}
