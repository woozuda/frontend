import dynamic from "next/dynamic";

const DiaryResult = dynamic(() => import("./Diary"));
const Report4FSResult = dynamic(() => import("./Report4FS"));
const ReportKPTResult = dynamic(() => import("./ReportKPT"));
const ReportPMIResult = dynamic(() => import("./ReportPMI"));
const ReportSCSResult = dynamic(() => import("./ReportSCS"));

export {
  DiaryResult,
  Report4FSResult,
  ReportKPTResult,
  ReportPMIResult,
  ReportSCSResult,
};