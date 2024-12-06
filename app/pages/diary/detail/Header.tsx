"use client";

import { ManageSvg } from "@/app/assets/icons";

export interface DiaryDetailNotesHeaderProps {
  isClicked?: boolean;
  noteCount?: number;
  checkedSize?: number;
  onManageClick?: (value: boolean) => unknown;
}

const DiaryDetailNotesHeader = (props: DiaryDetailNotesHeaderProps) => {
  const { isClicked, noteCount, checkedSize, onManageClick } = props;
  return (
    <div className="w-full flex items-center justify-between h-10 px-5 shrink-0">
      <h5 className="text-app-gray-600 text-sub5">총 {noteCount}개</h5>
      {!isClicked && (
        <button
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => onManageClick?.(true)}
        >
          <ManageSvg className="text-app-gray-600" />
        </button>
      )}
      {isClicked && (
        <button
          className="flex items-center px-1 py-3 gap-x-2"
          onClick={() => onManageClick?.(false)}
        >
          <span className="text-app-gray-600 text-sub5">{checkedSize}개</span>
          <span className="text-app-gray-600 text-sub5">선택</span>
        </button>
      )}
    </div>
  );
};

export default DiaryDetailNotesHeader;
