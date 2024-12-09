"use client";

import { DiaryLibs, DiaryListType } from "@/app/lib/diary";
import { DiaryCardList, DiaryDates, DiaryLatest } from "@/app/pages/diary";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const listType = DiaryLibs.getListType(searchParams);
  return (
    <div className="flex w-full flex-col p-5 relative">
      {listType === DiaryListType.DEFAULT && <DiaryCardList />}
      {listType === DiaryListType.DATES && <DiaryDates />}
      {listType === DiaryListType.LATEST && <DiaryLatest />}
    </div>
  );
}
