"use client";

import SharedNotes from "../_component/SharedNotes";
import SharedAi from "../_component/SharedAi";
import { useState } from "react";

type Props = {
  shortlink: string
}

export default function SharedTab({ shortlink }: Props) {
  const [tab, setTab] = useState<"note" | "ai">("note");
  
  const onClickTab = () => {
    if (tab === "note") {
      setTab("ai");
    } else {
      setTab("note");
    }
  };

  return (
    <>
      <div className="w-full h-14 flex justify-center">
        <div
          className={`flex-1 flex justify-center items-center ${
            tab === "note" && "border-b-2"
          }`}
          onClick={onClickTab}
        >
          <span className="w-full text-center">공유한 일기</span>
        </div>
        <div
          className={`flex-1 flex justify-center items-center ${
            tab === "ai" && "border-b-2"
          }`}
          onClick={onClickTab}
        >
          <span className="w-full text-center">AI 창작 콘텐츠</span>
        </div>
      </div>
      {tab === "note" ? <SharedNotes/> : <SharedAi/>}
    </>
  );
}
