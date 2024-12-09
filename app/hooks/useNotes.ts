import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface UseNotesProps {
  date?: string | null;
}

const useNotes = (props?: UseNotesProps) => {
  const http = useHttp();
  const notesApi = new NoteAPI(http);
  const date = props?.date;

  const {
    data: notes,
    error,
    refetch,
    isLoading,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["DIARY_NOTES", date] as const,
    queryFn: async ({ queryKey }) => {
      const [, date] = queryKey;
      const notes = await notesApi.getNotes(date);

      return notes.content;
    },
  });

  return {
    notes,
    error,
    isLoading,
    isFetched,
    isFetching,
    refetch,
  };
};

export default useNotes;
