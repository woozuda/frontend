import { NoteAPI } from "@/app/http";
import { DiaryType } from "@/app/lib/diary";
import { Http } from "@/app/lib/http";
import { NoteLibs } from "@/app/lib/note";
import { NotePageHeader } from "@/app/pages/note";
import getQueryClient from "@/app/query/client";
import { format } from "date-fns";

interface PageParams {
  id: number;
  type: DiaryType;
  noteId: number;
}

export default async function Page({ params }: { params: PageParams }) {
  const { id, type, noteId } = params;
  const http = new Http();
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }
  const noteApi = new NoteAPI(http);
  const queryClient = getQueryClient();
  const note = await queryClient.fetchQuery({
    queryKey: ["NOTE", { id, type }, { id: noteId }] as const,
    queryFn: ({ queryKey }) => {
      const [, diary, note] = queryKey;
      switch (diary.type) {
        case DiaryType.COMMON:
          return noteApi.getCommonNote(diary.id, note.id);
        case DiaryType.QUESTION:
          return noteApi.getQuestionNote(diary.id, note.id);
        case DiaryType.RETROSPECTIVE:
          return noteApi.getRetrospectNote(diary.id, note.id);
        default:
          return noteApi.getCommonNote(diary.id, note.id);
      }
    },
  });

  return (
    <div className="flex flex-col w-full max-w-[480px]">
      <div className="flex flex-col w-full overflow-y-scroll h-full relative">
        <NotePageHeader id={note.note.id} />
        <div className="px-5 flex items-center w-full gap-x-4 mt-5">
          <div className="flex items-center w-full">
            <h4 className="text-app-gray-1000 text-sub4">{note.note.diary}</h4>
          </div>
          <h5 className="text-sub5 text-app-gray-1000 whitespace-nowrap">
            {format(note.note.date, "yy년 MM월 dd일")}
          </h5>
          <div className="flex items-center">
            <div className="w-8 h-8 flex justify-center items-center">
              {NoteLibs.findFeeling(note.note.feeling)?.icon}
            </div>
            <div className="w-8 h-8 flex justify-center items-center">
              {NoteLibs.findWeather(note.note.weather)?.icon}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col py-3">
          <div className="flex items-center h-[54px] w-full px-5 py-4">
            <h2 className="text-h2 text-app-gray-1200">{note.note.title}</h2>
          </div>
          {note.type === "일기" && (
            <div className="flex rounded-xl px-5 py-4 bg-app-gray-200">
              <p className="text-body3 text-app-gray-1200">
                {note.note.question}
              </p>
            </div>
          )}
          <div className="flex w-full px-5 py-3">
            <p>{note.note.content}</p>
          </div>
          <div className="w-full h-[800px] p-4">
            <div className="w-full h-full bg-app-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
