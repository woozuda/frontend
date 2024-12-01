import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

const useNoteCommonCreate = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  return useMutation({
    mutationKey: ["NOTE_CREATE"],
    mutationFn: (diaryId: number) => {
      return noteApi.createCommonNote(diaryId);
    },
  });
};

export default useNoteCommonCreate;
