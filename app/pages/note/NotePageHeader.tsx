"use client";

import { ArrowLeftSvg, PencilSvg, ShareSvg } from "@/app/assets/icons";
import useNoteShare from "@/app/hooks/useNoteShare";
import { NoteType } from "@/app/models/diary";
import BackLink from "@/components/BackLink";
import BottomSheetV2 from "@/components/BottomSheet/v2";
import { HeaderV2 } from "@/components/header/v2";
import { Sheet, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { isNotNil } from "ramda";
import { useState } from "react";
import { toast } from "sonner";

export interface NotePageHeaderProps {
  type?: NoteType;
  id?: number;
}

const NotePageHeader = (props: NotePageHeaderProps) => {
  const { id, type } = props;
  const [isConfirm, setIsConfirm] = useState(false);
  const { mutateAsync: shareNotes } = useNoteShare();

  const onShare = async () => {
    try {
      await shareNotes({ ids: isNotNil(id) ? [id] : undefined });
      setIsConfirm(true);
    } catch (error) {
      toast.warning("알 수 없는 에러가 발생했습니다.");
    }
  };

  return (
    <HeaderV2 className="sticky top-0 left-0 right-0 bg-white">
      <HeaderV2.Left>
        <BackLink className="w-12 h-12 flex justify-center items-center">
          <ArrowLeftSvg />
        </BackLink>
      </HeaderV2.Left>
      <HeaderV2.Right>
        <div className="flex">
          <Sheet
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => {
                  setIsConfirm(false);
                }, 100);
              }
            }}
          >
            <SheetTrigger className="w-12 h-12 flex items-center justify-center">
              <ShareSvg className="text-app-gray-300" />
            </SheetTrigger>
            <BottomSheetV2>
              <BottomSheetV2.Header>
                {!isConfirm && (
                  <p className="text-body1 text-app-primary-100">
                    해당 일기를 공유하시겠습니까?
                  </p>
                )}
                {isConfirm && (
                  <p className="text-body1 whitespace-normal text-app-primary-100">
                    해당 일기가 공유되었습니다.{"\n"}공유된 일기 페이지로
                    이동하시겠습니까?
                  </p>
                )}
              </BottomSheetV2.Header>
              {!isConfirm && (
                <BottomSheetV2.Button>
                  <SheetClose className="w-full flex justify-center items-center bg-app-gray-300 text-app-gray-1200 text-sub4 h-14 rounded-lg">
                    취소
                  </SheetClose>
                </BottomSheetV2.Button>
              )}
              {!isConfirm && (
                <BottomSheetV2.Button>
                  <button
                    className="w-full flex justify-center items-center text-white bg-app-primary-100 text-sub4 h-14 rounded-lg"
                    onClick={() => onShare()}
                  >
                    공유하기
                  </button>
                </BottomSheetV2.Button>
              )}
              {isConfirm && (
                <BottomSheetV2.Button>
                  <SheetClose className="w-full flex justify-center items-center bg-app-gray-300 text-app-gray-1200 text-sub4 h-14 rounded-lg">
                    취소
                  </SheetClose>
                </BottomSheetV2.Button>
              )}
              {isConfirm && (
                <BottomSheetV2.Button>
                  <SheetClose className="w-full flex justify-center items-center text-white bg-app-primary-100 text-sub4 h-14 rounded-lg">
                    공유하기
                  </SheetClose>
                </BottomSheetV2.Button>
              )}
            </BottomSheetV2>
          </Sheet>
          <div className="w-12 h-12 flex items-center justify-center">
            <Link href={`/note/${type}/${id}/edit`}>
              <PencilSvg className="text-black" />
            </Link>
          </div>
        </div>
      </HeaderV2.Right>
    </HeaderV2>
  );
};

export default NotePageHeader;
