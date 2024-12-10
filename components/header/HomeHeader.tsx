"use client";

import CalendarIcon from "@/app/assets/icons/Calendar.svg";
import LogoSvg from "@/app/assets/icons/Logo.svg";
import { RefLibs } from "@/app/lib/ref";
import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";
import { forwardRef, MouseEventHandler } from "react";

export interface HomeHeaderProps {
  date: string;
  className?: string;

  onShare?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const HomeHeader = forwardRef<HTMLElement, HomeHeaderProps>(function HomeHeader(
  props,
  ref
) {
  const { date, onClick } = props;
  const className = ClassNameLibs.merge(
    props,
    "h-14 p-1 flex items-center justify-between text-app-gray-1300 sticky left-0 top-0"
  );

  return (
    <header className={className} ref={RefLibs.connect(ref)}>
      <Link className="p-3 flex justify-center items-center" href="/">
        <LogoSvg />
      </Link>
      <div className="flex items-center">
        <Link
          href={"/calendar"}
          className="p-3 flex justify-center items-center text-sub3 text-white"
        >
          {date}
        </Link>
        <button
          className="p-3 flex justify-center items-center text-white"
          onClick={onClick}
        >
          <CalendarIcon className="text-white" />
        </button>
      </div>
    </header>
  );
});

export default HomeHeader;
