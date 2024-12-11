import { ReportKPTResult } from "./result";

export interface ReportKPTReportProps {
  searchParams: Record<string, string>;
}

const ReportKPTReport = (props: ReportKPTReportProps) => {
  // return <ReportInsufficient />
  // return <ReportSufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <ReportKPTResult searchParams={props.searchParams} />
    </div>
  );
};

export default ReportKPTReport;
