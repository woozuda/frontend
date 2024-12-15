import { Diary as IDiary } from "@/app/models/diary";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDiaryList } from "../_hooks/useDiaryList";

type Props = {
  diaryId: number | null;
  setDiaryId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function DiaryDrawer({ diaryId, setDiaryId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [diaryName, setDiaryName] = useState<string>("");

  const { data, isFetching } = useDiaryList()

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-muted-foreground">
              {diaryId ? diaryName : "작성할 다이어리를 선택하세요"}
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-4">
        <DrawerTitle>다이어리 목록</DrawerTitle>
        <div className="w-full flex flex-col gap-4 pb-6 px-4">
          {
            data && 
            data.diaryList.map((diary: IDiary) => (
              <Button
              className="border-none"
                key={diary.id}
                variant={"outline"}
                disabled={isFetching}
                onClick={() => {
                  setDiaryId(diary.id);
                  setDiaryName(diary.title);
                  setIsOpen(false);
                }}
              >
                {diary.title}
              </Button>
            ))
          }
        </div>
      </DrawerContent>
    </Drawer>
  );
}
