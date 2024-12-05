import { useMutation } from "@tanstack/react-query";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface NoteShareProps {
  ids?: number[];
}

const useNoteShare = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);
  return useMutation({
    mutationKey: ["NOTE_SHARE"],
    mutationFn: async (props: NoteShareProps) => {
      const { ids } = props;
      if (isNil(ids)) {
        throw new Error("Error: no note ids");
      }
      await noteApi.shareNotes(ids);
      return;
    },
  });
};

export default useNoteShare;
