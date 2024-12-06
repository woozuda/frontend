"use client";

import { ArrowLeftSvg } from "@/app/assets/icons";
import Link from "next/link";
import { Toaster } from "sonner";

import ManageSvg from "@/app/assets/icons/Manage.svg";
import useDiary from "@/app/hooks/useDiary";
import { DiaryActionType } from "@/app/lib/diary";
import { DiaryNote } from "@/app/models/diary";
import ListCard from "@/components/ListCard";
import { format } from "date-fns";
import { useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data } = useDiary({ id });
  const [checkeds, setCheckeds] = useState<Set<number>>(new Set());
  const [action, setAction] = useState(DiaryActionType.DEFAULT);
  if (!data) {
    return null;
  }
  const onCheck = (note: DiaryNote, checkedState: boolean) => {
    const newCheckeds = new Set(checkeds);

    if (!checkedState) {
      newCheckeds.delete(note.note.id);
    } else {
      newCheckeds.add(note.note.id);
    }
    if (newCheckeds.size === 0) {
      setAction(DiaryActionType.DEFAULT);
    }
    setCheckeds(newCheckeds);
  };
  return (
    <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div className="w-full h-full flex flex-col relative overflow-y-scroll">
        <div className="w-full h-[240px] sticky top-0 left-0 shrink-0">
          <img
            src={data.imgUrl}
            className="w-full h-full object-cover object-top absolute"
          />
          <div className="w-full h-14 flex items-center relative p-1">
            <Link href={"/diary"} className="w-[75px]">
              <ArrowLeftSvg className="text-white" />
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex bg-sky-950 z-10">
          <div className="flex w-full flex-col relative gap-y-3 pb-5">
            <div className="w-full flex items-center justify-between h-10 px-5">
              <h5 className="text-app-gray-600 text-sub5">
                총 {data?.noteCount}개
              </h5>
              <button className="w-10 h-10 flex items-center justify-center">
                <ManageSvg className="text-app-gray-600" />
              </button>
            </div>
            <div className="w-full flex flex-col px-5 gap-y-5">
              {data.notes?.map(([date, notes]) => {
                return (
                  <div key={date} className="flex flex-col gap-y-5">
                    <div className="w-full h-10 items-center justify-center flex">
                      <h4 className="text-sub4 text-white">
                        {format(date, "MM월 dd일")}
                      </h4>
                    </div>
                    {notes.map((note) => {
                      return (
                        <ListCard.Container key={note.note.id}>
                          {note.type === "회고" && (
                            <ListCard.Header.Reflection
                              title={note.note.title}
                              checked={checkeds.has(note.note.id)}
                              onCheck={(checkedState) =>
                                onCheck(note, checkedState)
                              }
                            />
                          )}
                          {note.type !== "회고" && (
                            <ListCard.Header.Default
                              title={note.note.title}
                              onCheck={(checkedState) => {
                                onCheck(note, checkedState);
                              }}
                              checked={checkeds.has(note.note.id)}
                            />
                          )}
                          <ListCard.Description>
                            {note.note.content}
                          </ListCard.Description>
                        </ListCard.Container>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="w-full fixed bg-transparent flex justify-center bottom-0 left-0 right-0">
              <div
                className="w-full max-w-[480px] bg-black flex items-center justify-center data-[state=false]:invisible data-[state=false]:!h-0 data-[action=default]:h-[124px] data-[action=delete]:h-[175px] data-[action=share]:h-[200px] data-[state=false]:opacity-0 data-[state=true]:duration-300 data-[action=delete]:duration-100 data-[action=share]:duration-100 transition-all ease-in-out px-5 py-6 rounded-t-[20px] data-[state=true]:slide-in-from-bottom"
                data-state={checkeds.size !== 0}
                data-action={action}
              >
                {action === DiaryActionType.DEFAULT && (
                  <div className="w-full h-[68px] flex pb-3 gap-x-2">
                    <button
                      className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
                      onClick={() => setAction(DiaryActionType.SHARE)}
                    >
                      <h4 className="text-sub4 text-white">공유하기</h4>
                    </button>
                    <button
                      className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
                      onClick={() => setAction(DiaryActionType.DELETE)}
                    >
                      <h4 className="text-sub4 text-white">삭제하기</h4>
                    </button>
                  </div>
                )}
                {action === DiaryActionType.DELETE && (
                  <div className="w-full flex flex-col gap-y-6">
                    <p className="text-body1 text-app-gray-300">
                      선택한 일기 {checkeds.size}개를 삭제하시겠습니까?
                    </p>
                    <div className="w-full h-[68px] flex pb-3 gap-x-2">
                      <button className="w-full flex justify-center items-center bg-black rounded-lg border-app-gray-100 border">
                        <h4 className="text-sub4 text-white">취소</h4>
                      </button>
                      <button className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg">
                        <h4 className="text-sub4 text-white">삭제하기</h4>
                      </button>
                    </div>
                  </div>
                )}
                {action === DiaryActionType.SHARE && (
                  <div className="flex flex-col w-full gap-y-6">
                    <p className="text-body1 text-app-gray-100">
                      선택한 일기 {checkeds.size}개를 공유하였습니다.{"\n"}
                      공유된 일기 페이지로 이동하시겠습니까?
                    </p>
                    <div className="w-full h-[68px] flex pb-3 gap-x-2">
                      <button className="w-full flex justify-center items-center bg-black rounded-lg border border-app-gray-100">
                        <h4 className="text-sub4 text-white">취소</h4>
                      </button>
                      <button className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg">
                        <h4 className="text-sub4 text-white">공유하기</h4>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
