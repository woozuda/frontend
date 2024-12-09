"use client";

import DiaryCard from "@/components/DiaryCard";
import useDiaries from "../hooks/useDiaries";

import PlusSvg from "@/app/assets/icons/Plus.svg";
import Star28Svg from "@/app/assets/icons/Star28.svg";
import AddDiary from "@/components/AddDiary";
import Link from "next/link";

export default function Page() {
  const { array } = useDiaries();

  return (
    <div className="flex w-full flex-col h-full relative">
      <div className="w-full flex flex-col gap-y-[60px]">
        <div className="flex w-full p-5">
          <div className="w-full flex flex-col gap-y-6">
            <div className="w-full flex flex-col gap-y-3">
              <h1 className="text-h1 text-white">오늘의 질문</h1>
              <p className="text-body2 text-app-gray-200">
                생각나는 주제가 없을 때 AI가 적당한 주제로 오늘의 질문을
                생성해요.
              </p>
            </div>
            <div className="flex w-full gap-x-2 items-center">
              <div className="w-12 flex justify-center items-center">
                <Star28Svg className="text-white" />
              </div>
              <div className="flex items-center w-full bg-gradient-to-r from-gradient-02-100 to-gradient-02-200 px-5 py-4 rounded-lg">
                <p className="text-white whitespace-break-spaces">
                  {"오늘 어쩌구 주제로\n일기를 써보는 건 어떠세요?"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-y-8 flex flex-col">
          <div className="flex px-5">
            <h2 className="text-h1 text-white">내 다이어리</h2>
          </div>
          <div className="w-full flex overflow-x-scroll scrollbar-hide h-[320px]">
            <div className="h-full w-5 bg-transparent shrink-0" />
            <div className="flex gap-x-5 items-center h-full">
              {array?.map((diary) => {
                return (
                  <Link href={`/diary/${diary.id}`} key={diary.id}>
                    <DiaryCard diary={diary} />
                  </Link>
                );
              })}
              <AddDiary icon={<PlusSvg className="text-white" />} />
            </div>
            <div className="shrink-0 h-full w-5 bg-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
