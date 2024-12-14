"use client";

import { HomeHeader } from "@/components/header";
import GlobalNavigationBar from "@/components/NavigationBar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import throttle from "lodash.throttle";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";

import PencilFlatSvg from "@/app/assets/icons/PencilFlat.svg";
import AppPopover from "@/components/AppPopover";
import { DiaryHomeLibs } from "../lib/diary";

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
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-repeat bg-center bg-sky-950 pb-[70px]">
      <div
        className="w-full h-full flex flex-col"
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
      <div className="w-full max-w-[480px] fixed bottom-0 left-0 right-0 mx-auto z-20">
        <div className="relative h-0 w-full z-10">
          <AppPopover
            items={DiaryHomeLibs.popoverItems}
            buttonIcon={<PencilFlatSvg />}
            className="absolute bottom-3 right-3"
          />
        </div>
        <GlobalNavigationBar className="shrink-0" />
      </div>
    </div>
  );
}
