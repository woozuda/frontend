import useNotes from "@/app/hooks/useNotes";
import { HTMLLibs } from "@/app/lib/html";
import { NoteLibs } from "@/app/lib/note";
import { NoteType } from "@/app/models/diary";
import ListCard from "@/components/ListCard";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { format } from "date-fns";
import Link from "next/link";
import { useCallback, useEffect } from "react";

const DiaryLatest = () => {
  const { data, isLoading, isFetching, fetchNextPage } = useNotes();
  const notes = data?.pages.flatMap((page) => page.content);
  const array = NoteLibs.groupNotes([notes ?? []]);

  const fetchNextNotes = useCallback(async () => {
    if (isLoading || isFetching) {
      return;
    }
    await fetchNextPage();
  }, [isFetching, isLoading, fetchNextPage]);

  const [bottomRef, bottomEntry] = useIntersectionObserver();

  useEffect(() => {
    if (bottomEntry?.isIntersecting) {
      fetchNextNotes();
    }
  }, [bottomEntry?.isIntersecting, fetchNextNotes]);

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
              const image = HTMLLibs.findThumbnail(
                HTMLLibs.createDocument(note.note.content.join(""))
              );
              const textContent = HTMLLibs.getTextContent(
                HTMLLibs.createDocument(note.note.content.join(""))
              );
              return (
                <Link
                  href={`/note/${note.type}/${note.note.id}`}
                  key={note.note.id}
                >
                  <ListCard.Container>
                    {note.type !== NoteType.RETROSPECTIVE && (
                      <ListCard.Header.Default title={note.note.title} />
                    )}
                    {note.type === NoteType.RETROSPECTIVE && (
                      <ListCard.Header.Reflection title={note.note.title} />
                    )}
                    {image && <ListCard.Thumbnail thumbnail={image} />}
                    {textContent && (
                      <ListCard.Description html>
                        {textContent}
                      </ListCard.Description>
                    )}
                  </ListCard.Container>
                </Link>
              );
            })}
          </div>
        );
      })}
      <div className="w-full h-0.5 bg-transparent" ref={bottomRef} />
    </div>
  );
};

export default DiaryLatest;
