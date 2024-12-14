"use client";

import GlobalNavigationBar from "@/components/NavigationBar";
import { PropsWithChildren } from "react";

import { PencilFlatSvg, ViewSvg } from "@/app/assets/icons";
import { DiaryHomeLibs, DiaryLibs } from "@/app/lib/diary";
import AppPopover from "@/components/AppPopover";
import BottomSheetV2 from "@/components/BottomSheet/v2";
import { HeaderV2 } from "@/components/header/v2";
import { Sheet, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Link from "next/link";

export default function DiaryLayout(props: PropsWithChildren) {
  const { children } = props;
  const [ref, entry] = useIntersectionObserver();

  const bgColor =
    entry && !entry.isIntersecting
      ? "bg-app-primary-100 z-20"
      : "bg-transparent z-20";

  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-repeat bg-center bg-sky-950 pb-[70px]">
      <div className="w-full h-full flex flex-col relative">
        <HeaderV2 className={cn(bgColor, "sticky left-0 top-0 right-0")}>
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
              <BottomSheetV2 className="bg-black gap-y-6 border-black rounded-t-lg">
                <BottomSheetV2.Header>
                  <h2 className="text-sub2 text-app-gray-300">다이어리 보기</h2>
                </BottomSheetV2.Header>
                {DiaryLibs.getPageTypes().map((pageType) => {
                  return (
                    <BottomSheetV2.Option key={pageType.key}>
                      <SheetClose asChild>
                        <Link
                          href={pageType.href}
                          className="w-full flex items-center justify-center h-14 bg-app-gray-1000 text-white rounded-lg text-sub4"
                        >
                          {pageType.text}
                        </Link>
                      </SheetClose>
                    </BottomSheetV2.Option>
                  );
                })}
              </BottomSheetV2>
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

      <div className="w-full max-w-[480px] fixed bottom-0 left-0 right-0 mx-auto z-20">
        <div className="relative h-0 w-full z-10">
          <AppPopover
            items={DiaryHomeLibs.popoverItems}
            buttonIcon={<PencilFlatSvg />}
            className="absolute bottom-3 right-3"
          />
        </div>
        <GlobalNavigationBar />
      </div>
    </div>
  );
}
