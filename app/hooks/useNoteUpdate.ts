import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { NoteType } from "../models/diary";

export interface NoteUpdateProps {
  note: {
    id: number;
    type: NoteType;
    title: string;
    weather: string;
    season: string;
    feeling: string;
    date: string | Date;
    content: string;
  };
  diary: {
    id: number;
  };
}

const useNoteUpdate = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useMutation({
    mutationKey: ["NOTE_UPDATE"],
    mutationFn: async (props: NoteUpdateProps) => {
      const { note, diary } = props;
      const args = {
        noteId: note.id,
        diaryId: diary.id,
        title: note.title,
        weather: note.weather,
        season: note.season,
        feeling: note.feeling,
        date: format(note.date, "yyyy-MM-dd"),
        content: note.content,
      };
      if (note.type === NoteType.COMMON) {
        return noteApi.patchCommonNote(args);
      }
      if (note.type === NoteType.QUESTION) {
        return noteApi.patchQuestionNote(args);
      }
    },
  });
};

export default useNoteUpdate;
