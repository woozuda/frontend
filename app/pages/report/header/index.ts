import dynamic from "next/dynamic";

const ReportHeader = dynamic(() => import("./Header"));
const ReportChipHeader = dynamic(() => import("./ReportChip"));

export { ReportChipHeader, ReportHeader };
