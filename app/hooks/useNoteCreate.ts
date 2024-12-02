import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface CreateNoteProps {
  diary?: { id: number; title: string };
  emoji?: { icon: string; text: string };
  weather?: { icon: string; text: string };
  title?: string;
  content: string;
  date?: Date;
  season?: string;
  tags?: string[];
}

const useNoteCommonCreate = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  return useMutation({
    mutationKey: ["NOTE_CREATE"],
    mutationFn: async (props: CreateNoteProps) => {
      const {
        diary,
        emoji,
        weather,
        title,
        content,
        date,
        season,
        tags = [],
      } = props;
      if (isNil(diary)) {
        return null;
      }
      if (isNil(emoji) || isNil(weather)) {
        return null;
      }
      if (isNil(title)) {
        return null;
      }
      if (isNil(date)) {
        return null;
      }
      const response = await noteApi.createCommonNote({
        diary: { id: diary.id, title: diary.title },
        feeling: emoji.text,
        weather: weather.text,
        title,
        content,
        date: format(date, "yyyy-MM-dd"),
        season: season!,
        tag: tags,
      });
      return response;
    },
  });
};

export default useNoteCommonCreate;
