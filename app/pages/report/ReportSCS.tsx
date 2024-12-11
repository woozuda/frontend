import { ReportSCSResult } from "./result";

export interface ReportSCSReportProps {
  searchParams: Record<string, string>;
}

const ReportSCSReport = (props: ReportSCSReportProps) => {
  // return <ReportInsufficient />
  // return <ReportSufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <ReportSCSResult searchParams={props.searchParams} />
    </div>
  );
};

export default ReportSCSReport;
