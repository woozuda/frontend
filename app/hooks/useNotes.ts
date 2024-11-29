import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface UseNotesProps {
  diaryId?: number;
}

const useNotes = (props: UseNotesProps) => {
  const { diaryId } = props;
  const http = useHttp();
  const notesApi = new NoteAPI(http);

  const {
    data: notes,
    error,
    refetch,
    isLoading,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["DIARY_NOTE", diaryId] as const,
    queryFn: async ({ queryKey }) => {
      const [, diaryId] = queryKey;
      const notes = await notesApi.getNotes();

      return notes.noteList;
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
