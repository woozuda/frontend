import useAiCreation from "@/app/hooks/useAiCreation";
import useAiCreationShare from "@/app/hooks/useAiCreationShare";
import { AiCreationActionType, ReportLibs } from "@/app/lib/report";
import { useMy } from "@/app/my/_hooks/useMy";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AiCreationShare from "../sheet/AiCreationShare";

const AiCreationResult = () => {
  const searchParams = useSearchParams();
  const [start, end] = ReportLibs.getPeriod(searchParams);
  const { data: info } = useMy();
  const [action, setAction] = useState(AiCreationActionType.DEFAULT);

  const { data } = useAiCreation({ startDate: start, endDate: end });

  const { mutateAsync } = useAiCreationShare();
  const onShare = async () => {
    if (!data) {
      toast.error("창작물이 존재하지 않습니다.");
      return;
    }
    await mutateAsync({
      ids: [data.id],
    });
    setAction(AiCreationActionType.SHARE);
  };

  return (
    <div className="w-full flex flex-col px-5 pt-4 pb-5 gap-y-4 bg-app-dim bg-opacity-20 rounded-xl">
      {/* <h2 className="text-h2 text-white">{data?.title}</h2> */}
      {data && data.image_url && (
        <img src={data.image_url} className="rounded-sm w-full h-full" />
      )}
      <div className="w-full flex flex-col">
        <p className="whitespace-break-spaces text-body2 text-app-gray-500">
          {data?.text.split("\n").join("\n")}
        </p>
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
