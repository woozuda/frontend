"use client";

import BackButton from "@/app/_component/BackButton";
import CalendarDrawer from "@/app/diary/_component/CalendarDrawer";
import DiaryDrawer from "@/app/diary/_component/DiaryDrawer";
import WriteRetrospectForm from "@/app/diary/_component/WriteRetrospectForm";
import { RETROSPECT } from "@/app/diary/_component/retrospectData";
import { useCreateRetrospect } from "@/app/diary/_hooks/useCreateRetrospect";
import { useNotification } from "@/app/hooks/useNotification";
import { NoteLibs } from "@/app/lib/note";
import { ReportLibs } from "@/app/lib/report";
import { getAlarm } from "@/app/my/_lib/getAlarm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, endOfWeek, format, startOfWeek } from "date-fns";
import { useParams } from "next/navigation";
import { isNotNil } from "ramda";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateFrameworkPage() {
  const { frameworkId } = useParams();
  const [diaryId, setDiaryId] = useState<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<{ [sectionName: string]: string }>({});
  const [content, setContent] = useState<string[]>([]);
  const { subscription } = useNotification();

  const [isDiaryId, setIsDiaryId] = useState(true);
  const [isDate, setIsDate] = useState(true);
  const [isTitle, setIsTitle] = useState(true);
  const [isText, setIsText] = useState(true);

  const { data: alarmData } = useQuery({
    queryKey: ["ALARM"],
    queryFn: getAlarm,
  });

  const queryClient = useQueryClient();

  const selectedRetrospect = RETROSPECT.find(
    (retrospect) => retrospect.retrospectId === Number(frameworkId)
  );

  const { mutate, isPending } = useCreateRetrospect({
    type: selectedRetrospect!.type,
    date: format(date, "yyyy-MM-dd"),
    diaryId: diaryId as number,
    title,
    content,
  });

  const invalidate = async () => {
    const startDate = ReportLibs.toDateParam(addDays(startOfWeek(date), 1));
    const endDate = ReportLibs.toDateParam(addDays(endOfWeek(date), 1));

    await queryClient.invalidateQueries({
      queryKey: ["REPORT_COUNT", startDate, endDate, frameworkId],
    });
  };

  const setRetrospectContent = () => {
    for (const [key, value] of Object.entries(text)) {
      setContent((prev) => [...prev, value]);
    }
  };

  const hasValue: () => { section?: string; status: boolean } = () => {
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
  };

  const onSubmit = async () => {
    if (checkRetrospectForm()) {
      setRetrospectContent();
      mutate();
      await invalidate();

      const count = await NoteLibs.fetchCountOnSuccess(queryClient, date);
      const hasReport = await NoteLibs.fetchReportRetrospectiveOnSuccess(
        queryClient,
        date,
        selectedRetrospect!.type
      );

      if (
        count.nonRetroCount >= 3 &&
        isNotNil(hasReport) &&
        !hasReport &&
        alarmData &&
        alarmData.alarm
      ) {
        fetch("/api/web-push/notification", {
          method: "POST",
          body: JSON.stringify({
            title: "레포트 작성 가능",
            message: "회고 레포트를 작성해보세요",
            subscription,
          }),
        });
      }
    }
  };

  return (
    <main className="h-full min-h-screen w-full sm:min-w-[450px] sm:max-w-[500px] flex flex-col items-center gap-4 py-6 px-4">
      <section className="w-full h-12 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-6">
          <BackButton />
          <h1 className="font-bold text-lg">{selectedRetrospect?.type}</h1>
          <Button
            className="ml-auto border-none font-bold text-lg"
            variant={"outline"}
            onClick={onSubmit}
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
