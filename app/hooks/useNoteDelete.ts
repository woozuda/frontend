import { useMutation } from "@tanstack/react-query";
import { isNil } from "ramda";
import { useHttp } from "../contexts/http";
import { NoteAPI } from "../http";

export interface NoteDeleteProps {
  ids?: number[];
}

const useNoteDelete = () => {
  const http = useHttp();
  const noteApi = new NoteAPI(http);

  return useMutation({
    mutationKey: ["NOTE_DELETE"],
    mutationFn: async (props: NoteDeleteProps) => {
      const { ids } = props;
      if (isNil(ids) || ids.length === 0) {
        return null;
      }
      await noteApi.deleteNotes(ids);
    },
  });
};

export default useNoteDelete;
