import { useQuery } from "@tanstack/react-query";
import { getShortlink } from "../_lib/getShortlink";

export function useShortlink() {
  const { data, refetch } = useQuery({
    queryKey: ["SHORTLINK"],
    queryFn: getShortlink,
  });

  return { data, refetch };
}
