"use client";

import ViewSvg from "@/app/assets/icons/View.svg";
import { RefLibs } from "@/app/lib/ref";
import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

export interface DiaryHeaderProps {
  className?: string;
}

const DiaryHeader = forwardRef<HTMLElement, DiaryHeaderProps>(
  function DiaryHeader(props, ref) {
    const className = ClassNameLibs.merge(
      props,
      "h-14 p-1 flex items-center justify-between text-app-gray-1300 sticky left-0 top-0"
    );

    return (
      <header className={className} ref={RefLibs.connect(ref)}>
        <Link className="p-3 flex justify-center items-center" href="/diary">
          <h2 className="text-h2 text-white">다이어리</h2>
        </Link>
        <button className="p-3 flex justify-center items-center text-white">
          <ViewSvg />
        </button>
      </header>
    );
  }
);

export default DiaryHeader;
