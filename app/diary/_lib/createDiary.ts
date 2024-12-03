import { CreateInfo as ICreateInfo } from "@/app/models/diary";

export async function createDiary(createInfo: ICreateInfo) {
  console.log(createInfo);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/diary/create`,
      {
        method: "post",
        //body
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
    throw err
  }
}
