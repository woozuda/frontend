import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

const useQuestion = () => {
  const http = useHttp();
  const noteAPI = new NoteAPI(http);

  return useQuery({
    queryKey: ["QUESTION"],
    queryFn: () => {
      return noteAPI.getQuestion();
    },
  });
};

export default useQuestion;
