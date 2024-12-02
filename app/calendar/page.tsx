"use client";

import AppCalendar from "@/components/AppCalendar";
import AppCalendarDay from "@/components/AppCalendar/Day";
import ListCard from "@/components/ListCard";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import useNotes from "../hooks/useNotes";
import { CalendarLibs, CalendarStageType } from "../lib/calendar";

export default function Page() {
  const ref = useRef(null as HTMLDivElement | null);
  const touchStartRef = useRef(0);
  const [isTouchMoved, setIsTouchMoved] = useState(false);
  const { notes } = useNotes({});
  const searchParams = useSearchParams();
  const currentDate = useMemo(() => {
    const dateParam = searchParams.get("date") ?? new Date();
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return new Date();
    }
    return date;
  }, [searchParams]);

  useEffect(() => {
    if (isTouchMoved) {
      return;
    }
    const onTouchMove = function (event: TouchEvent) {
      const targetY = event.touches[0].clientY;
      if (targetY - touchStartRef.current > 10) {
        setIsTouchMoved(true);
      }
    };
    const onTouchStart = function (event: TouchEvent) {
      touchStartRef.current = event.touches[0].clientY;
    };
    ref.current?.addEventListener("touchmove", onTouchMove);
    ref.current?.addEventListener("touchstart", onTouchStart);
    return () => {
      ref.current?.removeEventListener("touchmove", onTouchMove);
      ref.current?.removeEventListener("touchstart", onTouchStart);
    };
  }, [isTouchMoved]);

  useEffect(() => {
    if (!isTouchMoved) {
      return;
    }
    const onTouchMove = function (event: TouchEvent) {
      const targetY = event.touches[0].clientY;
      if (targetY - touchStartRef.current < -10) {
        setIsTouchMoved(false);
      }
    };
    const onTouchStart = function (event: TouchEvent) {
      touchStartRef.current = event.touches[0].clientY;
    };
    ref.current?.addEventListener("touchmove", onTouchMove);
    ref.current?.addEventListener("touchstart", onTouchStart);
    return () => {
      ref.current?.removeEventListener("touchmove", onTouchMove);
      ref.current?.removeEventListener("touchstart", onTouchStart);
    };
  }, [isTouchMoved]);

  const now = useMemo(() => new Date(), []);
  const diaries = useMemo(
    () => [
      new Date(2024, 10, 10),
      new Date(2024, 10, 11),
      new Date(2024, 10, 13),
      new Date(2024, 10, 15),
    ],
    []
  );

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
      <div className="flex flex-col w-full gap-y-5 p-5 h-full overflow-y-scroll">
        {notes?.map((note) => {
          const key = Math.random();
          return (
            <ListCard.Container key={key}>
              <ListCard.Header.Default title={note.note.title} />
              <ListCard.Description>{note.note.content}</ListCard.Description>
            </ListCard.Container>
          );
        })}
      </div>
    </div>
  );
}
