"use client";

import BackButton from "@/app/_component/BackButton";
import WriteRetrospectForm from "@/app/diary/_component/WriteRetrospectForm";
import { RETROSPECT } from "@/app/diary/_component/retrospectData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DiaryDrawer from "@/app/diary/_component/DiaryDrawer";
import CalendarDrawer from "@/app/diary/_component/CalendarDrawer";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCreateRetrospect } from "@/app/diary/_hooks/useCreateRetrospect";
import { toast } from "sonner";

export default function CreateFrameworkPage() {
  const { frameworkId } = useParams();
  const [diaryId, setDiaryId] = useState<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<{ [sectionName: string]: string }>({});

  const [isDiaryId, setIsDiaryId] = useState(true)
  const [isDate, setIsDate] = useState(true)
  const [isTitle, setIsTitle] = useState(true)
  const [isText, setIsText] = useState(true)

  const { mutate, isPending } = useCreateRetrospect({
    retrospectId: Number(frameworkId),
    type: "회고",
    date,
    diaryId: diaryId as number,
    title,
    retrospectText: text,
  });

  const selectedRetrospect = RETROSPECT.find(
    (retrospect) => retrospect.retrospectId === Number(frameworkId)
  );
  const hasValue: () => { section?: string, status: boolean} = () => {
    for (const [key, value] of Object.entries(text)) {
      if (!value) {
        return { section: key, status: false };
      }
    }
    return { section: "all", status: true };
  };
  const checkRetrospectForm = () => {
    let isValid = true;
  
    if (!diaryId) {
      setIsDiaryId(false);
      toast.warning("다이어리를 선택하세요.");
      isValid = false;
    } else {
      setIsDiaryId(true);
    }
  
    if (!date) {
      setIsDate(false);
      toast.warning("날짜를 선택하세요.");
      isValid = false;
    } else {
      setIsDate(true);
    }
  
    if (!title) {
      setIsTitle(false);
      toast.warning("제목을 입력하세요.");
      isValid = false;
    } else {
      setIsTitle(true);
    }

    if (!hasValue().status) {
      setIsText(false);
      toast.warning(`${hasValue().section}를 입력하세요!`);
      isValid = false;
    } else {
      setIsText(true);
    }
  
    return isValid;   
  }

  return (
    <main className="h-full min-h-screen w-full sm:min-w-[450px] sm:max-w-[500px] flex flex-col items-center gap-4 py-6 px-4">
      <section className="w-full">
        <div className="flex items-center gap-6">
          <BackButton />
          <h1 className="font-bold text-lg">
            {selectedRetrospect?.retrospectName}
          </h1>
          <Button
            className="ml-auto border-none font-bold text-lg"
            variant={"outline"}
            onClick={() => {
              if(checkRetrospectForm()) {
                mutate();
              }
            }}
            disabled={isPending}
          >
            완료
          </Button>
        </div>
      </section>
      <section className="w-full flex flex-col gap-2">
        <DiaryDrawer diaryId={diaryId} setDiaryId={setDiaryId} />
        <CalendarDrawer date={date} setDate={setDate} />
        <Input
          className="bg-transparent border-t-0 border-x-0 border-slate-400 rounded-none h-[56px] placeholder:text-muted-foreground"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section className="w-full mt-6">
        <WriteRetrospectForm
          retrospectId={Number(frameworkId)}
          text={text}
          setText={setText}
        />
      </section>
    </main>
  );
}
