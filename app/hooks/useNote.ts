import { useQuery } from "@tanstack/react-query";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { NoteType } from "../models/diary";

export interface UseNoteProps {
  id?: number;
  type?: NoteType;
}

const useNote = (props: UseNoteProps) => {
  const { id, type } = props;

  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useQuery({
    queryKey: ["NOTE", id, type] as const,
    queryFn: ({ queryKey }) => {
      const [, id, type] = queryKey;
      if (isNil(id) || isNil(type)) {
        return null;
      }
      switch (type) {
        case NoteType.COMMON:
          return noteApi.getCommonNote(id);
        case NoteType.QUESTION:
          return noteApi.getQuestionNote(id);
        case NoteType.RETROSPECTIVE:
          return noteApi.getRetrospectNote(id);
        default:
          return noteApi.getCommonNote(id);
      }
    },
  });
};

export default useNote;
