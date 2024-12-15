"use client";

import AppCalendar from "@/components/AppCalendar";
import AppCalendarDay from "@/components/AppCalendar/Day";
import ListCard from "@/components/ListCard";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import useDiaryDates from "../hooks/useDiaryDates";
import useNotes from "../hooks/useNotes";
import { CalendarLibs, CalendarStageType } from "../lib/calendar";
import { HTMLLibs } from "../lib/html";
import { NoteType } from "../models/diary";
import useCalendarToggle from "./hooks";

export default function Page() {
  const searchParams = useSearchParams();
  const { array } = useDiaryDates();
  const date = searchParams.get("date");
  const { data, isFetching, isLoading, fetchNextPage } = useNotes({ date });
  const currentDate = useMemo(() => {
    const dateParam = searchParams.get("date") ?? new Date();
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return new Date();
    }
    return date;
  }, [searchParams]);

  const { ref, isTouchMoved } = useCalendarToggle();
  const now = useMemo(() => new Date(), []);
  const diaries = array?.map((value) => new Date(value.date));

  const notes = data?.pages.flatMap((page) => page.content);

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
    <div className="flex w-full h-full flex-col">
      <AppCalendar.Container
        defaultDate={currentDate}
        ref={(element) => {
          ref.current = element;
        }}
      >
        <AppCalendar.NavBar />
        <AppCalendar.WeekDay className="w-full px-5" />
        <AppCalendar.BodyContainer>
          {isTouchMoved && (
            <AppCalendar.Body>
              {({ date }) => {
                const type = CalendarLibs.getCalendarType(date, {
                  now,
                  diaries,
                  selectedDate: currentDate,
                  stage: CalendarStageType.DEFAULT,
                });
                const href = `/calendar?date=${format(
                  date.date,
                  "yyyy-MM-dd"
                )}`;
                return (
                  <AppCalendarDay.Default
                    day={date.date}
                    type={type}
                    href={href}
                  />
                );
              }}
            </AppCalendar.Body>
          )}
          {!isTouchMoved && (
            <AppCalendar.ShortBody>
              {({ date }) => {
                const type = CalendarLibs.getCalendarType(date, {
                  now,
                  diaries,
                  selectedDate: currentDate,
                  stage: CalendarStageType.DEFAULT,
                });
                const href = `/calendar?date=${format(
                  date.date,
                  "yyyy-MM-dd"
                )}`;

                return (
                  <AppCalendarDay.Default
                    day={date.date}
                    type={type}
                    href={href}
                  />
                );
              }}
            </AppCalendar.ShortBody>
          )}
        </AppCalendar.BodyContainer>
      </AppCalendar.Container>
      <div className="flex flex-col w-full gap-y-5 p-5 h-full">
        {notes?.map((note) => {
          const href = `note/${note.type}/${note.note.id}`;
          const content = note.note.content.join("");
          const image = HTMLLibs.findThumbnail(
            HTMLLibs.createDocument(content)
          );
          const textContent = HTMLLibs.getTextContent(
            HTMLLibs.createDocument(content)
          );
          return (
            <Link href={href} key={href}>
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
        <div className="w-full h-0.5 bg-transparent" ref={bottomRef} />
      </div>
    </div>
  );
}
