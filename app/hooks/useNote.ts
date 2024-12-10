import { useQuery } from "@tanstack/react-query";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { NoteType } from "../models/diary";

export interface UseNoteProps {
  diary?: {
    type?: NoteType;
    id?: number;
  };
  note?: {
    id?: number;
  };
}

const useNote = (props: UseNoteProps) => {
  const { diary, note } = props;

  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useQuery({
    queryKey: ["NOTE", diary, note] as const,
    queryFn: ({ queryKey }) => {
      const [, diary, note] = queryKey;
      if (
        isNil(diary) ||
        isNil(diary.id) ||
        isNil(diary.type) ||
        isNil(note) ||
        isNil(note.id)
      ) {
        return null;
      }
      switch (diary.type) {
        case NoteType.COMMON:
          return noteApi.getCommonNote(note.id);
        case NoteType.QUESTION:
          return noteApi.getQuestionNote(note.id);
        case NoteType.RETROSPECTIVE:
          return noteApi.getRetrospectNote(note.id);
        default:
          return noteApi.getCommonNote(note.id);
      }
    },
  });
};

export default useNote;
