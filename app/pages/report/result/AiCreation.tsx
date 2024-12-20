import useAiCreation from "@/app/hooks/useAiCreation";
import useAiCreationCreate from "@/app/hooks/useAiCreationCreate";
import { AiCreationActionType, ReportLibs } from "@/app/lib/report";
import { AiCreationEnums } from "@/app/models/report";
import { useMy } from "@/app/my/_hooks/useMy";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import AiCreationShare from "../sheet/AiCreationShare";

const AiCreationResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const { data: info } = useMy();
  const [action, setAction] = useState(AiCreationActionType.DEFAULT);

  const { data } = useAiCreation({ startDate: start, endDate: end });

  const onError = useCallback(() => {
    setAction(AiCreationActionType.SHARE);
  }, []);

  const { mutateAsync } = useAiCreationCreate({ onError });
  const onShare = async () => {
    await mutateAsync({
      startDate: start,
      endDate: end,
      type: AiCreationEnums.POETRY,
    });
  };

  const html = data ? data.content.join("") : "";

  return (
    <div className="w-full flex flex-col px-5 pt-4 pb-5 gap-y-4">
      <h2 className="text-h2 text-white">{data?.title}</h2>
      <div className="w-full flex flex-col">
        <p dangerouslySetInnerHTML={{ __html: html }}></p>
      </div>
      <Sheet
        onOpenChange={(open) => {
          if (!open) {
            setAction(AiCreationActionType.DEFAULT);
          }
        }}
      >
        <SheetTrigger asChild>
          <button className="w-full h-14 bg-app-primary-100 rounded-[30px] flex justify-center items-center mt-10">
            <span className="text-white text-sub4">공유하기</span>
          </button>
        </SheetTrigger>
        <AiCreationShare action={action} onShare={onShare} />
      </Sheet>
    </div>
  );
};

export default AiCreationResult;