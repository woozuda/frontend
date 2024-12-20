"use client";

import { HomeHeader } from "@/components/header";
import GlobalNavigationBar from "@/components/NavigationBar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import throttle from "lodash.throttle";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PencilFlatSvg from "@/app/assets/icons/PencilFlat.svg";
import AppPopover from "@/components/AppPopover";
import { toast } from "sonner";
import { CalendarDotSvg, RetrospectSvg } from "../assets/icons";
import useDiaries from "../hooks/useDiaries";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  const date = useMemo(() => new Date(), []);
  const ref = useRef(null as HTMLDivElement | null);
  const bodyRef = useRef(null as HTMLDivElement | null);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const { array, isLoading } = useDiaries();

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

  const onEmptyClick = useCallback(() => {
    if (isLoading) {
      toast.warning("잠시 기다려 주세요", { position: "bottom-center" });
    }
    toast.error("다이어리를 먼저 생성해 주세요", { position: "bottom-center" });
  }, [isLoading]);

  const hasLink = array && array.length !== 0;

  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-repeat bg-center bg-sky-950 pb-[70px]">
      <div
        className="w-full h-full flex flex-col"
        ref={(element) => {
          ref.current = element;
        }}
      >
        <HomeHeader
          date={format(date, "MM월 dd일", { locale: ko })}
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
          <AppPopover>
            <AppPopover.Icon
              className="absolute bottom-3 right-3"
              icon={<PencilFlatSvg />}
            />
            <AppPopover.Item
              name="일기 쓰기"
              href={hasLink ? "/note/common/new" : undefined}
              icon={<PencilFlatSvg />}
              onClick={!hasLink ? onEmptyClick : undefined}
            />
            <AppPopover.Item
              name="오늘의 질문 일기"
              href={hasLink ? "/note/question/new" : undefined}
              icon={<CalendarDotSvg />}
              onClick={!hasLink ? onEmptyClick : undefined}
            />
            <AppPopover.Item
              name="회고 일기"
              href={hasLink ? "/note/retrospect/new" : undefined}
              icon={<RetrospectSvg />}
              onClick={!hasLink ? onEmptyClick : undefined}
            />
          </AppPopover>
        </div>
        <GlobalNavigationBar className="shrink-0" />
      </div>
    </div>
  );
}
