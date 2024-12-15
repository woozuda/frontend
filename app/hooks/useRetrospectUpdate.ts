import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { RetrospectiveEnums } from "../models/diary";

export interface NoteUpdateProps {
  note: {
    id: number;
    title: string;
    date: string | Date;
    type: RetrospectiveEnums | undefined;
    content: string[];
  };
  diary: {
    id: number;
  };
}

const useRetrospectUpdate = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useMutation({
    mutationKey: ["RETROSPECT_UPDATE"],
    mutationFn: async (props: NoteUpdateProps) => {
      const { note, diary } = props;
      const args = {
        noteId: note.id,
        diaryId: diary.id,
        title: note.title,
        date: format(note.date, "yyyy-MM-dd"),
        type: note.type,
        content: note.content,
      };
      return noteApi.patchRetrospectNote(args);
    },
  });
};

export default useRetrospectUpdate;
