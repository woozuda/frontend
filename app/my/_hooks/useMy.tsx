import { useQuery } from "@tanstack/react-query";
import { getMy } from "../_lib/getMy";

export function useMy() {
    const { data } = useQuery({
        queryKey: ['my'],
        queryFn: getMy,
    })

    return { data }
}