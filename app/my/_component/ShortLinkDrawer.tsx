"use client";

import { Button } from "@/components/ui/button";
import {
  SharedDrawer,
  SharedDrawerContent,
  SharedDrawerTitle,
} from "@/components/ui/sharedDrawer";
import { toast } from "sonner";

type Props = {
  shortlink: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShortLinkDrawer({
  shortlink,
  isOpen,
  setIsOpen,
}: Props) {
  const handleCopyToClipboard = () => {
    const fullLink = `https://woozuda.swygbro.com/my/shared/${shortlink}`;
    navigator.clipboard
      .writeText(fullLink)
      .then(() => {
        toast.success("링크가 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        toast.error("복사에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <SharedDrawer open={isOpen} onOpenChange={setIsOpen}>
      <SharedDrawerContent className="flex flex-col items-center gap-4 px-4 pb-12 bg-black border-none text-white">
        <SharedDrawerTitle className="mr-auto">숏링크 만들기</SharedDrawerTitle>
        <div className="flex justify-center items-center w-full h-12 bg-app-gray-100 rounded-lg border border-slate-700 text-slate-600">
          <span>{`https://woozuda.swygbro.com/my/shared/${shortlink}`}</span>
        </div>
        <Button
          className="w-full h-12 bg-app-gray-1000 text-slate-300"
          onClick={() => {
            handleCopyToClipboard();
          }}
        >
          복사하기
        </Button>
      </SharedDrawerContent>
    </SharedDrawer>
  );
}
