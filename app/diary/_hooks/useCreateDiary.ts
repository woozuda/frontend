import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createDiary } from "../_lib/createDiary";
import { createInfo } from "@/model/diary/createInfo";

export function useCreateDiary(createInfo: createInfo) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => createDiary(createInfo),
    onSuccess: () => {
      console.log("create diary success!");
      router.replace("/");
    },
    onError: () => {
      console.log("create diary failed...");
    },
  });
  return { mutate, isPending };
}
