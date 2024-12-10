"use client";

import { DiaryLibs, DiaryListType } from "@/app/lib/diary";
import {
  DiaryCardList,
  DiaryDateCount,
  DiaryDateNotes,
  DiaryLatest,
} from "@/app/pages/diary";
import { DiaryLayout } from "@/app/pages/diary/layout";
import { useSearchParams } from "next/navigation";
import { isNotNil } from "ramda";

export default function Page() {
  const searchParams = useSearchParams();
  const listType = DiaryLibs.getListType(searchParams);
  const diaryDate = DiaryLibs.getDiaryDate(searchParams);

  if (isNotNil(diaryDate)) {
    return <DiaryDateNotes />;
  }

  return (
    <>
      {listType === DiaryListType.DEFAULT && (
        <DiaryLayout>
          <div className="flex w-full flex-col p-5 relative">
            <DiaryCardList />
          </div>
        </DiaryLayout>
      )}
      {listType === DiaryListType.DATES && (
        <DiaryLayout>
          <div className="flex w-full flex-col p-5 relative">
            <DiaryDateCount />
          </div>
        </DiaryLayout>
      )}
      {listType === DiaryListType.LATEST && (
        <DiaryLayout>
          <div className="flex w-full flex-col p-5 relative">
            <DiaryLatest />
          </div>
        </DiaryLayout>
      )}
    </>
  );
}
