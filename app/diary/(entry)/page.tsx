"use client";

import { DiaryLibs, DiaryListType } from "@/app/lib/diary";
import {
  DiaryCardList,
  DiaryDateCount,
  DiaryDateNotes,
  DiaryLatest,
} from "@/app/pages/diary";
import { DiaryLayout } from "@/app/pages/diary/layout";
import { isNotNil } from "ramda";

interface PageProps {
  searchParams: Record<string, string>;
}

export default function Page(props: PageProps) {
  const searchParams = new URLSearchParams(props.searchParams);
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
