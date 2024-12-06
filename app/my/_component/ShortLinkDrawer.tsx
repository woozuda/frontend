"use client";

import {
    SharedDrawer,
    SharedDrawerContent,
    SharedDrawerTitle,
} from "@/components/ui/sharedDrawer";
import { Button } from "@/components/ui/button";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShortLinkDrawer({ isOpen, setIsOpen }: Props) {
    return (
        <SharedDrawer open={isOpen} onOpenChange={setIsOpen}>
            <SharedDrawerContent className="flex flex-col items-center gap-4 px-4 pb-12 bg-black border-none text-white">
                <SharedDrawerTitle className="mr-auto">숏링크 만들기</SharedDrawerTitle>
                <Button
                className="flex-1 w-full h-24 bg-app-gray-300 border border-slate-700 text-slate-600"
                // onClick={() => onCloseDrawer()}
              >
                https://woozuda/share/
              </Button>
              <Button
                className="flex-1 w-full bg-app-gray-1000 text-slate-300"
                // onClick={() => {mutate(noShareList); onCloseDrawer()}}
                // disabled={isPending}
              >
                복사하기
              </Button>
            </SharedDrawerContent>
        </SharedDrawer>
    )
}