import { ReportHeader } from "@/app/pages/report/header";
import { DiaryResult } from "@/app/pages/report/result";

interface PageProps {
  searchParams: Record<string, string>;
}

export default function Page(props: PageProps) {
  return (
    <div className="w-full flex flex-col pb-5 h-full">
      <ReportHeader searchParams={props.searchParams} />
      <div className="flex flex-col w-full px-5 py-4">
        <DiaryResult searchParams={props.searchParams} />
      </div>
    </div>
  );
}
