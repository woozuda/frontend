import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";
import { DiaryLibs } from "../lib/diary";

export interface UseDiaryProps {
  id?: number;
}

const useDiary = (props: UseDiaryProps) => {
  const { id } = props;
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  return useInfiniteQuery({
    queryKey: ["DIARY", id] as const,
    queryFn: async ({ pageParam, queryKey }) => {
      const [, id] = queryKey;
      if (id === undefined) {
        return null;
      }
      const response = await diaryApi.getDiary(id, pageParam, 10);

      return DiaryLibs.fromResponse(response);
    },
    initialPageParam: 0,
    getNextPageParam: (page, pages, pageParam) => {
      if (page && page.last) {
        return null;
      }
      return pageParam + 1;
    },
  });
};

export default useDiary;
