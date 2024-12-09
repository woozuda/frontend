import dynamic from "next/dynamic";

const DiaryCardList = dynamic(() => import("./List"));
const DiaryDates = dynamic(() => import("./Dates"));
const DiaryLatest = dynamic(() => import("./Latest"));

export { DiaryCardList, DiaryDates, DiaryLatest };
