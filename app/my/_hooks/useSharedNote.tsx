import { useQuery } from "@tanstack/react-query";
import { getSharedNote } from "../_lib/getSharedNote";

export function useSharedNote({ id }: { id?: string }) {
  const { data, isFetching } = useQuery({
    queryKey: ["shared", "note", id],
    queryFn: ({ queryKey }) => {
      const id = queryKey[2];
      if (id) {
        return getSharedNote(id);
      } else {
        return null;
      }
    },
  });

  return { data, isFetching };
}
