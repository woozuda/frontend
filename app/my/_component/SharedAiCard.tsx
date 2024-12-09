"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type PlaylistItem = {
  title: string;
  artist: string;
};

type Props = {
  aiItem: {
    date: Date;
    ai: {
      type: "그림과소설" | "그림과시" | "플레이리스트"; // AI 생성물 타입
      id: number; // 고유 ID
      title?: string; // 제목
      content?: string; // 설명 (선택적)
      image?: string; // 이미지 URL (선택적)
      playList?: PlaylistItem[]; // 플레이리스트 (플레이리스트 타입일 경우)
    };
  };
  mode: "view" | "edit";
  noShareList: number[];
  setNoShareList: Dispatch<SetStateAction<number[]>>;
};

export default function SharedCard({
  aiItem,
  mode,
  noShareList,
  setNoShareList,
}: Props) {
  const [selected, setSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onClickNotShare = () => {
    const isSelected = noShareList.includes(aiItem.ai.id);
    setSelected(!isSelected);
    setNoShareList((prev) =>
      isSelected
        ? prev.filter((id) => id !== aiItem.ai.id)
        : [...prev, aiItem.ai.id]
    );
  };

  useEffect(() => {
    console.log(noShareList);
  }, [noShareList]);

  return (
    <div className="w-full flex flex-col gap-2 p-4 border border-slate-700 rounded-lg">
      <div className="flex items-center">
        <div className="flex gap-2 text-sm">
          <div className="text-slate-300">
            {
              <div className="text-slate-300">{`${new Date(
                aiItem.date
              ).getFullYear()}년 ${new Date(
                aiItem.date
              ).getMonth()}월 ${new Date(aiItem.date).getDate()}일`}</div>
            }
          </div>
          <span>~</span>
          <div className="text-slate-300">{`${new Date(aiItem.date).getMonth()}월 ${new Date(
            aiItem.date
          ).getDate()}일`}</div>
        </div>
        {mode === "view" ? (
          <div className="ml-auto py-1 px-2 rounded-xl bg-app-primary-400 border-none text-xs text-white text-center font-light">
            {aiItem.ai.type}
          </div>
        ) : (
          <Checkbox
            className="w-5 h-5 ml-auto rounded-full border-2 border-white"
            onCheckedChange={onClickNotShare}
          />
        )}
      </div>
      {aiItem.ai.image && (
        <Image src={aiItem.ai.image} width={400} height={400} alt="img" />
      )}
      <h1 className="text-xl font-bold">{aiItem.ai.title}</h1>
      <div className="flex flex-col gap-4">
        <div className={`flex gap-2 text-slate-300 ${expanded && "flex-col"}`}>
          <span className={`${expanded ? "" : "line-clamp-1"} flex-grow`}>
            {aiItem.ai.content}
          </span>
          <div
            className="flex flex-col justify-end items-center ml-auto basis-1/6 flex-shrink-0"
            onClick={() => setExpanded(!expanded)}
          >
            <span>{expanded ? "접기" : "더보기"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
