import { ArrowLeftSvg } from "@/app/assets/icons";
import { DiaryAPI } from "@/app/http";
import { Http } from "@/app/lib/http";
import { DiaryPage } from "@/app/pages/diary";
import getQueryClient from "@/app/query/client";
import Link from "next/link";
import { Toaster } from "sonner";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const http = new Http();
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }

  const diaryApi = new DiaryAPI(http);
  const queryClient = getQueryClient();
  const diary = await queryClient.fetchQuery({
    queryKey: ["DIARY", id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      return diaryApi.getDiary(id);
    },
  });
  return (
    <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
      <div className="w-full h-full flex flex-col relative overflow-y-scroll">
        <div className="w-full h-[240px] sticky top-0 left-0 shrink-0">
          <img
            src={diary.imgUrl}
            className="w-full h-full object-cover object-top absolute"
          />
          <div className="w-full h-14 flex items-center relative p-1">
            <Link href={"/diary"} className="w-[75px]">
              <ArrowLeftSvg className="text-white" />
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex bg-sky-950 z-10">
          <DiaryPage />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
