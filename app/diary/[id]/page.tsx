"use client";

import { ArrowLeftSvg } from "@/app/assets/icons";
import useDiary from "@/app/hooks/useDiary";
import useNoteDelete from "@/app/hooks/useNoteDelete";
import useNoteShare from "@/app/hooks/useNoteShare";
import { DiaryActionType, DiaryLibs } from "@/app/lib/diary";
import { DiaryNote } from "@/app/models/diary";
import { useShortlink } from "@/app/my/_hooks/useShortlink";
import {
  DiaryDetailNotes,
  DiaryDetailNotesHeader,
  DiaryDetailNotesSheet,
} from "@/app/pages/diary/detail";
import { useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data, isLoading, isFetching, fetchNextPage } = useDiary({ id });
  const [checkeds, setCheckeds] = useState<Set<number>>(new Set());
  const [action, setAction] = useState(DiaryActionType.DEFAULT);
  const [isClicked, setIsClicked] = useState(false);
  const [ref, entry] = useIntersectionObserver();
  const [bottomRef, bottomEntry] = useIntersectionObserver();
  const { mutateAsync: deleteNotes } = useNoteDelete();
  const { mutateAsync: shareNotes } = useNoteShare();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { refetch } = useShortlink();

  const notes = useMemo(() => {
    return DiaryLibs.groupNotes(data);
  }, [data]);

  useEffect(() => {
    if (bottomEntry?.isIntersecting && !isLoading && !isFetching) {
      fetchNextPage();
    }
  }, [bottomEntry?.isIntersecting, isLoading, isFetching, fetchNextPage]);

  if (!data) {
    return null;
  }
  const onCheck = (note: DiaryNote, checkedState: boolean) => {
    const newCheckeds = new Set(checkeds);

    if (!checkedState) {
      newCheckeds.delete(note.note.id);
    } else {
      newCheckeds.add(note.note.id);
    }
    if (newCheckeds.size === 0) {
      setAction(DiaryActionType.DEFAULT);
    }
    setCheckeds(newCheckeds);
  };
  const onCancel = () => {
    setIsClicked(false);
    setCheckeds(new Set());
    setAction(DiaryActionType.DEFAULT);
  };
  const onActionChange = async (type: DiaryActionType) => {
    if (type === DiaryActionType.DELETE) {
      setAction(DiaryActionType.DELETE);
    } else if (type === DiaryActionType.SHARE) {
      try {
        await shareNotes({ ids: Array.from(checkeds) });
        await refetch();
      } catch (error) {
        toast.error("알 수 없는 오류가 발생했습니다.");
      } finally {
        setAction(DiaryActionType.SHARE);
      }
    }
  };
  const onDelete = async () => {
    try {
      await deleteNotes({ ids: Array.from(checkeds) });
    } catch (error) {
      toast.error("알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsClicked(false);
      setCheckeds(new Set());
      setAction(DiaryActionType.DEFAULT);
      await queryClient.invalidateQueries({ queryKey: ["DIARY", id] });
    }
  };
  const initialPage = data.pages.at(0);
  return (
    <div className="w-full max-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div className="w-full h-full flex flex-col relative">
        <div className="w-full h-[240px] sticky top-0 left-0 shrink-0">
          <img
            src={initialPage?.imgUrl}
            className="w-full h-full object-cover object-top absolute"
          />
          <div className="w-full h-14 flex items-center relative p-1">
            <button
              onClick={() => {
                router.back();
              }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <ArrowLeftSvg className="text-white" />
            </button>
          </div>
        </div>
        {entry && !entry.isIntersecting && (
          <div className="w-full h-14 flex items-center p-1 z-20 sticky top-0 left-0 right-0 shrink-0 bg-app-primary-100">
            <button
              className="flex justify-center items-center w-12 h-12 shrink-0"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeftSvg className="text-white" />
            </button>
            <div className="flex items-center">
              <h3 className="text-sub3 text-white">{initialPage?.title}</h3>
            </div>
          </div>
        )}
        <div className="w-full h-full flex bg-sky-950 z-10 relative pb-[72px]">
          <div className="flex w-full flex-col relative gap-y-3 pb-5">
            <div
              className="w-full h-px bg-transparent top-[-50px] left-0 right-0 absolute"
              ref={ref}
            />
            <DiaryDetailNotesHeader
              isClicked={isClicked}
              noteCount={initialPage?.noteCount}
              checkedSize={checkeds.size}
              onManageClick={(value) => setIsClicked(value)}
            />
            <DiaryDetailNotes
              notes={notes}
              isClicked={isClicked}
              checkeds={checkeds}
              onCheck={onCheck}
            />
            <div ref={bottomRef} className="w-full h-0.5 bg-transparent" />
            <DiaryDetailNotesSheet
              action={action}
              checkedSize={checkeds.size}
              onCancel={onCancel}
              onActionChange={onActionChange}
              onDelete={onDelete}
            />
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
