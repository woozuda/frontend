"use client";

import { ManageSvg } from "@/app/assets/icons";
import SharedAiCard from "./SharedAiCard";
import { useState, useEffect } from "react";
import { useSharedAi } from "../_hooks/useSharedAi";
import { useUnshareAi } from "../_hooks/useUnshareAi";
  import {
    SharedDrawer,
    SharedDrawerContent,
  } from "@/components/ui/sharedDrawer";
import { Button } from "@/components/ui/button";

export default function SharedAi() {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [noShareList, setNoshareList] = useState<number[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  
  const { mutate, isPending } = useUnshareAi();
  const { data } = useSharedAi();

  useEffect(() => {
    setDrawerOpen(noShareList.length > 0);
  }, [noShareList]);


  const changeMode = () => {
    if (mode === "view") {
      setMode("edit");
    } else {
      setMode("view");
    }
  };

  const onCloseDrawer = () => {
    setMode("view");
    setNoshareList([]);
    setDrawerOpen(false);
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div className="flex gap-4">
        <div className="text-slate-300">{`총 ${data.total}개`}</div>
        <div className="ml-auto" onClick={changeMode}>
          <ManageSvg />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {data.sharedAi.map((aiItem: any) => (
            <SharedAiCard key={aiItem.ai.id} aiItem={aiItem} mode={mode} noShareList={noShareList} setNoShareList={setNoshareList}/>
        ))}
      </div>
      <SharedDrawer open={isDrawerOpen}>
        <SharedDrawerContent className="flex flex-col items-center gap-4 px-4 pb-12 bg-black border-none text-white">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
                <span>{`선택한 일기 ${noShareList.length}개의`}</span>
                <span>공유를 중단 하시겠습니까?</span>
            </div>
            <div className="flex gap-2">
                <Button className="flex-1 h-12 bg-black border border-slate-700" onClick={() => onCloseDrawer()} disabled={isPending}>취소</Button>
                <Button className="flex-1 h-12 bg-slate-700" onClick={() => {mutate(noShareList); onCloseDrawer()}} disabled={isPending}>확인</Button>
            </div>
          </div>
        </SharedDrawerContent>
      </SharedDrawer>
    </div>
  );
}
