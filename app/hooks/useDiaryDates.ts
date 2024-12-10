import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

const useDiaryDates = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);

  const { data, isLoading, isFetched, isFetching, error, refetch } = useQuery({
    queryKey: ["DIARY_DATES"],
    queryFn: () => {
      return noteApi.getNoteDates();
    },
  });

  return {
    array: data?.dateList,
    isLoading,
    isFetched,
    isFetching,
    error,
    refetch,
  };
};

export default useDiaryDates;
