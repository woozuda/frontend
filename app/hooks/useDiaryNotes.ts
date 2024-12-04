import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";

const useDiaryNotes = () => {
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  const { data, isLoading, isFetched, isFetching, error, refetch } = useQuery({
    queryKey: ["DIARY_NOTES"],
    queryFn: () => {
      return diaryApi.getDiaryNotes();
    },
  });

  return {
    array: data,
    isLoading,
    isFetched,
    isFetching,
    error,
    refetch,
  };
};

export default useDiaryNotes;
