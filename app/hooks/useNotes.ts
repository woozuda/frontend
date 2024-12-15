import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface UseNotesProps {
  date?: string | null;
}

const useNotes = (props?: UseNotesProps) => {
  const http = useHttp();
  const notesApi = new NoteAPI(http);
  const date = props?.date;

  return useInfiniteQuery({
    queryKey: ["DIARY_NOTES", date] as const,
    queryFn: async ({ pageParam, queryKey }) => {
      const [, date] = queryKey;
      const response = await notesApi.getNotes(pageParam, 10, date);

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (page, pages, pageParam) => {
      if (page.last) {
        return null;
      }
      return pageParam + 1;
    },
  });
};

export default useNotes;
