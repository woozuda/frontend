"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Props = {
  noteItem: {
    type: "COMMON" | "QUESTION" | "RETROSPECT";
    note: {
      id: number;
      title: string;
      diart: number;
      framework?: string;
      content: string[];
      question?: string;
    };
    image: string;
  };
  mode: "view" | "edit";
  noShareList: number[];
  setNoShareList: Dispatch<SetStateAction<number[]>>;
};

export default function SharedCard({
  noteItem,
  mode,
  noShareList,
  setNoShareList,
}: Props) {
  const [selected, setSelected] = useState(false);

  const onClickNotShare = () => {
    const isSelected = noShareList.includes(noteItem.note.id);
    setSelected(!isSelected);
    setNoShareList((prev) =>
      isSelected
        ? prev.filter((id) => id !== noteItem.note.id)
        : [...prev, noteItem.note.id]
    );
  };

  useEffect(() => {
    console.log(noShareList);
  }, [noShareList]);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-app-primary-200 rounded-lg">
      <div className="flex items-center">
        {
          noteItem.type === "RETROSPECT" &&
          <div className="mr-auto p-1 rounded-xl bg-app-primary-400 border-none text-sm text-white text-center font-light">
              회고일기
          </div>
        }
        {mode === "edit" && (
          <Checkbox
            className="w-5 h-5 ml-auto rounded-full border-2 border-white"
            onCheckedChange={onClickNotShare}
          />
        )}
      </div>
      <h1 className="text-xl font-bold">{noteItem.note.title}</h1>
      {noteItem.image && (
        <Image className="rounded-lg" src={noteItem.image} width={400} height={400} alt="img" />
      )}
      {noteItem.note.question && (
        <span className="">{noteItem.note.question}</span>
      )}
      {noteItem.note.framework && (
        <span className="">{noteItem.note.framework}</span>
      )}
      <span className="line-clamp-3 text-slate-300">
        {noteItem.note.content}
      </span>
    </div>
  );
}
