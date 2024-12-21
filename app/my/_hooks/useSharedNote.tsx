import { useQuery } from "@tanstack/react-query";
import { getSharedNote } from "../_lib/getSharedNote";


export function useSharedNote(shortlink: string) {
    const { data, isFetching } = useQuery({
        queryKey: ['shared', 'note', shortlink],
        queryFn: ({ queryKey }) => {
            const [, , link] = queryKey;
            return getSharedNote(link as string);
        },
    })

    return { data, isFetching }
}