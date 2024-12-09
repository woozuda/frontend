import dynamic from "next/dynamic";

const DiaryCardList = dynamic(() => import("./List"));
const DiaryDateCount = dynamic(() => import("./DateCount"));
const DiaryDateNotes = dynamic(() => import("./DateNotes"));
const DiaryLatest = dynamic(() => import("./Latest"));

export { DiaryCardList, DiaryDateCount, DiaryDateNotes, DiaryLatest };
