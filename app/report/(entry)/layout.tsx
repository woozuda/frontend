"use client";

import { ReportEnums } from "@/app/lib/report";
import { HeaderV2 } from "@/components/header/v2";
import GlobalNavigationBar from "@/components/NavigationBar";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Link from "next/link";
import { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren {
  params: { type: ReportEnums };
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  const [ref, entry] = useIntersectionObserver();

  const bgColor =
    entry && !entry.isIntersecting
      ? "bg-app-primary-100 z-20"
      : "bg-transparent z-20";

  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950 pb-[70px]">
      <div className="w-full h-full flex flex-col relative">
        <div
          className={cn(
            bgColor,
            "sticky left-0 top-0 right-0 w-full flex flex-col"
          )}
        >
          <HeaderV2>
            <HeaderV2.Left>
              <Link
                className="p-3 flex justify-center items-center"
                href="/report"
              >
                <h2 className="text-h2 text-white">레포트</h2>
              </Link>
            </HeaderV2.Left>
          </HeaderV2>
          <div className="w-full flex items-center">
            <Link
              href={`/report/${ReportEnums.COMMON}`}
              className={
                "h-12 flex w-full items-center justify-center border-b-2 border-white"
              }
            >
              <span className={"text-sub4 text-white"}>자유일기</span>
            </Link>
            <Link
              href={`/report/${ReportEnums.RETROSPECTIVE}`}
              className={
                "h-12 flex w-full items-center justify-center border-b-2 border-app-gray-700"
              }
            >
              <span className={"text-sub4 text-app-gray-700"}>회고일기</span>
            </Link>
            <Link
              href={`/report/${ReportEnums.CREATION}`}
              className={
                "h-12 flex w-full items-center justify-center border-b-2 border-app-gray-700"
              }
            >
              <span className={"text-sub4 text-app-gray-700"}>
                AI 창작 콘텐츠
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex flex-col relative">
          <div
            className="w-full h-px bg-transparent absolute left-0 right-0 top-[-70px]"
            ref={ref}
          />
          {children}
        </div>
      </div>
      <div className="fixed mx-auto bottom-0 left-0 right-0 w-full max-w-[480px]">
        <GlobalNavigationBar />
      </div>
    </div>
  );
}
