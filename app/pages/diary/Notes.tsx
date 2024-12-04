import useDiaryNotes from "@/app/hooks/useDiaryNotes";
import ListCard from "@/components/ListCard";
import { format } from "date-fns";
import Link from "next/link";

const DiaryNotes = () => {
  const { array } = useDiaryNotes();

  return (
    <div className="flex flex-col w-full gap-y-4">
      {array?.map((diary) => {
        const { startDate, noteList } = diary;
        return (
          <div key={startDate} className="flex flex-col gap-y-5">
            <div className="w-full h-10 items-center justify-center flex">
              <h4 className="text-sub4 text-white">
                {format(startDate, "MM월 dd일")}
              </h4>
            </div>
            {noteList?.map((note) => {
              const key = Math.random();
              return (
                <Link href={`/diary/${diary.id}`} key={key}>
                  <ListCard.Container>
                    <ListCard.Header.Default title={note.note.title} />
                    <ListCard.Description>
                      {note.note.content}
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

export default DiaryNotes;
