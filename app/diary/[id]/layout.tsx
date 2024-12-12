import { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import { DiaryAPI } from "@/app/http";
import { Http } from "@/app/lib/http";
import { DiaryNote } from "@/app/models/diary";
import getQueryClient from "@/app/query/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export interface LayoutProps extends PropsWithChildren {
  params: Promise<{ id: number }>;
}

export default async function Layout(props: LayoutProps) {
  const { children, params } = props;
  const cookie = cookies();
  const authorization = cookie.get("Authorization")?.value;
  const id = (await params).id;
  const http = new Http({
    credentials: "include",
    headers: {
      Cookie: `Authorization=${authorization}`,
    },
  });
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }

  const diaryApi = new DiaryAPI(http);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["DIARY", id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { page, ...diary } = await diaryApi.getDiary(id);

      const reducedNotes = page?.content?.reduce((record, note) => {
        if (!(note.note.date in record)) {
          record[note.note.date] = [];
        }
        record[note.note.date].push(note);
        return record;
      }, {} as Record<string, DiaryNote[]>);
      return {
        ...diary,
        notes: reducedNotes ? Object.entries(reducedNotes) : null,
      };
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      <Toaster />
    </HydrationBoundary>
  );
}
