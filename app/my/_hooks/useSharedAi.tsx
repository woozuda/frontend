import { useQuery } from "@tanstack/react-query";
import { getSharedAi } from "../_lib/getSharedAi";

export function useSharedAi({ id }: { id?: string }) {
  const { data } = useQuery({
    queryKey: ["shared", "ai", id],
    queryFn: ({ queryKey }) => {
      const id = queryKey[2];
      if (id) {
        return getSharedAi(id);
      } else {
        return null;
      }
    },
  });

  return { data };
}
