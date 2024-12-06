"use client";

import FloatingAction from "@/components/FloatingAction";
import GlobalNavigationBar from "@/components/NavigationBar";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { ViewSvg } from "@/app/assets/icons";
import PencilSvg from "@/app/assets/icons/Pencil.svg";
import { DiaryLibs } from "@/app/lib/diary";
import BottomSheetContent from "@/components/BottomSheet";
import { HeaderV2 } from "@/components/header/v2";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  const [bgColor, setBgColor] = useState("bg-transparent");
  const ref = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBgColor("bg-transparent z-20");
        } else {
          setBgColor("bg-app-primary-100 z-20");
        }
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div className="w-full h-full flex flex-col relative overflow-y-scroll">
        <HeaderV2 className={bgColor + " sticky left-0 top-0 right-0"}>
          <HeaderV2.Left>
            <Link
              className="p-3 flex justify-center items-center"
              href="/diary"
            >
              <h2 className="text-h2 text-white">다이어리</h2>
            </Link>
          </HeaderV2.Left>
          <HeaderV2.Right>
            <Sheet>
              <SheetTrigger className="p-3 flex justify-center items-center text-white">
                <ViewSvg />
              </SheetTrigger>
              <BottomSheetContent.Select
                title="다이어리 보기"
                side="bottom"
                className="mt-8"
                items={DiaryLibs.getPageTypes()}
              />
            </Sheet>
          </HeaderV2.Right>
        </HeaderV2>
        <div className="w-full h-full flex flex-col relative">
          <div
            className="w-full h-px bg-transparent absolute left-0 right-0 top-[-50px]"
            ref={ref}
          />
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
