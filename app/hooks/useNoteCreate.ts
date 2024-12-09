import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { NoteSeason } from "../lib/note";

export interface CreateNoteProps {
  diaryId?: number;
  emoji?: { icon: string; text: string };
  weather?: { icon: string; text: string };
  title?: string;
  content: string;
  date?: Date;
  season?: NoteSeason;
}

const useNoteCommonCreate = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  return useMutation({
    mutationKey: ["NOTE_CREATE"],
    mutationFn: async (props: CreateNoteProps) => {
      const { diaryId, emoji, weather, title, content, date, season } = props;
      if (isNil(diaryId)) {
        return null;
      }
      if (isNil(emoji) || isNil(weather)) {
        return null;
      }
      if (isNil(title)) {
        return null;
      }
      if (isNil(date) || isNil(season)) {
        return null;
      }
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
  });
};

export default useNoteCommonCreate;
