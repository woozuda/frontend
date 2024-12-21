"use client";

import { DiaryActionType } from "@/app/lib/diary";
import { useShortlink } from "@/app/my/_hooks/useShortlink";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface DiaryDetailNotesSheetProps {
  action?: DiaryActionType;
  onActionChange?: (action: DiaryActionType) => unknown;

  checkedSize?: number;
  onCancel?: () => unknown;
  onDelete?: () => unknown;
  onShare?: () => unknown;
}

const DiaryDetailNotesSheet = (props: DiaryDetailNotesSheetProps) => {
  const { action, onActionChange, checkedSize, onCancel, onDelete, onShare } =
    props;
  const { data } = useShortlink();
  const sheetClassName = cn(
    "w-full max-w-[480px] bg-black flex overflow-hidden items-center justify-center",
    "transition-all ease-in-out px-5 py-6 rounded-t-[20px]",
    checkedSize === 0 && "opacity-0 invisible h-0 duration-0",
    checkedSize !== 0 &&
      action === DiaryActionType.DEFAULT &&
      "h-[124px] duration-300",
    checkedSize !== 0 &&
      action === DiaryActionType.SHARE &&
      "duration-100 h-[200px]",
    checkedSize !== 0 &&
      action === DiaryActionType.DELETE &&
      "duration-100 h-[175px]"
  );
  console.log(data);
  return (
    <div className="w-full fixed bg-transparent flex justify-center bottom-0 left-0 right-0">
      <div className={sheetClassName}>
        {action === DiaryActionType.DEFAULT && (
          <div className="w-full h-[68px] flex pb-3 gap-x-2">
            <button
              className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
              onClick={() => onActionChange?.(DiaryActionType.SHARE)}
            >
              <h4 className="text-sub4 text-white">공유하기</h4>
            </button>
            <button
              className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
              onClick={() => onActionChange?.(DiaryActionType.DELETE)}
            >
              <h4 className="text-sub4 text-white">삭제하기</h4>
            </button>
          </div>
        )}
        {action === DiaryActionType.DELETE && (
          <div className="w-full flex flex-col gap-y-6">
            <p className="text-body1 text-app-gray-300">
              선택한 일기 {checkedSize}개를 삭제하시겠습니까?
            </p>
            <div className="w-full h-[68px] flex pb-3 gap-x-2">
              <button
                className="w-full flex justify-center items-center bg-black rounded-lg border-app-gray-100 border"
                onClick={onCancel}
              >
                <h4 className="text-sub4 text-white">취소</h4>
              </button>
              <button
                className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
                onClick={onDelete}
              >
                <h4 className="text-sub4 text-white">삭제하기</h4>
              </button>
            </div>
          </div>
        )}
        {action === DiaryActionType.SHARE && (
          <div className="flex flex-col w-full gap-y-6">
            <p className="text-body1 text-app-gray-100 whitespace-break-spaces">
              선택한 일기 {checkedSize}개를 공유하였습니다.{"\n"}공유된 일기
              페이지로 이동하시겠습니까?
            </p>
            <div className="w-full h-[68px] flex pb-3 gap-x-2">
              <button
                className="w-full flex justify-center items-center bg-black rounded-lg border border-app-gray-100"
                onClick={onCancel}
              >
                <h4 className="text-sub4 text-white">취소</h4>
              </button>
              {data && (
                <Link
                  className="w-full flex justify-center items-center bg-app-gray-1000 rounded-lg"
                  href={`/my/shared/${data.shortlink}`}
                >
                  <h4 className="text-sub4 text-white">확인</h4>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryDetailNotesSheet;
