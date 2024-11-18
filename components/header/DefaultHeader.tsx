"use client";

import ArrowLeftIcon from "@/app/assets/icons/ArrowLeft.svg";
import CloseIcon from "@/app/assets/icons/Close.svg";
import ShareIcon from "@/app/assets/icons/Share.svg";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export interface DefaultHeaderProps {
  title: string;

  onShare?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
}

const DefaultHeader = (props: DefaultHeaderProps) => {
  const { title, onShare, onClose } = props;
  const router = useRouter();
  return (
    <header className="h-14 p-1 flex items-center">
      <button
        className="p-3 flex justify-center items-center"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
      </button>
      <div className="w-full h-full flex items-center p-3">
        <p className="text-gray-900 text-lg">{title}</p>
      </div>
      <button
        onClick={onShare}
        className="p-3 flex justify-center items-center"
      >
        <ShareIcon />
      </button>
      <button
        className="p-3 flex justify-center items-center"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </header>
  );
};

export default DefaultHeader;
