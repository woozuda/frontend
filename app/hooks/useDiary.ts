import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { DiaryAPI } from "../http";
import { DiaryNote } from "../models/diary";

export interface UseDiaryProps {
  id?: number;
}

const useDiary = (props: UseDiaryProps) => {
  const { id } = props;
  const http = useHttp();
  const diaryApi = new DiaryAPI(http);

  return useQuery({
    queryKey: ["DIARY", id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      if (id === undefined) {
        return null;
      }
      const { noteList, ...diary } = await diaryApi.getDiary(id);

      const reducedNotes = noteList?.reduce((record, note) => {
        if (!(note.note.date in record)) {
          record[note.note.date] = [];
        }
        record[note.note.date].push(note);
        return record;
      }, {} as Record<string, DiaryNote[]>);
      return {
        ...diary,
        notes: reducedNotes ? Object.entries(reducedNotes) : null,
      };
    },
  });
};

export default useDiary;
