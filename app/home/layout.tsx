"use client";

import { HomeHeader } from "@/components/header";
import GlobalNavigationBar from "@/components/NavigationBar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import throttle from "lodash.throttle";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";

import CalendarDotSvg from "@/app/assets/icons/CalendarDot.svg";
import PencilFlatSvg from "@/app/assets/icons/PencilFlat.svg";
import RetrospectSvg from "@/app/assets/icons/Retrospect.svg";
import AppPopover from "@/components/AppPopover";

const popoverItems = [
  {
    name: "일기 쓰기",
    href: "/diary/note/common/new",
    icon: <PencilFlatSvg />,
  },
  {
    name: "오늘의 질문 일기",
    href: "/diary/note/question/new",
    icon: <CalendarDotSvg />,
  },
  {
    name: "회고하기",
    href: "/diary/note/retrospect/new",
    icon: <RetrospectSvg />,
  },
];

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  const date = useMemo(() => new Date(), []);
  const ref = useRef(null as HTMLDivElement | null);
  const bodyRef = useRef(null as HTMLDivElement | null);
  const [bgColor, setBgColor] = useState("bg-transparent");

  useEffect(() => {
    const onScroll = function () {
      const rect = bodyRef.current?.getBoundingClientRect();
      if (rect && rect.top === 56) {
        setBgColor("bg-transparent z-10");
      } else {
        setBgColor("bg-app-primary-100 z-10");
      }
    };
    const onScrollThrottled = throttle(onScroll, 1000 * 0.2);
    ref.current?.addEventListener("scroll", onScrollThrottled);
    return () => {
      ref.current?.removeEventListener("scroll", onScrollThrottled);
    };
  }, []);

  return (
    <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div
        className="w-full h-full flex flex-col overflow-y-scroll"
        ref={(element) => {
          ref.current = element;
        }}
      >
        <HomeHeader
          date={format(date, "yyyy년 MM월", { locale: ko })}
          className={bgColor}
        />
        <div
          className="w-full h-full py-2"
          ref={(element) => {
            bodyRef.current = element;
          }}
        >
          {children}
        </div>
      </div>
      <div className="relative h-0 w-full z-10">
        <AppPopover
          items={popoverItems}
          buttonIcon={<PencilFlatSvg />}
          className="absolute bottom-3 right-3"
        />
      </div>
      <GlobalNavigationBar className="shrink-0" />
    </div>
  );
}
