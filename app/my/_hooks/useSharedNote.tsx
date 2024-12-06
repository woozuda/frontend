import { useQuery } from "@tanstack/react-query";
import { getSharedNote } from "../_lib/getSharedNote";


export function useSharedNote() {
    const { data, isFetching } = useQuery({
        queryKey: ['shared', 'note'],
        queryFn: getSharedNote,
    })

    return { data, isFetching }
}