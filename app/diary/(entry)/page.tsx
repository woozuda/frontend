"use client";

import useDiaries from "@/app/hooks/useDiaries";
import { DiaryLibs, DiaryListType } from "@/app/lib/diary";
import {
  DiaryCardList,
  DiaryDateCount,
  DiaryDateNotes,
  DiaryLatest,
} from "@/app/pages/diary";
import { DiaryEmptyBanner } from "@/app/pages/diary/Empty";
import { DiaryLayout, DiaryLoadingLayout } from "@/app/pages/diary/layout";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { isNotNil } from "ramda";

export default function Page() {
  const searchParams = useSearchParams();
  const { array, isLoading } = useDiaries();
  const listType = DiaryLibs.getListType(searchParams);
  const diaryDate = DiaryLibs.getDiaryDate(searchParams);

  if (isLoading) {
    return (
      <DiaryLoadingLayout>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
        </div>
      </DiaryLoadingLayout>
    );
  }

  if (array && array.length === 0) {
    return (
      <DiaryLoadingLayout>
        <DiaryEmptyBanner />
      </DiaryLoadingLayout>
    );
  }

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
