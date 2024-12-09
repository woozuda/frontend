import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";

const useDiaryNames = () => {
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  return useQuery({
    queryKey: ["DIARY_NAMES"],
    queryFn: () => {
      return diaryApi.getDiaryNames();
    },
  });
};

export default useDiaryNames;
