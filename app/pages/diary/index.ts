import dynamic from "next/dynamic";

const DiaryCardList = dynamic(() => import("./List"));
const DiaryDates = dynamic(() => import("./Dates"));
const DiaryNotes = dynamic(() => import("./Notes"));

export { DiaryCardList, DiaryDates, DiaryNotes };
