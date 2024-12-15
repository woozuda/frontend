"use client";

import useNote from "@/app/hooks/useNote";
import { NoteLibs } from "@/app/lib/note";
import { NoteType } from "@/app/models/diary";
import { NotePageHeader } from "@/app/pages/note";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { RETROSPECT } from "@/app/diary/_component/retrospectData";
import { Retrospect as IRetrospect } from "@/app/models/diary";

interface PageParams {
  id: number;
  type: NoteType;
}

export default function Page({ params }: { params: PageParams }) {
  const { id, type } = params;
  const { data: note } = useNote({ id, type });
  const [retrospect, setRetrospect] = useState<IRetrospect | undefined>()
  
  useEffect(() => {
    if (note?.framework) {
      const selectRetrospect = RETROSPECT.find((retrospect) => retrospect.type === note?.framework);
      setRetrospect(selectRetrospect)
    }
  }, [note?.framework])

  if (!note) {
    return null;
  }
  console.log(note)
  console.log("id", id)
  console.log("type", type)
  const page = note.framework
    ? null
    : NoteLibs.getContent(note.content.join(""));


  return (
    <div className="flex flex-col w-full max-w-[480px]">
      <div className="flex flex-col w-full h-full relative">
        <NotePageHeader id={note.id} type={type} />
        <div className="px-5 flex items-center w-full gap-x-4 mt-5">
          <div className="flex items-center w-full">
            <h4 className="text-app-gray-1000 text-sub4">{note.diary}</h4>
          </div>
          <h5 className="text-sub5 text-app-gray-1000 whitespace-nowrap">
            {format(note.date, "yy년 MM월 dd일")}
          </h5>
            {
              note.feeling && note.weather ?
            <div className="flex items-center">
              <div className="w-8 h-8 flex justify-center items-center">
                {NoteLibs.findFeeling(note.feeling)?.icon}
              </div>
              <div className="w-8 h-8 flex justify-center items-center">
                {NoteLibs.findWeather(note.weather)?.icon}
              </div>
            </div> :
          <div className="flex justify-center items-center w-32 h-6 p-2 rounded-xl bg-gradient-to-r from-[#5AC6F4] to-[#FFC3DF] text-app-gray-1200 text-xs">
            <span>회고일기</span>
          </div>
            }
        </div>
        <div className="flex w-full flex-col py-3 h-full">
          <div className="flex items-center h-[54px] w-full px-5 py-4">
            <h2 className="text-h2 text-app-gray-1200">{note.title}</h2>
          </div>
          {type === NoteType.QUESTION && (
            <div className="flex rounded-xl px-5 py-4 bg-app-gray-200">
              <p className="text-body3 text-app-gray-1200">{note.question}</p>
            </div>
          )}
          {
            page && (
              <div
                className="flex w-full px-5 py-3 flex-col gap-y-2"
                dangerouslySetInnerHTML={{ __html: page }}
              ></div>
            )
          }
          {
            note.framework && (
              note.content.map((ele, i) => (
                <div key={ele} className="flex flex-col gap-2 mt-6 px-6">
                  <h1 className="font-bold text-xl">{retrospect?.sections[i].name}</h1>
                  <p >{ele}</p>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}
