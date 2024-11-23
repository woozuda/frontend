"use client";

import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";

import DiarySvg from "@/app/assets/icons/Diary.svg";
import HomeSvg from "@/app/assets/icons/Home.svg";
import MyPageSvg from "@/app/assets/icons/MyPage.svg";
import ReportSvg from "@/app/assets/icons/Report.svg";
import { GNBLibs } from "@/app/lib/gnb";
import { usePathname } from "next/navigation";
import React from "react";

export interface GlobalNavigationBarProps {
  className?: string;
}

const navigations = [
  {
    text: "홈",
    icon: <HomeSvg />,
    href: "/",
  },
  {
    text: "리포트",
    icon: <ReportSvg />,
    href: "/",
  },
  {
    text: "다이어리",
    icon: <DiarySvg />,
    href: "/",
  },
  {
    text: "마이",
    icon: <MyPageSvg />,
    href: "/",
  },
];

const GlobalNavigationBar = (props: GlobalNavigationBarProps) => {
  const className = ClassNameLibs.merge(
    props,
    "px-6 py-2 flex items-center w-full h-[66px] justify-between"
  );

  const pathname = usePathname();

  return (
    <section className={className}>
      {navigations.map((nav) => {
        const { background, text } = GNBLibs.getItemStyle(pathname, nav.href);
        return (
          <Link
            href={nav.href}
            className="flex flex-col items-center gap-y-1"
            key={nav.text}
          >
            {React.cloneElement(nav.icon, {
              ...nav.icon.props,
              className: background,
            })}
            <span className={text}>{nav.text}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default GlobalNavigationBar;
