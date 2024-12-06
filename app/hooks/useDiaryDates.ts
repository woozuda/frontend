import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";

const useDiaryDates = () => {
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  const { data, isLoading, isFetched, isFetching, error, refetch } = useQuery({
    queryKey: ["DIARY_DATES"],
    queryFn: () => {
      return diaryApi.getDiaryDates();
    },
  });

  return {
    array: data?.dates,
    isLoading,
    isFetched,
    isFetching,
    error,
    refetch,
  };
};

export default useDiaryDates;
