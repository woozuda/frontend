import { ReportPMIResult } from "./result";

export interface ReportPMIReportProps {
  searchParams: Record<string, string>;
}

const ReportPMIReport = (props: ReportPMIReportProps) => {
  // return <ReportInsufficient />
  // return <ReportSufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <ReportPMIResult searchParams={props.searchParams} />
    </div>
  );
};

export default ReportPMIReport;
