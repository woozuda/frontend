"use client";

import AppCalendar from "@/components/AppCalendar";
import AppCalendarDay from "@/components/AppCalendar/Day";
import { useRef, useState } from "react";
import { CalendarLibs, CalendarStageType } from "@/app/lib/calendar";
import {
  CalendarAccordion,
  CalendarAccordionItem,
  CalendarAccordionTrigger,
} from "@/components/ui/accordionCalendar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function CalendarDrawer({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef(null as HTMLDivElement | null);
  const currentDate = date || new Date();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <CalendarAccordion type="single" collapsible>
          <CalendarAccordionItem value="item-1">
            <CalendarAccordionTrigger>
              {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
            </CalendarAccordionTrigger>
          </CalendarAccordionItem>
        </CalendarAccordion>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-4 pb-6">
      <DrawerTitle className="hidden">달력</DrawerTitle>
        <div className="flex w-full h-full flex-col">
          <AppCalendar.Container
            defaultDate={currentDate}
            ref={(element) => {
              ref.current = element;
            }}
          >
            <AppCalendar.Header classNames={{ text: "text-black text-lg"}} />
            <AppCalendar.WeekDay classNames={ { text: "text-black" }} className="" />
            <AppCalendar.BodyContainer>
              <AppCalendar.Body>
                {({ date }) => {
                  const type = CalendarLibs.getCalendarType(date, {
                    selectedDate: currentDate,
                    stage: CalendarStageType.DEFAULT,
                  });
                  const href = undefined;
                  return (
                    <AppCalendarDay.Default
                      day={date.date}
                      type={type}
                      href={href}
                      onClick={() => {
                        setDate(date.date);
                        setIsOpen(false);
                      }}
                    />
                  );
                }}
              </AppCalendar.Body>
            </AppCalendar.BodyContainer>
          </AppCalendar.Container>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
