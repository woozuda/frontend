"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "../_component/LogoutButton";
import { useAiType } from "./_hooks/useAiType";
import { useAlarm } from "./_hooks/useAlarm";
import { useMy } from "./_hooks/useMy";
import { useShortlink } from "./_hooks/useShortlink";
import { getAiType } from "./_lib/getAitype";
import { getAlarm } from "./_lib/getAlarm";

export default function MyPage() {
  const [alarm, setAlarm] = useState<boolean>(false);
  const [aiType, setAiType] = useState<
    "PICTURE_POETRY" | "PICTURE_NOVEL" | undefined
  >();
  const [shortlink, setShortlink] = useState<string>("");

  const { data } = useMy();
  const { mutate: alarmMutate, isPending: alarmIsPending } = useAlarm();
  const { mutate: aiTypeMutate, isPending: aiTypeIsPending } = useAiType();
  const { data: shortlinkData } = useShortlink();

  const { data: aiTypeData } = useQuery({
    queryKey: ["AITYPE"],
    queryFn: getAiType,
  });
  const { data: alarmData } = useQuery({
    queryKey: ["ALARM"],
    queryFn: getAlarm,
  });

  useEffect(() => {
    if (alarmData) {
      let defaultCheck;
      if (alarmData.alarm === "on") {
        defaultCheck = true;
      } else {
        defaultCheck = false;
      }
      setAlarm(defaultCheck);
    }
    if (aiTypeData) {
      setAiType(aiTypeData.aiType);
    }
    if (shortlinkData) {
      setShortlink(shortlinkData.shortlink);
    }
  }, [alarmData, aiTypeData, shortlinkData]);

  const onChangeAlarm = (e: boolean) => {
    let status;
    if (e === true) {
      status = "on";
    } else {
      status = "off";
    }
    alarmMutate(status);
  };

  if (!alarmData || !alarmData || !shortlinkData) {
    return null;
  }

  return (
    <main className="w-full flex flex-col items-center gap-6 py-6 px-4">
      <section className="w-full flex flex-col gap-6">
        <h1 className="font-bold text-xl">MY</h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">내 계정</h1>
            <LogoutButton text="로그아웃" />
          </div>
          {data ? (
            <span>{data.email}</span>
          ) : (
            <span>계정을 불러올 수 없습니다.</span>
          )}
        </div>
      </section>
      <section className="w-full">
        <Link href={`/my/shared/${shortlink}`}>
          <motion.div whileTap={{ scale: 0.8 }}>
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-[#5AC6F4] to-[#FFC3DF] text-slate-100 text-lg">
              공유한 일기 보기
            </Button>
          </motion.div>
        </Link>
      </section>
      <div className="w-full border-b-2 my-4"></div>
      <section className="w-full flex flex-col gap-6">
        <h1 className="font-bold text-2xl">설정</h1>
        {aiTypeData && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl">분석 형태 설정</h1>
            <span className="text-slate-300">
              분석 형태를 설정하면 주간 단위로 분석해요
            </span>
            <div className="flex justify-center gap-2">
              <Button
                className={`flex-1 h-12 bg-app-primary-200 hover:bg-app-primary-100 ${
                  aiTypeData.aiType === "PICTURE_NOVEL"
                    ? "border border-white"
                    : ""
                }`}
                onClick={() => aiTypeMutate("novel")}
                disabled={aiTypeIsPending}
              >
                그림과 소설
              </Button>
              <Button
                className={`flex-1 h-12 bg-app-primary-200 hover:bg-app-primary-100 ${
                  aiType === "PICTURE_POETRY" ? "border border-slate-400" : ""
                }`}
                onClick={() => aiTypeMutate("poem")}
                disabled={aiTypeIsPending}
              >
                그림과 시
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex">
            <h1 className="text-xl">알림 설정</h1>
            <div className="flex items-center gap-2 ml-auto">
              {alarmData.alarm && (
                <Checkbox
                  className="w-5 h-5 rounded-full border-2 border-white"
                  onCheckedChange={onChangeAlarm}
                  defaultChecked={alarmData.alarm === "on"}
                  disabled={alarmIsPending}
                />
              )}
              <span className=" text-lg">알림 받기</span>
            </div>
          </div>
          <span className="text-slate-300">
            매주 작성한 일기를 바탕으로 분석이 완료되면 알림을 보내 드려요.
          </span>
        </div>
      </section>
    </main>
  );
}
