import { useQuery } from "@tanstack/react-query";
import { getDiaryList } from "../_lib/getDiaryList";

export function useDiaryList() {
    const { data, isFetching } = useQuery({
        queryKey: ["diary"],
        queryFn: getDiaryList,
    })
    return { data, isFetching }
}