import { useQuery } from "@tanstack/react-query";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { DiaryType } from "../lib/diary";

export interface UseNoteProps {
  diary?: {
    type?: DiaryType;
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
        case DiaryType.COMMON:
          return noteApi.getCommonNote(diary.id, note.id);
        case DiaryType.QUESTION:
          return noteApi.getQuestionNote(diary.id, note.id);
        case DiaryType.RETROSPECTIVE:
          return noteApi.getRetrospectNote(diary.id, note.id);
        default:
          return noteApi.getCommonNote(diary.id, note.id);
      }
    },
  });
};

export default useNote;
