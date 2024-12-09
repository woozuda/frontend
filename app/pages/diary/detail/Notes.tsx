"use client";

import { DiaryNote, NoteType } from "@/app/models/diary";
import ListCard from "@/components/ListCard";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface DiaryDetailNotesProps {
  notes?: [string, DiaryNote[]][] | null;
  isClicked?: boolean;
  checkeds: Set<number>;
  onCheck: (note: DiaryNote, checkedState: boolean) => unknown;
}

const DiaryDetailNotes = (props: DiaryDetailNotesProps) => {
  const { notes, isClicked, checkeds, onCheck } = props;

  return (
    <div className="w-full flex flex-col px-5 gap-y-5">
      {notes?.map(([date, notes]) => {
        return (
          <div key={date} className="flex flex-col gap-y-5">
            <div className="w-full h-10 items-center justify-center flex">
              <h4 className="text-sub4 text-white">
                {format(date, "MM월 dd일")}
              </h4>
            </div>
            {notes.map((note) => {
              const cardClassName = cn(
                isClicked &&
                  checkeds.has(note.note.id) &&
                  "border-app-gray-800 border rounded-xl"
              );
              return (
                <ListCard.Container
                  key={note.note.id}
                  className={cardClassName}
                >
                  {note.type === NoteType.RETROSPECTIVE && (
                    <ListCard.Header.Reflection
                      title={note.note.title}
                      checked={checkeds.has(note.note.id)}
                      hasCheckbox={isClicked}
                      onCheck={(checkedState) => onCheck(note, checkedState)}
                    />
                  )}
                  {note.type !== NoteType.RETROSPECTIVE && (
                    <ListCard.Header.Default
                      title={note.note.title}
                      onCheck={(checkedState) => {
                        onCheck(note, checkedState);
                      }}
                      checked={checkeds.has(note.note.id)}
                      hasCheckbox={isClicked}
                    />
                  )}
                  <ListCard.Description>
                    {String(note.note.content)}
                  </ListCard.Description>
                </ListCard.Container>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DiaryDetailNotes;
