import useNotes from "@/app/hooks/useNotes";
import { NoteLibs } from "@/app/lib/note";
import ListCard from "@/components/ListCard";
import { format } from "date-fns";
import Link from "next/link";

const DiaryLatest = () => {
  const { notes } = useNotes();
  const array = NoteLibs.groupNotes([notes ?? []]);

  return (
    <div className="flex flex-col w-full gap-y-4">
      {array?.map((diary) => {
        const [date, noteList] = diary;
        return (
          <div key={date} className="flex flex-col gap-y-5">
            <div className="w-full h-10 items-center justify-center flex">
              <h4 className="text-sub4 text-white">
                {format(date, "MM월 dd일")}
              </h4>
            </div>
            {noteList?.map((note) => {
              return (
                <Link
                  href={`/note/${note.type}/${note.note.id}`}
                  key={note.note.id}
                >
                  <ListCard.Container>
                    <ListCard.Header.Default title={note.note.title} />
                    <ListCard.Description>
                      {String(note.note.content)}
                    </ListCard.Description>
                  </ListCard.Container>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DiaryLatest;
