"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";

export interface MenuHeaderProps {
  title: string;
  text: string;
  href: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const MenuHeader = (props: MenuHeaderProps) => {
  const { title, href, text, onClick } = props;

  return (
    <header className="h-14 p-1 flex items-center justify-between text-app-gray-1300">
      <Link className="p-3 flex justify-center items-center" href={href}>
        <span className="text-sub3">{title}</span>
      </Link>
      <button
        className="p-3 flex justify-center items-center"
        onClick={onClick}
      >
        <p className="text-body2">{text}</p>
      </button>
    </header>
  );
};

export default MenuHeader;
