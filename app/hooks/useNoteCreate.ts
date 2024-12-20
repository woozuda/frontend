import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { NoteSeason } from "../lib/note";

export interface CreateNoteProps {
  diaryId: number;
  diary: string;
  emoji: { icon: string; text: string };
  weather: { icon: string; text: string };
  title: string;
  content: string;
  date: Date;
  season: NoteSeason;
}

export interface UseNoteCommonCreateProps {
  onSuccess?: (
    data: { id: number } | undefined,
    variables: CreateNoteProps
  ) => unknown;
  onError?: (error: unknown, variables: CreateNoteProps) => unknown;
}

const useNoteCommonCreate = (props: UseNoteCommonCreateProps) => {
  const { onSuccess, onError } = props;
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  return useMutation({
    mutationKey: ["NOTE_CREATE"],
    mutationFn: async (props: CreateNoteProps) => {
      const { diaryId, emoji, weather, title, content, date, season } = props;
      const response = await noteApi.createCommonNote({
        diaryId,
        feeling: emoji.text,
        weather: weather.text,
        title,
        content,
        date: format(date, "yyyy-MM-dd"),
        season: season!,
      });
      return response;
    },
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables);
    },
    onError(error, variables, context) {
      onError?.(error, variables);
    },
  });
};

export default useNoteCommonCreate;
