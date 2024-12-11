import Report4FSResult from "./result/Report4FS";

export interface Report4FSReportProps {
  searchParams: Record<string, string>;
}

const Report4FSReport = (props: Report4FSReportProps) => {
  // return <ReportInsufficient />
  // return <ReportSufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <Report4FSResult searchParams={props.searchParams} />
    </div>
  );
};

export default Report4FSReport;
