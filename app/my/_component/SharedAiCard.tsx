"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Props = {
    ai: {
        ai_creation_id: number;
        creationType: "POETRY" | "NOVEL";
        start_date: string;
        end_date: string;
        image_url: string;
        text: string
      }
  mode: "view" | "edit";
  noShareList: number[];
  setNoShareList: Dispatch<SetStateAction<number[]>>;
};

export default function SharedCard({
  ai,
  mode,
  noShareList,
  setNoShareList,
}: Props) {
  const [selected, setSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onClickNotShare = () => {
    const isSelected = noShareList.includes(ai.ai_creation_id);
    setSelected(!isSelected);
    setNoShareList((prev) =>
      isSelected
        ? prev.filter((id) => id !== ai.ai_creation_id)
        : [...prev, ai.ai_creation_id]
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
              <div className="text-slate-300">{`${ai.start_date} ~ ${ai.end_date}`}</div>
            }
          </div>
        </div>
        {mode === "view" ? (
          <div className="ml-auto py-1 px-2 rounded-xl bg-app-primary-400 border-none text-xs text-white text-center font-light">
            {ai.creationType}
          </div>
        ) : (
          <Checkbox
            className="w-5 h-5 ml-auto rounded-full border-2 border-white"
            onCheckedChange={onClickNotShare}
          />
        )}
      </div>
      {ai.image_url && (
        <Image src={ai.image_url} width={400} height={400} alt="img" />
      )}
      <div className="flex flex-col gap-4">
        <div className={`flex gap-2 text-slate-300 ${expanded && "flex-col"}`}>
          <span className={`${expanded ? "" : "line-clamp-1"} flex-grow`}>
            {ai.text}
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
