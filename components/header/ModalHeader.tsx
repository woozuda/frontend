"use client";

import CloseIcon from "@/app/assets/icons/Close.svg";
import { MouseEventHandler } from "react";

export interface ModalHeaderProps {
  title: string;

  onClose?: MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { title, onClose } = props;

  return (
    <header className="h-14 p-1 flex items-center text-app-gray-1300">
      <div className="bg-transparent w-12 h-12" />
      <div className="w-full h-full flex justify-center items-center p-3">
        <p className="text-sub3">{title}</p>
      </div>
      <button
        className="p-3 flex justify-center items-center"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </header>
  );
};

export default ModalHeader;
