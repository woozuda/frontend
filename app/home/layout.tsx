"use client";

import { HomeHeader } from "@/components/header";
import GlobalNavigationBar from "@/components/NavigationBar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import throttle from "lodash.throttle";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";

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
          className="w-full h-full"
          ref={(element) => {
            bodyRef.current = element;
          }}
        >
          {children}
        </div>
      </div>
      <GlobalNavigationBar className="shrink-0" />
    </div>
  );
}
