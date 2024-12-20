import { useQuery } from "@tanstack/react-query";
import { getShortlink } from "../_lib/getShortlink";

export function useShortlink() {
    const { data } = useQuery({
        queryKey: ['SHORTLINK'],
        queryFn: getShortlink,
    })

    return { data }
}