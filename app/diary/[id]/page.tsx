"use client";

import ManageSvg from "@/app/assets/icons/Manage.svg";
import useDiary from "@/app/hooks/useDiary";
import ListCard from "@/components/ListCard";
import { format } from "date-fns";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data } = useDiary({ id });
  if (!data) {
    return null;
  }
  return (
    <div className="flex w-full flex-col relative gap-y-3 pb-5">
      <div className="w-full flex items-center justify-between h-10 px-5">
        <h5 className="text-app-gray-600 text-sub5">총 {data?.noteCount}개</h5>
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
                const key = Math.random();
                return (
                  <ListCard.Container key={key}>
                    <ListCard.Header.Default title={note.note.title} />
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
    </div>
  );
}
