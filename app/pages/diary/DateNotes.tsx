"use client";

import { ArrowLeftSvg } from "@/app/assets/icons";
import useNotes from "@/app/hooks/useNotes";
import { DiaryLibs } from "@/app/lib/diary";
import { HTMLLibs } from "@/app/lib/html";
import { HeaderV2 } from "@/components/header/v2";
import ListCard from "@/components/ListCard";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const DiaryDateNotes = () => {
  const searchParams = useSearchParams();
  const date = DiaryLibs.getDiaryDate(searchParams);
  const { notes } = useNotes({ date });

  const [ref, entry] = useIntersectionObserver();

  const bgColor =
    entry && !entry.isIntersecting
      ? "bg-app-primary-100 z-20"
      : "bg-transparent z-20";

  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div className="w-full h-full flex flex-col relative">
        <HeaderV2 className={cn(bgColor, "sticky left-0 top-0 right-0")}>
          <HeaderV2.Left>
            <div className="flex items-center">
              <Link
                className="p-3 flex justify-center items-center"
                href="/diary"
              >
                <ArrowLeftSvg className="text-white" />
              </Link>
              <h3 className="text-sub3 text-white">
                {format(date!, "MM월 dd일")}
              </h3>
            </div>
          </HeaderV2.Left>
        </HeaderV2>
        <div className="w-full h-full flex flex-col relative">
          <div
            className="w-full h-px bg-transparent absolute left-0 right-0 top-[-50px]"
            ref={ref}
          />
          <div className="flex flex-col w-full p-5 relative">
            <div className="flex flex-col w-full gap-y-4">
              {notes?.map((note) => {
                const image = HTMLLibs.findThumbnail(
                  HTMLLibs.createDocument(note.note.content.join(""))
                );
                return (
                  <Link
                    href={`/note/${note.type}/${note.note.id}`}
                    key={note.note.id}
                  >
                    <ListCard.Container>
                      <ListCard.Header.Default title={note.note.title} />
                      {image && <ListCard.Thumbnail thumbnail={image} />}
                      <ListCard.Description html>
                        {note.note.content.join("")}
                      </ListCard.Description>
                    </ListCard.Container>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryDateNotes;
