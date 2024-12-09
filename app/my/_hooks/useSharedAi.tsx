import { useQuery } from "@tanstack/react-query";
import { getSharedAi } from "../_lib/getSharedAi";


export function useSharedAi() {
    const { data } = useQuery({
        queryKey: ['shared', 'ai'],
        queryFn: getSharedAi,
    })

    return { data }
}