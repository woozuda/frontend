"use client";

import PlusSvg from "@/app/assets/icons/Plus.svg";
import useDiaries from "@/app/hooks/useDiaries";
import AddDiary from "@/components/AddDiary";
import DiaryCard from "@/components/DiaryCard";

const DiaryCardList = () => {
  const { array } = useDiaries();

  return (
    <div className="flex flex-col w-full gap-y-4">
      {array?.map((diary) => {
        return <DiaryCard key={diary.id} diary={diary} className="w-full" />;
      })}
      <AddDiary icon={<PlusSvg />} className="w-full h-[120px]" />
    </div>
  );
};

export default DiaryCardList;
