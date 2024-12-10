import { useMutation } from "@tanstack/react-query";
import { randomCover } from "../_lib/randomCover";

export function useRandomCover(handleRandomCoverSuccess: (data: {url: string}) => void) {
  const { mutate: randomCoverMutate, isPending: randomCoverIsPending } = useMutation({
    mutationFn: randomCover,
    onSuccess: (data) => {
      console.log("create random cover success!", data);
      handleRandomCoverSuccess(data)
    },
    onError: () => {
      console.log("create random cover failed...");
    },
  });
  return { randomCoverMutate, randomCoverIsPending };
}
