"use client";

import useAiCreation from "@/app/hooks/useAiCreation";
import useNoteCount from "@/app/hooks/useNoteCount";
import { ReportLibs } from "@/app/lib/report";
import { useMutationState } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { isNil } from "ramda";
import { DiaryInsufficient } from "./insufficient";
import { AiCreationResult } from "./result";
import ReportSpinner from "./spinner";
import { AiCreationSufficient } from "./sufficient";

const AiCreation = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const { data: counts } = useNoteCount({ startDate: start, endDate: end });
  const { data, isFetching } = useAiCreation({
    startDate: start,
    endDate: end,
  });
  const mutationState = useMutationState({
    filters: {
      mutationKey: ["AI_CREATION_CREATE"],
      status: "pending",
    },
  });

  if (mutationState.length > 0 || isFetching) {
    return <ReportSpinner />;
  }

  if (counts && counts.diary < 2) {
    return <DiaryInsufficient />;
  }

  if (isNil(data)) {
    return <AiCreationSufficient />;
  }
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <AiCreationResult />
    </div>
  );
};

export default AiCreation;
