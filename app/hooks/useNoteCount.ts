import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";
import { ReportLibs } from "../lib/report";
import { NoteCount } from "../models/diary";

export interface UseNoteCountProps {
  startDate: Date;
  endDate: Date;
}

const useNoteCount = (props: UseNoteCountProps) => {
  const { startDate, endDate } = props;

  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useQuery({
    queryKey: [
      "NOTE_COUNT",
      ReportLibs.toDateParam(addDays(startDate, 1)),
      ReportLibs.toDateParam(addDays(endDate, 1)),
    ],
    queryFn: async ({ queryKey }) => {
      const [, startDate, endDate] = queryKey;

      const response = await noteApi.getNoteCount(startDate, endDate);
      return {
        diary: response.nonRetroCount,
        retrospective: response.retroCount,
      } satisfies NoteCount;
    },
  });
};

export default useNoteCount;
