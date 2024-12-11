import { DiaryResult } from "./result";

export interface DiaryReportProps {
  searchParams: Record<string, string>;
}

const DiaryReport = (props: DiaryReportProps) => {
  // return <DiaryInsufficient />
  // return <DiarySufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <DiaryResult searchParams={props.searchParams} />
    </div>
  );
};

export default DiaryReport;
