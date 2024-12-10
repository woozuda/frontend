"use client";

import { MouseEventHandler } from "react";

export interface HeaderLoadingProps {
  date: string;

  onShare?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const HeaderLoading = () => {
  return (
    <header className="h-14 p-1 px-3 flex items-center justify-between">
      <div className="w-20 h-6 bg-app-gray-600 animate-pulse" />
      <div className="flex items-center gap-x-3">
        <div className="w-20 h-5 bg-app-gray-600 animate-pulse" />
        <div className="w-20 h-5 bg-app-gray-600 animate-pulse" />
      </div>
    </header>
  );
};

export default HeaderLoading;
