"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";

type Props = {
  noteItem: {
    type: "COMMON" | "QUESTION" | "RETROSPECT";
    note: {
      id: number;
      title: string;
      diary: string;
      type?: string;
      noteContents: string[];
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
    <div className="flex flex-col w-full gap-4 p-4 bg-app-primary-200 rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        {noteItem.type === "RETROSPECT" && (
          <div className="mr-auto p-1 rounded-xl bg-app-primary-400 border-none text-sm text-white text-center font-light">
            회고일기
          </div>
        )}
        <div className="flex w-full">
          <Link
            className="w-full"
            href={`/note/${noteItem.type.toLowerCase()}/${noteItem.note.id}`}
          >
            <h1 className="text-xl font-bold">{noteItem.note.title}</h1>
          </Link>
          {mode === "edit" && (
            <Checkbox
              className="w-5 h-5 ml-auto rounded-full border-2 border-white pointer-events-auto"
              onCheckedChange={onClickNotShare}
            />
          )}
        </div>
      </div>
      {/* {noteItem.note.question && (
        <span className="">{noteItem.note.question}</span>
      )} */}
      {/* {noteItem.note.type && (
        <span className="">{noteItem.note.type}</span>
      )} */}
      <Link
        className="w-full"
        href={`/note/${noteItem.type.toLowerCase()}/${noteItem.note.id}`}
      >
        <div className="flex flex-col gap-1">
          {noteItem.note.noteContents &&
            noteItem.note.noteContents
              .slice(0, 3)
              .map((content, index, array) => (
                <p
                  key={content}
                  dangerouslySetInnerHTML={{
                    __html:
                      content +
                      (index === array.length - 1 &&
                      noteItem.note.noteContents.length > 3
                        ? " ..."
                        : ""),
                  }}
                  className="text-slate-300"
                ></p>
              ))}
        </div>
      </Link>
    </div>
  );
}
