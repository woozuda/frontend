"use client";

import FloatingAction from "@/components/FloatingAction";
import { DiaryHeader } from "@/components/header";
import GlobalNavigationBar from "@/components/NavigationBar";
import { PropsWithChildren, useCallback, useState } from "react";
import usePageScroll from "../../hooks/usePageScroll";

import PencilSvg from "@/app/assets/icons/Pencil.svg";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  const [bgColor, setBgColor] = useState("bg-transparent");
  const onScrolled = useCallback(
    () => setBgColor("bg-app-primary-100 z-20"),
    []
  );
  const onNotScrolled = useCallback(
    () => setBgColor("bg-transparent z-20"),
    []
  );
  const { scrollRef, rectRef } = usePageScroll({
    throttleWait: 1000 * 0.2,
    headerHeight: 56,
    onNotScrolled,
    onScrolled,
  });

  return (
    <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div
        className="w-full h-full flex flex-col relative overflow-y-scroll"
        ref={(element) => {
          scrollRef.current = element;
        }}
      >
        <DiaryHeader className={bgColor} />
        <div
          className="w-full h-full flex flex-col"
          ref={(element) => {
            rectRef.current = element;
          }}
        >
          {children}
        </div>
      </div>

      <div className="h-0 relative">
        <FloatingAction.Button
          icon={<PencilSvg />}
          className="absolute left-auto top-auto bottom-4 right-4 !from-[-10%] z-20"
        />
      </div>
      <GlobalNavigationBar />
    </div>
  );
}
