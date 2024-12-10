import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";

const useDiaries = () => {
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  const { data, isLoading, isFetched, isFetching, error, refetch } = useQuery({
    queryKey: ["DIARY"] as const,
    queryFn: () => {
      return diaryApi.getDiaries();
    },
  });

  return {
    array: data?.diaryList,
    isLoading,
    isFetched,
    isFetching,
    error,
    refetch,
  };
};

export default useDiaries;
