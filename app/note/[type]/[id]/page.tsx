"use client";

import { useHttp } from "@/app/contexts/http";
import { NoteAPI } from "@/app/http";
import { NoteLibs } from "@/app/lib/note";
import { NoteType } from "@/app/models/diary";
import { NotePageHeader } from "@/app/pages/note";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface PageParams {
  id: number;
  type: NoteType;
}

export default function Page({ params }: { params: PageParams }) {
  const { id, type } = params;
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  const { data: note } = useQuery({
    queryKey: ["NOTE", { id, type }] as const,
    queryFn: ({ queryKey }) => {
      const [, note] = queryKey;
      switch (note.type) {
        case NoteType.COMMON:
          return noteApi.getCommonNote(note.id);
        case NoteType.QUESTION:
          return noteApi.getQuestionNote(note.id);
        case NoteType.RETROSPECTIVE:
          return noteApi.getRetrospectNote(note.id);
        default:
          return noteApi.getCommonNote(note.id);
      }
    },
  });

  if (!note) {
    return null;
  }

  return (
    <div className="flex flex-col w-full max-w-[480px]">
      <div className="flex flex-col w-full overflow-y-scroll h-full relative">
        <NotePageHeader id={note.id} />
        <div className="px-5 flex items-center w-full gap-x-4 mt-5">
          <div className="flex items-center w-full">
            <h4 className="text-app-gray-1000 text-sub4">{note.diary}</h4>
          </div>
          <h5 className="text-sub5 text-app-gray-1000 whitespace-nowrap">
            {format(note.date, "yy년 MM월 dd일")}
          </h5>
          <div className="flex items-center">
            <div className="w-8 h-8 flex justify-center items-center">
              {NoteLibs.findFeeling(note.feeling)?.icon}
            </div>
            <div className="w-8 h-8 flex justify-center items-center">
              {NoteLibs.findWeather(note.weather)?.icon}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col py-3">
          <div className="flex items-center h-[54px] w-full px-5 py-4">
            <h2 className="text-h2 text-app-gray-1200">{note.title}</h2>
          </div>
          {type === NoteType.QUESTION && (
            <div className="flex rounded-xl px-5 py-4 bg-app-gray-200">
              <p className="text-body3 text-app-gray-1200">{note.question}</p>
            </div>
          )}
          <div className="flex w-full px-5 py-3">
            <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
