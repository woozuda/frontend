"use client";

import { Star28Svg } from "@/app/assets/icons";
import useAiCreationCreate from "@/app/hooks/useAiCreationCreate";
import { ReportLibs } from "@/app/lib/report";
import { AiCreationEnums } from "@/app/models/report";
import { useMy } from "@/app/my/_hooks/useMy";
import { useSearchParams } from "next/navigation";
import SufficientItem from "./Item";

const AiCreationSufficient = () => {
  const { mutateAsync } = useAiCreationCreate({});
  const searchParams = useSearchParams();
  const { data: info } = useMy();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  return (
    <SufficientItem
      icon={<Star28Svg className="text-white" />}
      text="이번주 일기를 분석해 보세요"
      onClick={() => {
        mutateAsync({
          startDate: start,
          endDate: end,
          type: AiCreationEnums.POETRY,
        });
      }}
    />
  );
};

export default AiCreationSufficient;
