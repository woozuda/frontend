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
    <header className="h-14 p-1 flex items-center justify-between">
      <Link className="p-3 flex justify-center items-center" href={href}>
        <span className="text-lg font-bold">{title}</span>
      </Link>
      <button
        className="p-3 flex justify-center items-center"
        onClick={onClick}
      >
        <p className="text-base">{text}</p>
      </button>
    </header>
  );
};

export default MenuHeader;
