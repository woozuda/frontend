"use client";

import { AiCreationActionType } from "@/app/lib/report";
import BottomSheetV2 from "@/components/BottomSheet/v2";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

export interface AiCreationShareProps {
  action?: AiCreationActionType;
  onShare?: () => unknown;
}

const AiCreationShare = (props: AiCreationShareProps) => {
  const { action, onShare } = props;

  return (
    <BottomSheetV2 className="bg-black border-0 rounded-t-lg">
      {action === AiCreationActionType.DEFAULT && (
        <BottomSheetV2.Header>
          <h3 className="text-body1 text-app-gray-300">
            AI 창작 콘텐츠를 공유하시겠습니까?
          </h3>
        </BottomSheetV2.Header>
      )}
      {action === AiCreationActionType.DEFAULT && (
        <BottomSheetV2.Button>
          <SheetClose className="w-full h-14 flex justify-center items-center rounded-lg bg-black border border-app-gray-1000">
            <h4 className="text-sub4 text-app-gray-100">취소</h4>
          </SheetClose>
        </BottomSheetV2.Button>
      )}
      {action === AiCreationActionType.DEFAULT && (
        <BottomSheetV2.Button>
          <button
            className="w-full h-14 flex justify-center items-center rounded-lg bg-app-gray-1000"
            onClick={() => onShare?.()}
          >
            <h4 className="text-sub4 text-app-gray-100">공유하기</h4>
          </button>
        </BottomSheetV2.Button>
      )}
      {action === AiCreationActionType.SHARE && (
        <BottomSheetV2.Header>
          <h3 className="text-body1 text-app-gray-300 whitespace-break-spaces">
            {
              "해당 AI 창작 콘텐츠가 공유되었습니다.\n공유된 일기 페이지로 이동하시겠습니까?"
            }
          </h3>
        </BottomSheetV2.Header>
      )}
      {action === AiCreationActionType.SHARE && (
        <BottomSheetV2.Button>
          <SheetClose className="w-full h-14 flex justify-center items-center rounded-lg bg-black border border-app-gray-1000">
            <h4 className="text-sub4 text-app-gray-100">취소</h4>
          </SheetClose>
        </BottomSheetV2.Button>
      )}
      {action === AiCreationActionType.SHARE && (
        <BottomSheetV2.Button>
          <SheetClose
            className="w-full h-14 flex justify-center items-center rounded-lg bg-app-gray-1000"
            asChild
          >
            <Link href={"/my/shared"} className="text-sub4 text-app-gray-100">
              확인
            </Link>
          </SheetClose>
        </BottomSheetV2.Button>
      )}
    </BottomSheetV2>
  );
};

export default AiCreationShare;
