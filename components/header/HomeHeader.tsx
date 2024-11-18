"use client";

import CalendarIcon from "@/app/assets/icons/Calendar.svg";
import Link from "next/link";
import { MouseEventHandler } from "react";

export interface HomeHeaderProps {
  date: string;

  onShare?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const HomeHeader = (props: HomeHeaderProps) => {
  const { date, onClick } = props;

  return (
    <header className="h-14 p-1 flex items-center justify-between">
      <Link className="p-3 flex justify-center items-center" href="/">
        <span className="text-lg font-bold">우주다</span>
      </Link>
      <div className="flex items-center">
        <p className="p-3 flex justify-center items-center">{date}</p>
        <button
          className="p-3 flex justify-center items-center"
          onClick={onClick}
        >
          <CalendarIcon />
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
