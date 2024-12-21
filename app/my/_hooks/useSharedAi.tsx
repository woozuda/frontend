import { useQuery } from "@tanstack/react-query";
import { getSharedAi } from "../_lib/getSharedAi";


export function useSharedAi(shortlink: string) {
    const { data } = useQuery({
        queryKey: ['shared', 'ai', shortlink],
        queryFn: ({ queryKey }) => {
            const [, , link] = queryKey;
            return getSharedAi(link as string);
        },
    })

    return { data }
}

