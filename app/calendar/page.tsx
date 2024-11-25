"use client";

import AppCalendarManual, {
  AppCalendarBody,
  AppCalendarHeader,
  AppCalendarShortBody,
} from "@/components/AppCalendar";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [date, setDate] = useState<Date>();
  const ref = useRef(null as HTMLDivElement | null);
  const touchStartRef = useRef(0);
  const [isTouchMoved, setIsTouchMoved] = useState(false);

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
      ref.current?.addEventListener("touchstart", onTouchStart);
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
      ref.current?.addEventListener("touchstart", onTouchStart);
    };
  }, [isTouchMoved]);

  return (
    <AppCalendarManual
      date={date}
      selectedDate={date}
      close
      ref={(element) => {
        ref.current = element;
      }}
      onChange={(date) => setDate(date)}
    >
      <AppCalendarHeader />
      {!isTouchMoved && <AppCalendarShortBody />}
      {isTouchMoved && <AppCalendarBody.Create />}
    </AppCalendarManual>
  );
}
