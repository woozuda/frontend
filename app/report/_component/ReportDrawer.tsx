"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { ManageSvg } from "@/app/assets/icons";

export default function ReportDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <ManageSvg className="w-8 h-8" />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-4 pb-6 px-4 bg-black">
        <DrawerTitle className="text-white mt-4 mr-auto">최근 8주 간 내역 보기</DrawerTitle>
            <div className="flex w-full h-full flex-col">
                
            </div>
      </DrawerContent>
    </Drawer>
  );
}
