"use client";

import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";

import {
  DiaryActiveSvg,
  HomeActiveSvg,
  MyPageActiveSvg,
  ReportActiveSvg,
} from "@/app/assets/icons";
import DiarySvg from "@/app/assets/icons/Diary.svg";
import HomeSvg from "@/app/assets/icons/Home.svg";
import MyPageSvg from "@/app/assets/icons/MyPage.svg";
import ReportSvg from "@/app/assets/icons/Report.svg";
import { GNBLibs } from "@/app/lib/gnb";
import { usePathname } from "next/navigation";

export interface GlobalNavigationBarProps {
  className?: string;
}

const navigations = [
  {
    text: "홈",
    icon: {
      active: <HomeActiveSvg color={{ from: "#5AC6F4", to: "#FFC3DF" }} />,
      inactive: <HomeSvg className="text-app-gray-900" />,
    },
    href: "/home",
  },
  {
    text: "리포트",
    icon: {
      active: <ReportActiveSvg color={{ from: "#5AC6F4", to: "#FFC3DF" }} />,
      inactive: <ReportSvg className="text-app-gray-900" />,
    },
    href: "/report",
  },
  {
    text: "다이어리",
    icon: {
      active: <DiaryActiveSvg color={{ from: "#5AC6F4", to: "#FFC3DF" }} />,
      inactive: <DiarySvg className="text-app-gray-900" />,
    },
    href: "/diary",
  },
  {
    text: "마이",
    icon: {
      active: <MyPageActiveSvg color={{ from: "#5AC6F4", to: "#FFC3DF" }} />,
      inactive: <MyPageSvg className="text-app-gray-900" />,
    },
    href: "/my",
  },
];

const GlobalNavigationBar = (props: GlobalNavigationBarProps) => {
  const className = ClassNameLibs.merge(
    props,
    "px-6 py-2 flex items-center w-full h-[66px] justify-between shrink-0 bg-sky-950"
  );

  const pathname = usePathname();

  return (
    <section className={className}>
      {navigations.map((nav) => {
        const { text } = GNBLibs.getItemStyle(pathname, nav.href);
        const active = pathname.includes(nav.href);
        return (
          <Link
            href={nav.href}
            className="flex flex-col items-center gap-y-1"
            key={nav.text}
          >
            {active && nav.icon.active}
            {!active && nav.icon.inactive}
            <span className={text}>{nav.text}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default GlobalNavigationBar;
